import { NextRequest, NextResponse } from 'next/server';

import { type ListBlobResult, del, list, put } from '@vercel/blob';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Check for authorization (you might want to add a secret header check)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.BACKUP_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `db_backups/database-backup-${timestamp}.sql`;

    console.log('Starting database backup...');

    // Create PostgreSQL dump with version compatibility
    // Try to use the most compatible pg_dump version available
    let pgDumpCmd = 'pg_dump';

    // On Vercel, use the system pg_dump (which should be compatible)
    // For local testing, try to use PostgreSQL 17 if available
    if (process.env.NODE_ENV !== 'production') {
      // Local development - try to use PostgreSQL 17
      const fs = require('fs');
      if (fs.existsSync('/opt/homebrew/opt/postgresql@17/bin/pg_dump')) {
        pgDumpCmd = '/opt/homebrew/opt/postgresql@17/bin/pg_dump';
      } else if (fs.existsSync('/usr/local/opt/postgresql@17/bin/pg_dump')) {
        pgDumpCmd = '/usr/local/opt/postgresql@17/bin/pg_dump';
      }
    }

    const dumpCommand = `${pgDumpCmd} "${process.env.DATABASE_URL}" --no-owner --no-privileges --clean --if-exists --no-comments`;

    const { stdout: sqlDump, stderr } = await execAsync(dumpCommand);

    if (stderr) {
      console.warn('pg_dump warnings:', stderr);
    }

    if (!sqlDump) {
      throw new Error('No data returned from pg_dump');
    }

    console.log(`Database dump created, size: ${sqlDump.length} characters`);

    // Upload to Vercel Blob Storage
    const blob = await put(backupFileName, sqlDump, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    console.log(`Backup uploaded successfully: ${blob.url}`);

    // Clean up old backups (older than 6 months)
    await cleanupOldBackups();

    return NextResponse.json({
      success: true,
      backup: {
        fileName: backupFileName,
        url: blob.url,
        size: sqlDump.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Backup failed:', error);
    return NextResponse.json(
      {
        error: 'Backup failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function cleanupOldBackups() {
  try {
    const { blobs } = await list({
      prefix: 'db_backups/database-backup-',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const oldBackups = blobs.filter((blob: ListBlobResult['blobs'][0]) => {
      // Extract timestamp from filename: db_backups/database-backup-2024-01-15T10-30-00-000Z.sql
      const match = blob.pathname.match(
        /db_backups\/database-backup-(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z)\.sql/
      );
      if (match) {
        const backupDate = new Date(
          match[1]
            .replace(/-/g, ':')
            .replace(/T(\d{2}):(\d{2}):(\d{2}):(\d{3})Z/, 'T$1:$2:$3.$4Z')
        );
        return backupDate < sixMonthsAgo;
      }
      return false;
    });

    for (const oldBackup of oldBackups) {
      await del(oldBackup.url, {
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      console.log(`Deleted old backup: ${oldBackup.pathname}`);
    }

    if (oldBackups.length > 0) {
      console.log(`Cleaned up ${oldBackups.length} old backups`);
    }
  } catch (error) {
    console.error('Error cleaning up old backups:', error);
    // Don't throw here - we don't want backup to fail if cleanup fails
  }
}

// GET endpoint to list existing backups
export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'db_backups/database-backup-',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    const backups = blobs
      .filter((blob: ListBlobResult['blobs'][0]) =>
        blob.pathname.endsWith('.sql')
      )
      .map((blob: ListBlobResult['blobs'][0]) => ({
        fileName: blob.pathname,
        url: blob.url,
        size: blob.size,
        uploadedAt: blob.uploadedAt
      }))
      .sort(
        (a: any, b: any) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );

    return NextResponse.json({
      success: true,
      backups,
      total: backups.length
    });
  } catch (error) {
    console.error('Failed to list backups:', error);
    return NextResponse.json(
      {
        error: 'Failed to list backups',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
