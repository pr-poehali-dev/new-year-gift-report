INSERT INTO t_p8000729_new_year_gift_report.site_settings (setting_key, kind, title, hint, value, sort_order) VALUES
('file.catalog', 'file', 'Файл каталога для скачивания', 'PDF или другой файл. Кнопка «Скачать каталог» отдаёт его посетителю. Если поле пустое — откроется окно со списком подарков', '', 10)
ON CONFLICT (setting_key) DO NOTHING;