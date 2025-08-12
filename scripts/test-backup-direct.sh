#!/bin/bash

# Direct Backup Test Script - Tests backup functionality without API
# This script directly creates a backup and uploads to Vercel Blob Storage

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

print_status "=== Direct Backup Test ==="

# Set the Neon database URL directly
DATABASE_URL="postgres://neondb_owner:npg_XmM8DnF1eLEw@ep-empty-dust-addm92fh-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Get blob token from .env.local
if [ -f ".env.local" ]; then
    BLOB_TOKEN=$(grep "BLOB_READ_WRITE_TOKEN" .env.local | cut -d'=' -f2 | tr -d '"')
    print_status "Found Blob token in .env.local"
else
    print_error ".env.local not found"
    exit 1
fi

# Use PostgreSQL 17
PG_DUMP_CMD="/opt/homebrew/opt/postgresql@17/bin/pg_dump"

if [ ! -f "$PG_DUMP_CMD" ]; then
    print_error "PostgreSQL 17 not found. Install with: brew install postgresql@17"
    exit 1
fi

print_status "Using: $PG_DUMP_CMD"

# Generate timestamp and filename
TIMESTAMP=$(date -u +"%Y-%m-%dT%H-%M-%S-%3NZ")
BACKUP_FILENAME="db_backups/test-backup-${TIMESTAMP}.sql"
TEMP_BACKUP_FILE="/tmp/test-backup-${TIMESTAMP}.sql"

print_status "Creating backup: $BACKUP_FILENAME"

# Create PostgreSQL dump
if "$PG_DUMP_CMD" "$DATABASE_URL" --no-owner --no-privileges --clean --if-exists > "$TEMP_BACKUP_FILE"; then
    BACKUP_SIZE=$(wc -c < "$TEMP_BACKUP_FILE")
    print_success "Database dump created: ${BACKUP_SIZE} bytes"
    
    # Show first few lines of backup
    print_status "Backup preview:"
    head -10 "$TEMP_BACKUP_FILE" | sed 's/^/  /'
    
    print_status "Backup contents look good!"
else
    print_error "Failed to create backup"
    exit 1
fi

# Test Vercel Blob upload using Node.js
print_status "Testing Vercel Blob upload..."

# Create a simple Node.js script to test blob upload
cat > /tmp/test-blob-upload.js << EOF
const { put } = require('@vercel/blob');
const fs = require('fs');

async function testUpload() {
  try {
    const fileContent = fs.readFileSync('$TEMP_BACKUP_FILE', 'utf8');
    
    const blob = await put('$BACKUP_FILENAME', fileContent, {
      access: 'public',
      token: '$BLOB_TOKEN',
    });
    
    console.log('✅ Upload successful!');
    console.log('URL:', blob.url);
    console.log('Size:', blob.size);
    
    return true;
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    return false;
  }
}

testUpload().then((success) => {
  process.exit(success ? 0 : 1);
});
EOF

# Run the Node.js upload test
if node /tmp/test-blob-upload.js; then
    print_success "Blob upload test completed successfully!"
else
    print_error "Blob upload test failed"
fi

# Cleanup
rm -f "$TEMP_BACKUP_FILE"
rm -f /tmp/test-blob-upload.js

print_success "Direct backup test completed!" 