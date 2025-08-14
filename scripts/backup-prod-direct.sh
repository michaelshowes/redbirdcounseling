#!/bin/bash

# Direct Production Database Backup Script
# Creates a local backup file from the production database

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_status "=== Production Database Backup ==="

# Load production environment
if [ ! -f ".env.production" ]; then
    print_error ".env.production not found"
    exit 1
fi

# Source the production environment file
set -a  # automatically export all variables
source .env.production
set +a  # stop automatically exporting

if [ -z "$DATABASE_URL" ]; then
    print_error "DATABASE_URL not found in .env.production"
    exit 1
fi

print_status "Found production database URL"

# Use PostgreSQL 17
PG_DUMP_CMD="/opt/homebrew/opt/postgresql@17/bin/pg_dump"

if [ ! -f "$PG_DUMP_CMD" ]; then
    # Try other locations
    if command -v pg_dump &> /dev/null; then
        PG_DUMP_CMD="pg_dump"
        print_status "Using system pg_dump"
    else
        print_error "PostgreSQL not found. Install with: brew install postgresql@17"
        exit 1
    fi
else
    print_status "Using PostgreSQL 17 pg_dump"
fi

# Generate timestamp and filename
TIMESTAMP=$(date -u +"%Y-%m-%dT%H-%M-%S")
BACKUP_FILENAME="redbird_production_backup_${TIMESTAMP}.sql"
BACKUP_PATH="/Users/michaelshowes/Sites/freelance/redbirdcounseling/${BACKUP_FILENAME}"

print_status "Creating backup: $BACKUP_FILENAME"

# Create PostgreSQL dump
if "$PG_DUMP_CMD" "$DATABASE_URL" --no-owner --no-privileges --clean --if-exists > "$BACKUP_PATH"; then
    BACKUP_SIZE=$(wc -c < "$BACKUP_PATH")
    print_success "Production database backup created: ${BACKUP_SIZE} bytes"
    print_success "Backup saved to: $BACKUP_PATH"
    
    # Show first few lines of backup to verify
    print_status "Backup preview (first 10 lines):"
    head -10 "$BACKUP_PATH" | sed 's/^/  /'
    echo ""
    
    # Show backup statistics
    TOTAL_LINES=$(wc -l < "$BACKUP_PATH")
    print_status "Backup statistics:"
    print_status "  - File size: ${BACKUP_SIZE} bytes"
    print_status "  - Total lines: ${TOTAL_LINES}"
    print_status "  - Location: ${BACKUP_PATH}"
    
    # Upload to Vercel Blob Storage
    print_status "Uploading backup to Vercel Blob Storage..."
    
    # Create Node.js script to upload to Vercel Blob (in project directory)
    TEMP_UPLOAD_SCRIPT="./upload-backup-$TIMESTAMP.mjs"
    cat > "$TEMP_UPLOAD_SCRIPT" << EOF
import { put } from '@vercel/blob';
import fs from 'fs';

async function uploadBackup() {
  try {
    const fileContent = fs.readFileSync('$BACKUP_PATH', 'utf8');
    const blobFileName = 'db_backups/$BACKUP_FILENAME';
    
    console.log('Uploading to blob storage...');
    
    const blob = await put(blobFileName, fileContent, {
      access: 'public',
      token: '$BLOB_READ_WRITE_TOKEN',
    });
    
    console.log('✅ Upload successful!');
    console.log('URL:', blob.url);
    console.log('Size:', blob.size, 'bytes');
    console.log('Blob filename:', blobFileName);
    
    return { success: true, url: blob.url, size: blob.size };
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    return { success: false, error: error.message };
  }
}

uploadBackup().then((result) => {
  if (result.success) {
    console.log('Backup uploaded successfully to Vercel Blob!');
    process.exit(0);
  } else {
    console.error('Failed to upload backup:', result.error);
    process.exit(1);
  }
});
EOF

    # Run the upload script
    if node "$TEMP_UPLOAD_SCRIPT"; then
        print_success "Backup successfully uploaded to Vercel Blob Storage!"
    else
        print_error "Failed to upload backup to Vercel Blob Storage"
        print_status "Local backup is still available at: $BACKUP_PATH"
    fi
    
    # Clean up temp script
    rm -f "$TEMP_UPLOAD_SCRIPT"
    
else
    print_error "Failed to create backup"
    exit 1
fi

print_success "Production database backup completed successfully!" 