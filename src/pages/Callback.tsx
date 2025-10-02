import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import CallbackForm from '@/components/CallbackForm';

export default function Callback() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Форма отправлена:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-50 to-red-100 relative overflow-hidden">
      <Snowfall />
      <Header />
      <div className="pt-32 pb-20">
        <CallbackForm
          formData={formData}
          setFormData={setFormData}
          formSubmitted={formSubmitted}
          handleSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </div>
  );
}
