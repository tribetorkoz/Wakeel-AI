
import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, Lock, ShieldCheck, CreditCard } from 'lucide-react';
import { useLanguage } from '../App';
import { submitToWaitlist } from '../services/waitlistService';

const Hero: React.FC = () => {
  const { t, lang } = useLanguage();
  const isRtl = lang === 'ar';
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.company) return;
    
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const result = await submitToWaitlist(formData);
      
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', company: '', email: '' });
      } else {
        setErrorMsg('Submission failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Main Benefit Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 max-w-5xl mx-auto leading-[1.05] animate-fade-in-up delay-100">
          {t.hero.title}
        </h1>
        
        {/* Pain Point + Solution Subtitle */}
        <p className="text-lg md:text-2xl text-zinc-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
          {t.hero.subtitle}
        </p>

        {/* High Conversion Form */}
        <div className="w-full max-w-md animate-fade-in-up delay-300 relative z-30">
           <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
               {isSuccess ? (
                 <div className="text-center animate-fade-in py-8">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 border border-emerald-500/20">
                      <CheckCircle size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">{t.hero.success.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed px-4">{t.hero.success.desc}</p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="space-y-3">
                      <input 
                          type="text" 
                          name="name"
                          required
                          placeholder={t.hero.placeholder_name}
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                      <input 
                          type="text" 
                          name="company"
                          required
                          placeholder={t.hero.placeholder_company}
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                      <input 
                          type="email" 
                          name="email"
                          required
                          placeholder={t.hero.placeholder_email}
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-white text-black hover:bg-zinc-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all rounded-lg py-4 font-bold text-lg flex items-center justify-center gap-2 group shadow-xl hover:shadow-white/10 active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <Loader2 size={24} className="animate-spin" />
                      ) : (
                        <>
                          <span>{t.hero.btn_join}</span>
                          <ArrowRight size={20} className={`${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
                        </>
                      )}
                    </button>
                    
                    {errorMsg && (
                        <p className="text-red-400 text-xs text-center mt-2">{errorMsg}</p>
                    )}

                    {/* Trust Signals */}
                    <div className="flex flex-col items-center gap-2 pt-3 border-t border-white/5 mt-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs">
                           <CreditCard size={12} />
                           <span>{t.hero.no_card}</span>
                        </div>
                        <div className="flex items-center gap-4 opacity-70">
                            <div className="flex items-center gap-1.5">
                                <Lock size={10} className="text-emerald-500" />
                                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{t.hero.privacy}</span>
                            </div>
                        </div>
                    </div>
                 </form>
               )}
           </div>
        </div>

        {/* Social Proof / Trusted By */}
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
