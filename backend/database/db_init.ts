import Database from 'better-sqlite3';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const schemaPath = fileURLToPath(
  new URL('./db_schema.sql', import.meta.url),
);

const databasePath = fileURLToPath(
  new URL('./phishing_study.sqlite', import.meta.url),
);

const schema = readFileSync(schemaPath, 'utf8');
const db = new Database(databasePath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(schema);

export default db;