INSERT INTO site_texts (text_key, section, title, value, multiline, sort_order)
SELECT v.k, 'Преимущества', v.t, v.val, v.m, v.o FROM (VALUES
  ('adv.big1', 'Крупная надпись — строка 1', '12+ лет', false, 0),
  ('adv.big2', 'Крупная надпись — строка 2', 'радуем детей', false, 0),
  ('adv.lead', 'Текст рядом с крупной надписью', 'Создаем новогодние подарки, которые дарят радость, объединяют и остаются в памяти надолго.', true, 0),
  ('adv.eyebrow', 'Подпись над карточками', 'Наши преимущества', false, 0)
) AS v(k, t, val, m, o)
WHERE NOT EXISTS (SELECT 1 FROM site_texts s WHERE s.text_key = v.k);