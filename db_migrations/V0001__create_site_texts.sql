CREATE TABLE IF NOT EXISTS t_p8000729_new_year_gift_report.site_texts (
    id SERIAL PRIMARY KEY,
    text_key VARCHAR(120) UNIQUE NOT NULL,
    section VARCHAR(60) NOT NULL,
    title VARCHAR(200) NOT NULL,
    value TEXT NOT NULL,
    multiline BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_texts_key ON t_p8000729_new_year_gift_report.site_texts(text_key);