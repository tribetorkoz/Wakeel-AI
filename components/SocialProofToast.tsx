
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../App';
import { Bell, CheckCircle2 } from 'lucide-react';

const SocialProofToast: React.FC = () => {
  const { lang } = useLanguage();
  const isRtl = lang === 'ar';
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({ name: '', action: '', time: '' });

  // Realistic data pool mixed with international and local names for credibility
  const notificationsEn = [
    { name: "Sarah Al-Majed (Riyadh)", action: "secured priority access", time: "2s ago" },
    { name: "TechFlow Solutions", action: "deployed a Support Agent", time: "just now" },
    { name: "Omar H. (Dubai)", action: "joined the Enterprise Waitlist", time: "5s ago" },
    { name: "Global Logistics Co.", action: "requested API keys", time: "12s ago" },
    { name: "Faris Ahmed", action: "integrated WhatsApp Bot", time: "1m ago" },
    { name: "NextGen Corp", action: "upgraded to Business Plan", time: "30s ago" }
  ];

  const notificationsAr = [
    { name: "سارة الماجد (الرياض)", action: "انضمت لقائمة الأولويات", time: "منذ ثانتين" },
    { name: "شركة المسار التقني", action: "قامت بنشر وكيل دعم فني", time: "الآن" },
    { name: "عمر الهاشمي (دبي)", action: "طلب وصول للشركات", time: "منذ ٥ ثوان" },
    { name: "مجموعة الأفق", action: "بدأت تجربة الأتمتة", time: "منذ ١٢ ثانية" },
    { name: "فارس أحمد", action: "قام بربط بوت واتساب", time: "منذ دقيقة" },
    { name: "شركة نكست جين", action: "رقت حسابها للباقة الذهبية", time: "منذ ٣٠ ثانية" }
  ];

  useEffect(() => {
    const showNotification = () => {
      const data = isRtl ? notificationsAr : notificationsEn;
      const randomItem = data[Math.floor(Math.random() * data.length)];
      setNotification(randomItem);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Initial delay
    const initialTimeout = setTimeout(showNotification, 2000);

    // Loop every 8-15 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 7000 + 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isRtl]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 ${isRtl ? 'right-6' : 'left-6'} z-50 animate-slide-in-bottom`}>
      <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-xl p-4 flex items-center gap-4 max-w-sm">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
          <CheckCircle2 size={20} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight mb-0.5">
            {notification.name}
          </p>
          <p className="text-xs text-zinc-400">
            {notification.action} <span className="text-zinc-600">• {notification.time}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProofToast;
