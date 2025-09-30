import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CallbackFormProps {
  formData: { name: string; phone: string };
  setFormData: (data: { name: string; phone: string }) => void;
  formSubmitted: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function CallbackForm({ formData, setFormData, formSubmitted, handleSubmit }: CallbackFormProps) {
  return (
    <section id="callback" className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gradient-to-br from-primary via-red-600 to-red-700 text-white border-2 border-white/20 shadow-2xl">
          <CardContent className="p-10">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Icon name="Phone" size={48} className="text-secondary animate-pulse" />
                <h2 className="text-4xl font-black">Нужна помощь с выбором?</h2>
              </div>
              <p className="text-xl font-semibold mb-2">Оставьте свой номер, и мы перезвоним!</p>
              <p className="text-white/90">Наш менеджер поможет подобрать идеальный подарок 🎁</p>
            </div>

            {formSubmitted ? (
              <div className="bg-white/20 backdrop-blur rounded-2xl p-8 text-center">
                <Icon name="CheckCircle" size={64} className="mx-auto mb-4 text-secondary" />
                <h3 className="text-2xl font-black mb-2">Спасибо!</h3>
                <p className="text-lg">Мы свяжемся с вами в ближайшее время!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-bold mb-2">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-secondary"
                    placeholder="Например, Анна"
                  />
                </div>
                <div>
                  <label className="block text-lg font-bold mb-2">Ваш телефон</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg text-foreground font-medium focus:outline-none focus:ring-4 focus:ring-secondary"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-secondary to-yellow-400 text-foreground hover:opacity-90 text-xl py-6 font-black shadow-xl"
                >
                  <Icon name="Phone" size={24} className="mr-2" />
                  Перезвоните мне!
                </Button>
              </form>
            )}

            <div className="mt-6 text-center text-sm text-white/80">
              <Icon name="Lock" size={16} className="inline mr-1" />
              Ваши данные в безопасности и не передаются третьим лицам
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}