/**
 * Find, and optionally delete, orphaned files in a Vercel Blob store — blobs that
 * no media document references any more.
 *
 *   pnpm blob:audit                  dry run against the dev store
 *   pnpm blob:audit --confirm        back up, then delete, in dev
 *   pnpm blob:audit:prod             dry run against the production store
 *   pnpm blob:audit:prod --confirm   back up, then delete, in production
 *
 * Orphans accumulate two ways: a file that reaches Blob without a document being
 * saved, and image sizes stranded by an `imageSizes` change — Payload drops the
 * old size records from the row, so it can no longer delete those files. Run this
 * after changing `imageSizes`.
 *
 * Safety: nothing is deleted without --confirm; everything deleted is written to a
 * local backup folder first so it can be re-uploaded; and the script refuses to
 * delete anything still mentioned in page content.
 */
import config from '@payload-config';
import { del, list } from '@vercel/blob';
import { getPayload } from 'payload';

const payload = await getPayload({ config });
const confirm = process.argv.includes('--confirm');
const isProd = process.env.NODE_ENV === 'production';

const token = isProd
  ? process.env.BLOB_READ_WRITE_TOKEN
  : (process.env.DEV_READ_WRITE_TOKEN ?? process.env.BLOB_READ_WRITE_TOKEN);

if (!token) {
  console.error('No blob token found. Run via the pnpm blob:audit scripts.');
  process.exit(1);
}

/** node-postgres pool exposed by the Payload postgres adapter. */
const pool = (payload.db as unknown as {
  pool: { query: (sql: string, params?: unknown[]) => Promise<{ rows: Record<string, string>[]; rowCount: number }> };
}).pool;

const basename = (p: string) => p.split('/').pop()!;

console.log(`target     : ${isProd ? 'PRODUCTION' : 'development'}`);
console.log(`blob store : ${token.split('_')[3] ?? 'unknown'}`);
console.log(`mode       : ${confirm ? 'DELETE (backs up first)' : 'dry run'}\n`);

// Discover the filename columns instead of hardcoding them, so this keeps working
// after image sizes are added to or renamed in the Media collection.
const { rows: cols } = await pool.query(`
  select column_name from information_schema.columns
  where table_name = 'media'
    and (column_name = 'filename' or column_name like 'sizes\\_%\\_filename')
`);
const filenameCols = cols.map((c) => c.column_name);

const { rows: mediaRows } = await pool.query(
  `select ${filenameCols.map((c) => `"${c}"`).join(',')} from media`
);
const referenced = new Set<string>();
for (const row of mediaRows) {
  for (const col of filenameCols) if (row[col]) referenced.add(row[col]);
}

async function listAll() {
  const out: Awaited<ReturnType<typeof list>>['blobs'] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ cursor, limit: 1000, token });
    out.push(...page.blobs);
    cursor = page.cursor;
  } while (cursor);
  return out;
}

const blobs = await listAll();
const orphans = blobs.filter((b) => !referenced.has(basename(b.pathname)));
const totalMb = (orphans.reduce((n, b) => n + (b.size || 0), 0) / 1048576).toFixed(2);

console.log(`media docs       : ${mediaRows.length}`);
console.log(`filename columns : ${filenameCols.join(', ')}`);
console.log(`referenced files : ${referenced.size}`);
console.log(`blobs in store   : ${blobs.length}`);
console.log(`orphans          : ${orphans.length} (${totalMb} MB)\n`);

// A document referencing a file that is not in the store is a broken image. This
// script never causes it, but it is worth surfacing while we have both lists.
const present = new Set(blobs.map((b) => basename(b.pathname)));
const missing = [...referenced].filter((n) => !present.has(n));
if (missing.length) {
  console.log(`WARNING: ${missing.length} referenced file(s) missing from the store:`);
  missing.forEach((m) => console.log(`   ${m}`));
  console.log('');
}

if (!orphans.length) {
  console.log('Nothing to clean up.');
  process.exit(0);
}

orphans.forEach((b) =>
  console.log(
    `   ${b.pathname}  ${(b.size / 1024).toFixed(0)}KB  ${String(b.uploadedAt).slice(0, 10)}`
  )
);

// Guard against deleting a file that content embeds directly (a pasted URL in
// rich text, say) rather than through a media document.
const { rows: scanCols } = await pool.query(`
  select table_name, column_name, data_type from information_schema.columns
  where table_schema = 'public' and data_type in ('text','character varying','jsonb')
`);
const hits: string[] = [];
for (const { table_name, column_name, data_type } of scanCols) {
  const expr = data_type === 'jsonb' ? `"${column_name}"::text` : `"${column_name}"`;
  for (const orphan of orphans) {
    try {
      const { rowCount } = await pool.query(
        `select 1 from "${table_name}" where ${expr} like $1 limit 1`,
        [`%${basename(orphan.pathname)}%`]
      );
      if (rowCount) hits.push(`${table_name}.${column_name} -> ${orphan.pathname}`);
    } catch {
      // Column cannot be compared as text; skip it.
    }
  }
}

console.log(`\ncontent scan: ${hits.length} reference(s) to orphans`);
hits.forEach((h) => console.log(`   !! ${h}`));
if (hits.length) {
  console.log('\nRefusing to delete — content still points at these files.');
  process.exit(1);
}

if (!confirm) {
  console.log('\nDry run. Re-run with --confirm to back up and delete.');
  process.exit(0);
}

const { mkdirSync, writeFileSync } = await import('node:fs');
const { join, resolve } = await import('node:path');

const stamp = new Date().toISOString().slice(0, 10);
const backupDir = resolve(`blob-orphan-backup-${isProd ? 'prod' : 'dev'}-${stamp}`);
mkdirSync(backupDir, { recursive: true });

const backedUp: typeof orphans = [];
const manifest: Record<string, unknown>[] = [];
for (const b of orphans) {
  const res = await fetch(b.url);
  if (!res.ok) {
    console.error(`   could not back up ${b.pathname} (${res.status}) — leaving it in place`);
    continue;
  }
  writeFileSync(join(backupDir, basename(b.pathname)), Buffer.from(await res.arrayBuffer()));
  backedUp.push(b);
  // `list()` does not return a content type, so take it from the download.
  manifest.push({
    pathname: b.pathname,
    size: b.size,
    contentType: res.headers.get('content-type') ?? undefined,
    uploadedAt: b.uploadedAt
  });
}
writeFileSync(join(backupDir, '_manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\nbacked up ${backedUp.length} file(s) to ${backupDir}`);

for (const b of backedUp) await del(b.url, { token });

console.log(`deleted ${backedUp.length} orphan(s)`);
console.log(`blobs in store now: ${(await listAll()).length}`);
process.exit(0);
