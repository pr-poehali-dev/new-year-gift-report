UPDATE t_p8000729_new_year_gift_report.site_texts SET sort_order = 17 WHERE text_key = 'nav.contacts';
INSERT INTO t_p8000729_new_year_gift_report.site_texts (text_key, section, title, value, multiline, sort_order)
SELECT 'nav.request', 'Шапка сайта', 'Меню: Заявка', 'Заявка', false, 16
WHERE NOT EXISTS (SELECT 1 FROM t_p8000729_new_year_gift_report.site_texts WHERE text_key = 'nav.request');