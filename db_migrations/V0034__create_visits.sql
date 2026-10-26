CREATE TABLE IF NOT EXISTS visits (
  id BIGSERIAL PRIMARY KEY,
  visitor_id VARCHAR(64) NOT NULL,
  path VARCHAR(300) DEFAULT '/',
  referrer VARCHAR(300) DEFAULT '',
  device VARCHAR(20) DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_visits_created ON visits (created_at);