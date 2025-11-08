import Database from 'better-sqlite3'

export const db = new Database('number-discussion.db')

db.exec(`
-- =============================
-- USERS TABLE
-- =============================
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- POSTS TABLE
-- =============================
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  operation TEXT,        -- '+', '-', '*', '/'
  operand REAL,          -- number used in operation
  result REAL NOT NULL,  -- result of applying operation
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================
-- INDICES
-- =============================
CREATE INDEX IF NOT EXISTS idx_posts_parent_id ON posts (parent_id);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts (user_id);
`)

console.log('✅ Database initialized successfully.')
