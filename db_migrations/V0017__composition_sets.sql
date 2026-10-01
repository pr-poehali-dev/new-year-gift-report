INSERT INTO t_p8000729_new_year_gift_report.site_settings (setting_key, kind, title, hint, value, sort_order)
SELECT 'composition.sets', 'compositionSets', 'Состав подарков', 'Вес, количество конфет и картинка с конфетами',
'[{"weight":"700 г","candies":"25–30 конфет","image":"/sostav/700.jpg"},{"weight":"1000 г","candies":"35–40 конфет","image":"/sostav/1000.jpg"},{"weight":"1500 г","candies":"50–55 конфет","image":"/sostav/1500.jpg"}]',
23
WHERE NOT EXISTS (SELECT 1 FROM t_p8000729_new_year_gift_report.site_settings WHERE setting_key = 'composition.sets');