INSERT INTO t_p8000729_new_year_gift_report.site_settings (setting_key, kind, title, hint, value, sort_order)
SELECT 'catalog.packaging', 'packaging', 'Виды упаковки', 'Карточки в блоке «Какой будет ваш подарок?»',
'[{"name":"Картон","icon":"Gift","description":"Лёгкие яркие коробки для детских праздников","color":"rose"},{"name":"Текстиль","icon":"ShoppingBag","description":"Мягкие рюкзачки и игрушки","color":"amber"},{"name":"Футляр","icon":"Package","description":"Тубы и футляры с золотым тиснением","color":"indigo"},{"name":"Мешочки","icon":"Gem","description":"Нарядные мешочки со сладостями","color":"emerald"}]',
22
WHERE NOT EXISTS (SELECT 1 FROM t_p8000729_new_year_gift_report.site_settings WHERE setting_key = 'catalog.packaging');