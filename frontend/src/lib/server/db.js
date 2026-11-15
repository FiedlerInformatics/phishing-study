import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import schema from './schema.sql?raw';   // Vite lädt die Datei als String

mkdirSync('data', { recursive: true });
export const db = new Database('data/study.db');
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(schema);
