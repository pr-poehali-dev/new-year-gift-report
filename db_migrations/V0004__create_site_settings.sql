CREATE TABLE IF NOT EXISTS t_p8000729_new_year_gift_report.site_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(80) UNIQUE NOT NULL,
    kind VARCHAR(20) NOT NULL DEFAULT 'color',
    title VARCHAR(160) NOT NULL,
    hint VARCHAR(240) DEFAULT '',
    value TEXT NOT NULL DEFAULT '',
    sort_order INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p8000729_new_year_gift_report.site_settings (setting_key, kind, title, hint, value, sort_order) VALUES
('img.logo', 'image', 'Логотип (тёмный, для шапки)', 'Виден в шапке сайта', '/logo.png', 1),
('img.logoLight', 'image', 'Логотип (светлый, для подвала)', 'Виден в подвале и в админке', '/logo-light.png', 2),
('img.hero', 'image', 'Главное фото на первом экране', '', 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/95ad02e2-604a-4bc7-b8e9-daf29f4a36d5.jpg', 3),
('img.composition', 'image', 'Фото в блоке «Состав»', '', 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/95ad02e2-604a-4bc7-b8e9-daf29f4a36d5.jpg', 4),
('img.corporate', 'image', 'Фото в блоке «Организациям»', '', 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/8e04a134-6c5d-46c9-a838-d5113f6a7ab4.jpg', 5),
('color.primary', 'color', 'Основной цвет (красный)', 'Кнопки, цены, акценты', '#D91F31', 1),
('color.secondary', 'color', 'Акцентный цвет (жёлтый)', 'Плашки, звёзды, кнопки на тёмном', '#FBBF24', 2),
('color.forest', 'color', 'Тёмный фон (зелёный)', 'Первый экран, состав, контакты, подвал', '#0E3A2C', 3),
('color.background', 'color', 'Фон страницы', 'Светлый фон между блоками', '#FBF8F1', 4),
('font.family', 'font', 'Шрифт сайта', 'Применяется ко всем надписям', 'Manrope', 1),
('font.scale', 'fontsize', 'Размер заголовков', 'Больше или меньше обычного', '100', 2)
ON CONFLICT (setting_key) DO NOTHING;