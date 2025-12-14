
import React, { useState } from 'react';
import { ArrowRight, Loader2, Lock, CreditCard, Key, Mail, User, Briefcase, LogIn } from 'lucide-react';
import { useLanguage } from '../App';
import { submitToWaitlist } from '../services/waitlistService';

interface HeroProps {
  onRegister: (user: { name: string; company: string; email: string }) => void;
}

// --- 🔐 CONFIGURATION: AUTHORIZED USERS LIST 🔐 ---
// أضف هنا الأشخاص الذين تريد منحهم صلاحية الدخول
// Add emails and access codes here for people you want to allow in immediately
const ALLOWED_USERS = [
  // Admin Account
  { email: "admin@wakeel.ai", code: "admin123", name: "Admin", company: "Wakeel HQ" },
  // Demo User
  { email: "demo@wakeel.ai", code: "demo2024", name: "Demo User", company: "Future Corp" },
  // VIP Client Example
  { email: "client@vip.com", code: "client2024", name: "VIP Client", company: "Golden Inc" },
  // Tester Example
  { email: "test@user.com", code: "123456", name: "Beta Tester", company: "Testing LLC" }
];

const Hero: React.FC<HeroProps> = ({ onRegister }) => {
  const { t, lang } = useLanguage();
  const isRtl = lang === 'ar';
  
  const [mode, setMode] = useState<'waitlist' | 'login'>('waitlist');
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    accessCode: '' // Only for login
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{type: 'error' | 'success', text: string} | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle Waitlist (Public)
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.company) return;
    
    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      // Submit to Google Sheet
      await submitToWaitlist(formData);
      
      // Show Success Message (Do NOT login)
      setStatusMsg({
        type: 'success',
        text: isRtl 
          ? "تم تسجيلك في قائمة الانتظار بنجاح. سنقوم بمراجعة طلبك وإرسال كود الدخول عبر البريد الإلكتروني." 
          : "Successfully joined the waitlist. We will review your request and email you an access code."
      });
      setIsSubmitting(false);
      // Clear form
      setFormData({ name: '', company: '', email: '', accessCode: '' });

    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Network error. Please try again.' });
      setIsSubmitting(false);
    }
  };

  // Handle Login (Private)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.accessCode) return;

    setIsSubmitting(true);
    setStatusMsg(null);

    // Simulate API Check
    setTimeout(() => {
        const user = ALLOWED_USERS.find(u => 
            u.email.toLowerCase() === formData.email.toLowerCase() && 
            u.code === formData.accessCode
        );

        if (user) {
            // Success: Log them in
            onRegister({
                name: user.name,
                company: user.company,
                email: user.email
            });
        } else {
            // Failure
            setStatusMsg({
                type: 'error',
                text: isRtl 
                  ? "بيانات الدخول غير صحيحة. تأكد من البريد الإلكتروني وكود الوصول." 
                  : "Invalid credentials. Please check your email and access code."
            });
            setIsSubmitting(false);
        }
    }, 1000);
  };

  const logos = [
    { name: "Oracle" },
    { name: "Samsung" },
    { name: "Cisco" },
    { name: "IBM" },
    { name: "Siemens" },
    { name: "Intel" }
  ];

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Value Prop Badge */}
        <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/50 rounded-full px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-zinc-400 backdrop-blur-sm">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               {t.hero.badge}
            </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 max-w-5xl mx-auto leading-[1.05] animate-fade-in-up delay-100">
          {t.hero.title}
        </h1>
        
        <p className="text-lg md:text-2xl text-zinc-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
          {t.hero.subtitle}
        </p>

        {/* Auth Box */}
        <div className="w-full max-w-md animate-fade-in-up delay-300 relative z-30">
           
           {/* Tabs */}
           <div className="flex bg-zinc-900/80 p-1 rounded-xl mb-4 border border-white/5 backdrop-blur-md">
               <button 
                 onClick={() => { setMode('waitlist'); setStatusMsg(null); }}
                 className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${mode === 'waitlist' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 {isRtl ? 'طلب انضمام' : 'Join Waitlist'}
               </button>
               <button 
                 onClick={() => { setMode('login'); setStatusMsg(null); }}
                 className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${mode === 'login' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 {isRtl ? 'دخول الأعضاء' : 'Member Login'}
               </button>
           </div>

           <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                 
                 {/* Status Message Overlay */}
                 {statusMsg && (
                     <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl ${statusMsg.type === 'success' ? 'bg-zinc-900/90' : 'bg-red-900/20'}`}>
                         <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${statusMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                             {statusMsg.type === 'success' ? <Lock size={24} /> : <Loader2 size={24} />}
                         </div>
                         <p className="text-white text-sm font-bold mb-4">{statusMsg.text}</p>
                         <button onClick={() => setStatusMsg(null)} className="text-xs text-zinc-400 hover:text-white underline">
                             {isRtl ? 'إغلاق' : 'Close'}
                         </button>
                     </div>
                 )}

                 <form onSubmit={mode === 'waitlist' ? handleWaitlistSubmit : handleLoginSubmit} className="space-y-4">
                    
                    {mode === 'waitlist' ? (
                        /* WAITLIST FORM */
                        <div className="space-y-3 animate-fade-in-up">
                            <div className="relative">
                                <User size={16} className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRtl ? 'right-4' : 'left-4'}`} />
                                <input 
                                    type="text" name="name" required placeholder={t.hero.placeholder_name} value={formData.name} onChange={handleChange}
                                    className={`w-full bg-black border border-zinc-700 rounded-lg py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                                />
                            </div>
                            <div className="relative">
                                <Briefcase size={16} className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRtl ? 'right-4' : 'left-4'}`} />
                                <input 
                                    type="text" name="company" required placeholder={t.hero.placeholder_company} value={formData.company} onChange={handleChange}
                                    className={`w-full bg-black border border-zinc-700 rounded-lg py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                                />
                            </div>
                            <div className="relative">
                                <Mail size={16} className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRtl ? 'right-4' : 'left-4'}`} />
                                <input 
                                    type="email" name="email" required placeholder={t.hero.placeholder_email} value={formData.email} onChange={handleChange}
                                    className={`w-full bg-black border border-zinc-700 rounded-lg py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                                />
                            </div>
                        </div>
                    ) : (
                        /* LOGIN FORM */
                        <div className="space-y-3 animate-fade-in-up">
                            <div className="relative">
                                <Mail size={16} className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRtl ? 'right-4' : 'left-4'}`} />
                                <input 
                                    type="email" name="email" required placeholder={t.hero.placeholder_email} value={formData.email} onChange={handleChange}
                                    className={`w-full bg-black border border-zinc-700 rounded-lg py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                                />
                            </div>
                            <div className="relative">
                                <Key size={16} className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRtl ? 'right-4' : 'left-4'}`} />
                                <input 
                                    type="password" name="accessCode" required placeholder={isRtl ? "كود الدخول / كلمة المرور" : "Access Code / Password"} value={formData.accessCode} onChange={handleChange}
                                    className={`w-full bg-black border border-zinc-700 rounded-lg py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                                />
                            </div>
                        </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-white text-black hover:bg-zinc-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all rounded-lg py-3 font-bold text-sm flex items-center justify-center gap-2 group shadow-xl hover:shadow-white/10 active:scale-[0.98] mt-4"
                    >
                      {isSubmitting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          <span>{mode === 'waitlist' ? (isRtl ? 'سجل اهتمامك' : 'Request Access') : (isRtl ? 'دخول النظام' : 'Enter Dashboard')}</span>
                          {mode === 'login' ? <LogIn size={16} /> : <ArrowRight size={16} className={`${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />}
                        </>
                      )}
                    </button>
                    
                    {/* Footer Links */}
                    <div className="flex flex-col items-center gap-2 pt-3 border-t border-white/5 mt-4">
                        <div className="flex items-center gap-2 text-zinc-500 text-[10px]">
                           {mode === 'waitlist' ? (
                               <span className="flex items-center gap-1"><Lock size={10}/> {t.hero.privacy}</span>
                           ) : (
                               <span>{isRtl ? 'نسيت كود الدخول؟ تواصل مع الدعم.' : 'Lost access? Contact support.'}</span>
                           )}
                        </div>
                    </div>
                 </form>
           </div>
        </div>

        {/* Social Proof */}
        <div className="w-full max-w-4xl mx-auto mt-16 md:mt-20 reveal-on-scroll fade-up">
           <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-8 font-semibold text-center">{t.hero.footer_text}</p>
           <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale opacity-50 hover:opacity-80 transition-opacity duration-500">
               {logos.map((logo, index) => (
                  <span key={index} className="text-xl md:text-2xl font-bold text-white tracking-widest font-mono select-none cursor-default">
                      {logo.name}
                  </span>
               ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
