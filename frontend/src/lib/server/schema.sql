CREATE TABLE IF NOT EXISTS sessions (
  id              TEXT PRIMARY KEY,
  created_at      INTEGER NOT NULL,
  condition_order TEXT,
  viewport_w      INTEGER,
  viewport_h      INTEGER,
  user_agent      TEXT,
  finished_at     INTEGER
);

CREATE TABLE IF NOT EXISTS mouse_moves (
  session_id TEXT    NOT NULL REFERENCES sessions(id),
  phase      TEXT    NOT NULL,
  ts         INTEGER NOT NULL,
  x          INTEGER NOT NULL,
  y          INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS events (
  session_id TEXT    NOT NULL REFERENCES sessions(id),
  phase      TEXT    NOT NULL,
  ts         INTEGER NOT NULL,
  type       TEXT    NOT NULL,
  email_id   INTEGER,
  folder     TEXT,
  data       TEXT
);

CREATE TABLE IF NOT EXISTS hr_samples (
  session_id TEXT    NOT NULL REFERENCES sessions(id),
  phase      TEXT    NOT NULL,
  ts         INTEGER NOT NULL,
  bpm        INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS responses (
  session_id    TEXT    NOT NULL REFERENCES sessions(id),
  questionnaire TEXT    NOT NULL,
  phase         TEXT    NOT NULL,
  item_id       TEXT    NOT NULL,
  value         TEXT,
  started_at    INTEGER,
  submitted_at  INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_moves  ON mouse_moves(session_id, phase, ts);
CREATE INDEX IF NOT EXISTS idx_events ON events(session_id, phase, ts);
CREATE INDEX IF NOT EXISTS idx_hr     ON hr_samples(session_id, ts);
