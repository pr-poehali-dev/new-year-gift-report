import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const contacts = [
  { icon: 'Phone', label: 'Телефон', value: '+7 909 302-00-77', href: 'tel:+79093020077' },
  { icon: 'Mail', label: 'Почта', value: 'chebpodarki@yandex.ru', href: 'mailto:chebpodarki@yandex.ru' },
  { icon: 'MapPin', label: 'Офис', value: 'Чебоксары, ул. Петрова, 6/3' },
];

export default function ContactsSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error('Заполните имя и телефон');
      return;
    }
    toast.success('Заявка отправлена! Перезвоним в течение 15 минут');
    setName('');
    setPhone('');
    setAmount('');
  };

  return (
    <section id="contacts" className="bg-forest text-forest-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-secondary mb-3">
            Мы рядом
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
            Давайте соберём ваш идеальный подарок
          </h2>
          <p className="mt-5 text-sm sm:text-base text-forest-foreground/75 max-w-md leading-relaxed">
            Позвоните или оставьте заявку — поможем выбрать упаковку, вес и состав.
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
          <h3 className="text-xl sm:text-2xl font-extrabold text-forest">Получить консультацию</h3>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Ответим на вопросы и рассчитаем стоимость
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
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white py-3.5 font-bold hover:brightness-110 transition"
            >
              Жду звонка
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
