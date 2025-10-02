import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Reviews() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    text: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Отзыв отправлен:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', rating: 5, text: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-50 to-red-100 relative overflow-hidden">
      <Snowfall />
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-20">
        <Card className="max-w-2xl mx-auto shadow-2xl border-2 border-primary/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-red-600 mb-4 flex items-center justify-center gap-3">
                <Icon name="Star" size={40} className="text-secondary fill-secondary" />
                Оставить отзыв
                <Icon name="Star" size={40} className="text-secondary fill-secondary" />
              </h1>
              <p className="text-lg text-muted-foreground">
                Поделитесь своим мнением о наших подарках
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-100 border-2 border-green-500 rounded-xl p-8 text-center">
                <Icon name="CheckCircle" size={64} className="mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold text-green-700 mb-2">Спасибо за отзыв! 🎉</h3>
                <p className="text-green-600">Ваше мнение очень важно для нас</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Ваше имя *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите ваше имя"
                    className="text-lg py-6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Email *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="text-lg py-6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Оценка *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon
                          name="Star"
                          size={40}
                          className={star <= formData.rating ? 'text-secondary fill-secondary' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">
                    Ваш отзыв *
                  </label>
                  <Textarea
                    required
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    placeholder="Расскажите о вашем опыте покупки..."
                    className="text-lg min-h-[150px]"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-lg py-6">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить отзыв
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  <Icon name="Lock" size={14} className="inline mr-1" />
                  Ваши данные в безопасности и не передаются третьим лицам
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
