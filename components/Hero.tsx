
import React, { useState } from 'react';
import { ArrowRight, Loader2, Lock, Mail, User, Briefcase, LogIn, Key } from 'lucide-react';
import { useLanguage } from '../App';
import { submitToWaitlist } from '../services/waitlistService';
import { authenticateUser } from '../config/accessControl';

interface HeroProps {
  onRegister: (user: { name: string; company: string; email: string }) => void;
}

const Hero: React.FC<HeroProps> = ({ onRegister }) => {
  const { t, lang } = useLanguage();
  const isRtl = lang === 'ar';
  
  const [mode, setMode] = useState<'waitlist' | 'login'>('waitlist');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    accessCode: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{type: 'error' | 'success', text: string} | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle Waitlist
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.company) return;
    
    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      await submitToWaitlist(formData);
      setStatusMsg({
        type: 'success',
        text: isRtl 
          ? "تم تسجيلك بنجاح. سنقوم بمراجعة طلبك وإرسال كود الدخول." 
          : "Success. We will review your request and email you an access code."
      });
      setFormData({ name: '', company: '', email: '', accessCode: '' });
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Login (Using new Security Config)
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.accessCode) return;

    setIsSubmitting(true);
    setStatusMsg(null);

    // Simulate Network Latency for realism
    setTimeout(() => {
        const user = authenticateUser(formData.email, formData.accessCode);

        if (user) {
            onRegister({
                name: user.name,
                company: user.company,
                email: user.email
            });
        } else {
            setStatusMsg({
                type: 'error',
                text: isRtl 
                  ? "بيانات غير صحيحة. يرجى التحقق." 
                  : "Invalid credentials."
            });
        }
        setIsSubmitting(false);
    }, 800);
  };

  const logos = [
    { name: "Oracle" }, { name: "Samsung" }, { name: "Cisco" },
    { name: "IBM" }, { name: "Siemens" }, { name: "Intel" }
  ];

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-20 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/50 rounded-full px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-zinc-400 backdrop-blur-sm">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               {t.hero.badge}
            </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 max-w-5xl mx-auto leading-[1.05] animate-fade-in-up delay-100">
          {t.hero.title}
        </h1>
        
        <p className="text-lg md:text-2xl text-zinc-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
          {t.hero.subtitle}
        </p>

        {/* Auth Card */}
        <div className="w-full max-w-md animate-fade-in-up delay-300 relative z-30">
           
           <div className="flex bg-zinc-900/80 p-1 rounded-xl mb-4 border border-white/5 backdrop-blur-md">
               <button 
                 onClick={() => { setMode('waitlist'); setStatusMsg(null); }}
                 className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${mode === 'waitlist' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 {isRtl ? 'طلب انضمام' : 'Waitlist'}
               </button>
               <button 
                 onClick={() => { setMode('login'); setStatusMsg(null); }}
                 className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${mode === 'login' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
               >
                 {isRtl ? 'دخول الأعضاء' : 'Login'}
               </button>
           </div>

           <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                 
                 {statusMsg && (
                     <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl ${statusMsg.type === 'success' ? 'bg-zinc-900/95' : 'bg-red-950/90'}`}>
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
                        <div className="space-y-3 animate-fade-in-up">
                             {/* Inputs condensed for cleaner XML, using same styling */}
                            <div className="relative">
                                <User size={16} className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRtl ? 'right-4' : 'left-4'}`} />
                                <input type="text" name="name" required placeholder={t.hero.placeholder_name} value={formData.name} onChange={handleChange} className={`w-full bg-black border border-zinc-700 rounded-lg py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`} />
                            </div>
                            <div className="relative">
                                <Briefcase size={16} className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRtl ? 'right-4' : 'left-4'}`} />
                                <input type="text" name="company" required placeholder={t.hero.placeholder_company} value={formData.company} onChange={handleChange} className={`w-full bg-black border border-zinc-700 rounded-lg py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`} />
                            </div>
                            <div className="relative">
                                <Mail size={16} className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRtl ? 'right-4' : 'left-4'}`} />
                                <input type="email" name="email" required placeholder={t.hero.placeholder_email} value={formData.email} onChange={handleChange} className={`w-full bg-black border border-zinc-700 rounded-lg py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`} />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3 animate-fade-in-up">
                            <div className="relative">
                                <Mail size={16} className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRtl ? 'right-4' : 'left-4'}`} />
                                <input type="email" name="email" required placeholder={t.hero.placeholder_email} value={formData.email} onChange={handleChange} className={`w-full bg-black border border-zinc-700 rounded-lg py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`} />
                            </div>
                            <div className="relative">
                                <Key size={16} className={`absolute top-1/2 -translate-y-1/2 text-zinc-500 ${isRtl ? 'right-4' : 'left-4'}`} />
                                <input type="password" name="accessCode" required placeholder={isRtl ? "كود الدخول" : "Access Code"} value={formData.accessCode} onChange={handleChange} className={`w-full bg-black border border-zinc-700 rounded-lg py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all text-sm ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'}`} />
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
                 </form>
           </div>
        </div>

        {/* Footer Logos */}
        <div className="w-full max-w-4xl mx-auto mt-16 md:mt-20 opacity-40 hover:opacity-100 transition-opacity duration-700">
           <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] mb-8 font-bold text-center">{t.hero.footer_text}</p>
           <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 grayscale">
               {logos.map((logo, index) => (
                  <span key={index} className="text-lg md:text-xl font-bold text-zinc-300 tracking-widest font-mono select-none cursor-default">
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
