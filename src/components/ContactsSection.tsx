import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { villageBgImage } from '@/data/products';
import FestiveBackground from '@/components/festive/FestiveBackground';
import { toast } from 'sonner';

import { useText, useTextRaw, useSetting } from '@/hooks/useSiteTexts';
import func2url from '../../backend/func2url.json';

export default function ContactsSection() {
  const t = useText();
  const tr = useTextRaw();
  const st = useSetting();

  const officePhone = tr('cont.phone', '+7 909 302-00-77');
  const email = tr('cont.email', 'chebpodarki@yandex.ru');

  const contacts = [
    { icon: 'Phone', label: 'Телефон', value: officePhone, href: `tel:${officePhone.replace(/[^+\d]/g, '')}` },
    { icon: 'Mail', label: 'Почта', value: email, href: `mailto:${email}` },
    { icon: 'MapPin', label: 'Офис', value: tr('cont.address', 'г. Чебоксары, ул. Петрова, 6/3'), href: '' },
  ];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, '').length < 10) {
      toast.error('Заполните имя и корректный номер телефона');
      return;
    }
    setSending(true);
    try {
      const res = await fetch(func2url.leads, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create', name, phone, amount }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || 'Не удалось отправить заявку, позвоните нам');
        return;
      }
      toast.success('Заявка отправлена! Перезвоним в течение 15 минут');
      setName('');
      setPhone('');
      setAmount('');
    } catch {
      toast.error('Нет связи. Попробуйте ещё раз или позвоните нам');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacts" className="relative bg-[#141238] text-forest-foreground">
      <FestiveBackground image={st('img.contactsBg', villageBgImage)} flakes={40} overlay="linear-gradient(90deg, rgba(12,16,48,0.9) 0%, rgba(20,18,60,0.75) 50%, rgba(20,18,60,0.45) 100%)" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="eyebrow-script text-festive-gold mb-2">
            {t('cont.eyebrow', 'Мы рядом')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight text-glow">
            {t('cont.title', 'Давайте соберём ваш идеальный подарок')}
          </h2>
          <p className="mt-5 text-sm sm:text-base text-white/85 max-w-md leading-relaxed">
            {t('cont.text', 'Позвоните или оставьте заявку — поможем выбрать упаковку, вес и состав.')}
          </p>

          <div className="mt-8 space-y-4">
            {contacts.map(c => (
              <div key={c.label} className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                  <Icon name={c.icon} size={18} />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] uppercase tracking-wide text-forest-foreground/55">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="font-bold text-sm sm:text-base hover:text-secondary transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    <div className="font-bold text-sm sm:text-base">{c.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white text-foreground rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-black text-forest">{t('cont.formTitle', 'Получить консультацию')}</h3>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {t('cont.formText', 'Ответим на вопросы и рассчитаем стоимость')}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">Ваше имя</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Георгий"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Номер телефона</label>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5">Количество подарков</label>
              <select
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-forest transition"
              >
                <option value="">Выберите количество</option>
                <option value="1-10">1–10 шт.</option>
                <option value="10-50">10–50 шт.</option>
                <option value="50-200">50–200 шт.</option>
                <option value="200+">Более 200 шт.</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white py-3.5 font-bold hover:brightness-110 transition disabled:opacity-70"
            >
              {sending ? 'Отправляем...' : t('cont.formBtn', 'Жду звонка')}
              <Icon name="ArrowRight" size={18} />
            </button>

            <p className="text-[10px] text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}