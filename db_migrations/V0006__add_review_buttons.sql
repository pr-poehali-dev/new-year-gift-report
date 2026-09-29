INSERT INTO t_p8000729_new_year_gift_report.site_texts (text_key, section, title, value, multiline, sort_order) VALUES
('rev.btn', 'Отзывы', 'Кнопка «Оставить отзыв»', 'Оставить отзыв', false, 3),
('rev.btnAll', 'Отзывы', 'Кнопка «Все отзывы»', 'Все отзывы', false, 4)
ON CONFLICT (text_key) DO NOTHING;