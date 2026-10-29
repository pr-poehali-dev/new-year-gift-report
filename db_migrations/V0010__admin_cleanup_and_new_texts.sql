UPDATE t_p8000729_new_year_gift_report.site_texts SET section = '_archive' WHERE text_key IN ('hero.stat1v','hero.stat1l','hero.stat2v','hero.stat2l','hero.stat3v','hero.stat3l','hero.price','hero.priceSub','hero.cardTitle','hero.cardText','catalog.eyebrow','catalog.text','head.slogan','head.sub','nav.request','about.s1v','about.s1l','about.s2v','about.s2l','about.s3v','about.s3l','about.s4v','about.s4l');
UPDATE t_p8000729_new_year_gift_report.site_settings SET kind = '_archive' WHERE setting_key = 'img.hero';

INSERT INTO t_p8000729_new_year_gift_report.site_texts (text_key, section, title, value, multiline, sort_order) VALUES
('head.btnShort','Шапка сайта','Кнопка звонка на телефоне','Звонок',false,5),
('hero.btn2Sub','Первый экран','Подпись под кнопкой каталога','PDF · все подарки и цены',false,20),
('catalog.soldOut','Каталог подарков','Метка «распродано» на фото','Распродали',false,20),
('comp.cert','Состав','Пункт рядом с количеством конфет','Сертификат качества',false,20),
('cont.fName','Контакты','Поле: имя','Ваше имя',false,20),
('cont.fNamePh','Контакты','Подсказка в поле имени','Георгий',false,21),
('cont.fPhone','Контакты','Поле: телефон','Номер телефона',false,22),
('cont.fAmount','Контакты','Поле: количество','Количество подарков',false,23),
('cont.fAmountPh','Контакты','Подсказка в поле количества','Выберите количество',false,24),
('cont.consent','Контакты','Согласие под кнопкой','Нажимая кнопку, вы соглашаетесь на обработку персональных данных',true,25),
('rev.s1n','Отзывы','Отзыв 1: имя','Анна М.',false,20),
('rev.s1r','Отзывы','Отзыв 1: кто','Заказ для детского сада',false,21),
('rev.s1x','Отзывы','Отзыв 1: текст','Заказывали 120 наборов «Снежная сказка» — привезли точно в срок, дети в восторге, состав отличный.',true,22),
('rev.s2n','Отзывы','Отзыв 2: имя','Дмитрий К.',false,23),
('rev.s2r','Отзывы','Отзыв 2: кто','Заказ для семьи',false,24),
('rev.s2x','Отзывы','Отзыв 2: текст','Брали жестяную упаковку в подарок родителям. Выглядит дорого, конфеты свежие. Будем заказывать ещё.',true,25),
('rev.s3n','Отзывы','Отзыв 3: имя','Елена В.',false,26),
('rev.s3r','Отзывы','Отзыв 3: кто','HR, производственная компания',false,27),
('rev.s3x','Отзывы','Отзыв 3: текст','Сделали брендирование с нашим логотипом и закрывающие документы. Всё оперативно и без нервов.',true,28);

INSERT INTO t_p8000729_new_year_gift_report.site_settings (setting_key, kind, title, hint, value, sort_order) VALUES
('hidden.keys','hidden','Скрытые надписи','Надписи, убранные с сайта','[]',201);