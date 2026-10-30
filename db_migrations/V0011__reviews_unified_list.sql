ALTER TABLE t_p8000729_new_year_gift_report.reviews ADD COLUMN IF NOT EXISTS role VARCHAR(200) DEFAULT '';

INSERT INTO t_p8000729_new_year_gift_report.reviews (name, role, rating, text, is_published, created_at)
SELECT
  (SELECT value FROM t_p8000729_new_year_gift_report.site_texts WHERE text_key = 'rev.s' || n || 'n'),
  (SELECT value FROM t_p8000729_new_year_gift_report.site_texts WHERE text_key = 'rev.s' || n || 'r'),
  5,
  (SELECT value FROM t_p8000729_new_year_gift_report.site_texts WHERE text_key = 'rev.s' || n || 'x'),
  TRUE,
  TIMESTAMP '2025-12-20 12:00:00' - (n || ' days')::interval
FROM generate_series(1, 3) AS n;

INSERT INTO t_p8000729_new_year_gift_report.reviews (name, role, rating, text, is_published, created_at) VALUES
('Сергей Л.', 'Покупатель', 5, 'Заказал новогодний набор для всей семьи. Упаковка праздничная, всё на высшем уровне!', TRUE, '2025-12-08 12:00:00'),
('Мария П.', 'Покупатель', 4, 'Прекрасные подарки для друзей! Качество отменное, доставка быстрая. Рекомендую!', TRUE, '2025-12-05 12:00:00'),
('Алексей Н.', 'Покупатель', 5, 'Купил несколько подарков для коллег. Все остались довольны, особенно понравились конфеты!', TRUE, '2025-12-03 12:00:00'),
('Ольга С.', 'Покупатель', 4, 'Замечательный магазин! Большой выбор, доступные цены, отличное качество. Спасибо!', TRUE, '2025-12-01 12:00:00'),
('Иван Р.', 'Заказ для партнёров', 5, 'Заказывал подарки для партнёров. Всё пришло в срок, упаковка супер! Буду заказывать ещё.', TRUE, '2025-11-28 12:00:00'),
('Наталья Б.', 'Покупатель', 4, 'Очень понравился сервис! Быстро, качественно, красиво. Подарки получились отличные!', TRUE, '2025-11-25 12:00:00'),
('Павел Т.', 'Покупатель', 3, 'Хороший магазин, но доставка задержалась на пару дней. В остальном всё нормально.', TRUE, '2025-11-20 12:00:00');

UPDATE t_p8000729_new_year_gift_report.site_texts SET section = '_archive' WHERE text_key LIKE 'rev.s_%' AND text_key ~ '^rev\.s[123][nrx]$';