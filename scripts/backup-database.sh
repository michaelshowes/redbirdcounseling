#!/bin/bash

# Database Backup Script for Redbird Counseling
# This script creates a PostgreSQL dump and uploads it to Vercel Blob Storage
# Usage: ./scripts/backup-database.sh [local|production]

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if environment is specified
ENVIRONMENT=${1:-"local"}

# Load environment variables
if [ "$ENVIRONMENT" = "production" ]; then
    if [ ! -f ".env.production" ]; then
        print_error "Production environment file (.env.production) not found!"
        exit 1
    fi
    source .env.production
    print_status "Using production environment"
else
    if [ ! -f ".env.local" ]; then
        print_error "Local environment file (.env.local) not found!"
        exit 1
    fi
    source .env.local
    print_status "Using local environment"
fi

# Check required environment variables
if [ -z "$DATABASE_URL" ]; then
    print_error "DATABASE_URL is not set in environment file"
    exit 1
fi

if [ -z "$BLOB_READ_WRITE_TOKEN" ]; then
    print_error "BLOB_READ_WRITE_TOKEN is not set in environment file"
    exit 1
fi

if [ -z "$BACKUP_SECRET" ]; then
    print_error "BACKUP_SECRET is not set in environment file"
    exit 1
fi

# Check for pg_dump and find the best version
PG_DUMP_CMD=""

# Try PostgreSQL 17 first (matches Neon server version)
if command -v /opt/homebrew/opt/postgresql@17/bin/pg_dump &> /dev/null; then
    PG_DUMP_CMD="/opt/homebrew/opt/postgresql@17/bin/pg_dump"
    print_status "Using PostgreSQL 17 pg_dump (matches Neon compatibility)"
elif command -v /usr/local/opt/postgresql@17/bin/pg_dump &> /dev/null; then
    PG_DUMP_CMD="/usr/local/opt/postgresql@17/bin/pg_dump"
    print_status "Using PostgreSQL 17 pg_dump (matches Neon compatibility)"
elif command -v /opt/homebrew/opt/postgresql@16/bin/pg_dump &> /dev/null; then
    PG_DUMP_CMD="/opt/homebrew/opt/postgresql@16/bin/pg_dump"
    print_status "Using PostgreSQL 16 pg_dump (should work with Neon)"
elif command -v /usr/local/opt/postgresql@16/bin/pg_dump &> /dev/null; then
    PG_DUMP_CMD="/usr/local/opt/postgresql@16/bin/pg_dump"
    print_status "Using PostgreSQL 16 pg_dump (should work with Neon)"
elif command -v pg_dump &> /dev/null; then
    PG_DUMP_CMD="pg_dump"
    print_warning "Using system pg_dump - may have version compatibility issues"
    # Check version compatibility
    PG_DUMP_VERSION=$(pg_dump --version | grep -oE '[0-9]+\.[0-9]+' | head -1)
    print_status "Local pg_dump version: $PG_DUMP_VERSION"
    print_warning "Neon uses PostgreSQL 17.x - consider installing PostgreSQL 17:"
    print_warning "  brew install postgresql@17"
else
    print_error "pg_dump is not installed. Please install PostgreSQL client tools:"
    print_error "  brew install postgresql@17"
    exit 1
fi

# Check if curl is available
if ! command -v curl &> /dev/null; then
    print_error "curl is not installed. Please install curl."
    exit 1
fi

# Generate timestamp for backup filename
TIMESTAMP=$(date -u +"%Y-%m-%dT%H-%M-%S-%3NZ")
BACKUP_FILENAME="database-backup-${TIMESTAMP}.sql"
TEMP_BACKUP_FILE="/tmp/${BACKUP_FILENAME}"

print_status "Starting database backup process..."
print_status "Backup filename: ${BACKUP_FILENAME}"

# Create PostgreSQL dump
print_status "Creating PostgreSQL dump..."
if "$PG_DUMP_CMD" "$DATABASE_URL" --no-owner --no-privileges --clean --if-exists > "$TEMP_BACKUP_FILE"; then
    print_success "Database dump created successfully"
    
    # Check if dump file is not empty
    if [ ! -s "$TEMP_BACKUP_FILE" ]; then
        print_error "Backup file is empty!"
        rm -f "$TEMP_BACKUP_FILE"
        exit 1
    fi
    
    BACKUP_SIZE=$(wc -c < "$TEMP_BACKUP_FILE")
    print_status "Backup size: ${BACKUP_SIZE} bytes"
else
    print_error "Failed to create database dump"
    rm -f "$TEMP_BACKUP_FILE"
    exit 1
fi

# Upload to Vercel Blob Storage using the API endpoint
print_status "Uploading backup to Vercel Blob Storage..."

# Determine the base URL
if [ "$ENVIRONMENT" = "production" ]; then
    # For testing production database with local API
    if [ "$1" = "production" ] && [ "$2" = "local-api" ]; then
        BASE_URL="http://localhost:3000"
        print_status "Using production database with local API for testing"
    else
        BASE_URL="https://redbirdcounseling.vercel.app"  # Replace with your actual production URL
    fi
else
    BASE_URL="http://localhost:3000"
fi

# Make API call to backup endpoint
RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $BACKUP_SECRET" \
    -H "Content-Type: application/json" \
    -d "{\"manual\": true}" \
    "$BASE_URL/api/backup" \
    -w "\n%{http_code}")

# Extract HTTP status code and response body
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    print_success "Backup uploaded successfully!"
    
    # Try to parse and display backup information
    if command -v jq &> /dev/null; then
        BACKUP_URL=$(echo "$RESPONSE_BODY" | jq -r '.backup.url // empty')
        BACKUP_SIZE_API=$(echo "$RESPONSE_BODY" | jq -r '.backup.size // empty')
        
        if [ -n "$BACKUP_URL" ]; then
            print_status "Backup URL: $BACKUP_URL"
        fi
        if [ -n "$BACKUP_SIZE_API" ]; then
            print_status "Uploaded size: $BACKUP_SIZE_API characters"
        fi
    else
        print_status "Response: $RESPONSE_BODY"
        print_warning "Install 'jq' for better JSON parsing"
    fi
else
    print_error "Failed to upload backup. HTTP Code: $HTTP_CODE"
    print_error "Response: $RESPONSE_BODY"
    rm -f "$TEMP_BACKUP_FILE"
    exit 1
fi

# Clean up temporary file
rm -f "$TEMP_BACKUP_FILE"
print_success "Backup process completed successfully!"

# Optional: List existing backups
print_status "Listing existing backups..."
LIST_RESPONSE=$(curl -s -X GET "$BASE_URL/api/backup" -w "\n%{http_code}")
LIST_HTTP_CODE=$(echo "$LIST_RESPONSE" | tail -n1)
LIST_RESPONSE_BODY=$(echo "$LIST_RESPONSE" | sed '$d')

if [ "$LIST_HTTP_CODE" = "200" ]; then
    if command -v jq &> /dev/null; then
        BACKUP_COUNT=$(echo "$LIST_RESPONSE_BODY" | jq -r '.total // 0')
        print_status "Total backups available: $BACKUP_COUNT"
        
        # Show latest 5 backups
        echo "$LIST_RESPONSE_BODY" | jq -r '.backups[:5][] | "- \(.fileName) (\(.size) bytes) - \(.uploadedAt)"' 2>/dev/null || true
    else
        print_status "Backup list: $LIST_RESPONSE_BODY"
    fi
else
    print_warning "Could not retrieve backup list. HTTP Code: $LIST_HTTP_CODE"
fi

print_success "Script completed!" 