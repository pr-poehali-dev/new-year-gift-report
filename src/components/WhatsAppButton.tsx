import Icon from '@/components/ui/icon';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/79123456789"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all animate-bounce"
      style={{ animationDuration: '2s' }}
      aria-label="Написать в WhatsApp"
    >
      <Icon name="MessageCircle" size={32} />
    </a>
  );
}