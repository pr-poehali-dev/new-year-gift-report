CREATE TABLE IF NOT EXISTS t_p8000729_new_year_gift_report.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    price INT NOT NULL DEFAULT 0,
    category VARCHAR(60) NOT NULL DEFAULT 'Картон',
    weight VARCHAR(40) NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    badge VARCHAR(40) DEFAULT '',
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p8000729_new_year_gift_report.products (name, price, category, weight, image, description, badge, sort_order) VALUES
('Снежная сказка', 590, 'Картон', '700 г', 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/8abe0ce8-5af4-4be9-a3ff-150aa85191ff.jpg', 'Яркая коробка и любимые конфеты российских фабрик', 'ХИТ', 1),
('Зимний экспресс', 790, 'Картон', '1000 г', 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/8abe0ce8-5af4-4be9-a3ff-150aa85191ff.jpg', 'Большой праздничный набор с ассорти сладостей', 'ДЕТЯМ', 2),
('Изумрудный праздник', 1190, 'Жесть', '1000 г', 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/09b7b378-4e3b-4292-af98-6788e823b49c.jpg', 'Подарочная жестяная упаковка, которую хочется сохранить', 'ПРЕМИУМ', 3),
('Северное сияние', 1690, 'Дерево', '1500 г', 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/fc6902a7-42ba-4867-a845-63f7a8cb4e1d.jpg', 'Солидный подарок для семьи, коллег и партнёров', 'НОВИНКА', 4),
('Мешок чудес', 690, 'Текстиль', '700 г', 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/d367959e-76e4-4618-be72-b36b9524de2e.jpg', 'Мягкий праздничный рюкзачок со сладким наполнением', 'ЛЮБИМЫЙ', 5),
('Золотая ночь', 1490, 'Жесть', '1000 г', 'https://cdn.poehali.dev/projects/e2f97ad9-298e-4edf-8013-279637c16477/files/8e04a134-6c5d-46c9-a838-d5113f6a7ab4.jpg', 'Много сладостей в эффектной новогодней упаковке', 'ВЫГОДНО', 6);