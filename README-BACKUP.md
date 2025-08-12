# Database Backup System

This project includes an automated database backup system that creates daily PostgreSQL dumps and stores them securely in Vercel Blob Storage with automatic cleanup after 6 months.

## Features

- ✅ Daily automated backups via Vercel Cron Jobs
- ✅ PostgreSQL dump with proper schema preservation
- ✅ Secure storage in Vercel Blob Storage
- ✅ Automatic cleanup of backups older than 6 months
- ✅ Manual backup script for testing and on-demand backups
- ✅ Backup listing and management API
- ✅ Authorization protection with secret token

## Setup

### Required Environment Variables

Add these environment variables to your `.env.local` file for local development and to your Vercel project settings for production:

```bash
# Database connection (Neon PostgreSQL)
DATABASE_URL="postgres://neondb_owner:npg_XmM8DnF1eLEw@ep-empty-dust-addm92fh-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Vercel Blob Storage token (already configured)
BLOB_READ_WRITE_TOKEN="your_blob_token_here"

# Backup authorization secret (generate a secure random string)
BACKUP_SECRET="your_secure_backup_secret_here"
```

### Environment Variable Details

#### `DATABASE_URL`

- **Purpose**: Connection string for your Neon PostgreSQL database
- **Format**: `postgres://username:password@host:port/database?sslmode=require`
- **Security**: This contains sensitive credentials, keep it secure

#### `BLOB_READ_WRITE_TOKEN`

- **Purpose**: Vercel Blob Storage access token
- **Location**: Already configured in your project via `@payloadcms/storage-vercel-blob`
- **Permissions**: Read/Write access to store and manage backup files

#### `BACKUP_SECRET`

- **Purpose**: Authorization token for backup API endpoints
- **Security**: Generate a long, random string (32+ characters)
- **Usage**: Prevents unauthorized access to backup functionality
- **Example**: `backup_secret_abc123xyz789_very_secure_token`

## Usage

### Automated Daily Backups

Backups run automatically every day at 6:00 AM UTC via Vercel Cron Jobs. No manual intervention required.

The cron schedule is configured in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/backup",
      "schedule": "0 6 * * *"
    }
  ]
}
```

### Manual Backups

#### Using the Bash Script (Recommended for testing)

```bash
# Local environment backup
./scripts/backup-database.sh local

# Production environment backup (requires .env.production file)
./scripts/backup-database.sh production
```

#### Using the API Directly

```bash
# Create a backup
curl -X POST \
  -H "Authorization: Bearer YOUR_BACKUP_SECRET" \
  -H "Content-Type: application/json" \
  https://your-domain.vercel.app/api/backup

# List existing backups
curl -X GET https://your-domain.vercel.app/api/backup
```

## API Endpoints

### `POST /api/backup`

Creates a new database backup and uploads it to Vercel Blob Storage.

**Headers:**

- `Authorization: Bearer YOUR_BACKUP_SECRET` (required)

**Response:**

```json
{
  "success": true,
  "backup": {
    "fileName": "db_backups/database-backup-2024-01-15T10-30-00-000Z.sql",
    "url": "https://blob.vercel-storage.com/db_backups/...",
    "size": 1234567,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### `GET /api/backup`

Lists all existing database backups.

**Response:**

```json
{
  "success": true,
  "backups": [
    {
      "fileName": "db_backups/database-backup-2024-01-15T10-30-00-000Z.sql",
      "url": "https://blob.vercel-storage.com/db_backups/...",
      "size": 1234567,
      "uploadedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

## Backup Retention Policy

- **Retention Period**: 6 months
- **Cleanup**: Automatic cleanup runs after each backup
- **File Naming**: `db_backups/database-backup-YYYY-MM-DDTHH-MM-SS-sssZ.sql`
- **Storage**: Vercel Blob Storage (secure, durable)
- **Organization**: All backups stored in `db_backups/` folder

## Security Considerations

1. **Database Credentials**: Never commit `DATABASE_URL` to version control
2. **Backup Secret**: Use a strong, unique secret for `BACKUP_SECRET`
3. **Access Control**: Backup API requires authorization header
4. **Storage Security**: Vercel Blob Storage provides secure, encrypted storage
5. **Network Security**: All connections use SSL/TLS encryption

## Monitoring and Troubleshooting

### Vercel Function Logs

Monitor backup execution in Vercel dashboard:

1. Go to your Vercel project
2. Navigate to "Functions" tab
3. Check logs for `/api/backup` function

### Manual Testing

```bash
# Test local backup functionality
./scripts/backup-database.sh local

# Check if pg_dump is working
pg_dump "$DATABASE_URL" --no-owner --no-privileges --clean --if-exists | head -20
```

### Common Issues

1. **`pg_dump` not found or version mismatch**: Install PostgreSQL 17 client tools

   ```bash
   # macOS (recommended - matches Neon version)
   brew install postgresql@17

   # Or install general PostgreSQL (may have version compatibility issues)
   brew install postgresql

   # Ubuntu/Debian
   sudo apt-get install postgresql-client-17
   ```

2. **PostgreSQL version mismatch**: Ensure your local `pg_dump` version is compatible
   - Neon uses PostgreSQL 17.x
   - Install matching version: `brew install postgresql@17`
   - The script automatically detects and uses the best available version

3. **Connection timeout**: Check if Neon database allows connections from Vercel
4. **Blob storage errors**: Verify `BLOB_READ_WRITE_TOKEN` is correct
5. **Authorization errors**: Ensure `BACKUP_SECRET` matches between environments

## File Structure

```
├── src/app/api/backup/route.ts     # Backup API endpoint
├── scripts/backup-database.sh      # Manual backup script
├── vercel.json                     # Cron job configuration
└── README-BACKUP.md               # This documentation
```

## Dependencies

The backup system requires these packages (already installed):

- `@vercel/blob` - Vercel Blob Storage client
- `@types/pg` - PostgreSQL type definitions
- Built-in Node.js modules: `child_process`, `util`

## Development

### Testing Locally

1. Ensure PostgreSQL client tools are installed
2. Set up `.env.local` with required variables
3. Run the backup script: `./scripts/backup-database.sh local`
4. Start your Next.js app: `pnpm dev`
5. Test API endpoint: `curl -X POST -H "Authorization: Bearer YOUR_SECRET" http://localhost:3000/api/backup`

### Production Deployment

1. Add environment variables to Vercel project settings
2. Deploy the application
3. Verify cron job is scheduled in Vercel dashboard
4. Monitor first automated backup execution

## Support

For issues or questions about the backup system, check:

1. Vercel function logs
2. Database connection status
3. Blob storage access permissions
4. Environment variable configuration
