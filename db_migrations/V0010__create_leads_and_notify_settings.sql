CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  amount VARCHAR(50) DEFAULT '',
  status VARCHAR(20) DEFAULT 'new',
  email_sent BOOLEAN DEFAULT FALSE,
  sms_sent BOOLEAN DEFAULT FALSE,
  notify_error TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notify_settings (
  setting_key VARCHAR(50) PRIMARY KEY,
  value TEXT DEFAULT ''
);

INSERT INTO notify_settings (setting_key, value) VALUES
('emails', 'chebpodarki@yandex.ru'),
('phones', '89278436727'),
('email_enabled', 'true'),
('sms_enabled', 'true')
ON CONFLICT (setting_key) DO NOTHING;