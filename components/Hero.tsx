
import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, Lock } from 'lucide-react';
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
    <section className="relative pt-24 pb-20 md:pb-32 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Minimalist Badge */}
        <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-zinc-400 backdrop-blur-sm">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               {t.hero.badge}
            </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 max-w-5xl mx-auto leading-[1.1] animate-fade-in-up delay-100">
          {t.hero.title}
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
          {t.hero.subtitle}
        </p>

        {/* Main Form Area */}
        <div className="w-full max-w-md animate-fade-in-up delay-300 relative z-30">
           <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl ring-1 ring-white/5">
               {isSuccess ? (
                 <div className="text-center animate-fade-in py-8">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 border border-emerald-500/20">
                      <CheckCircle size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">{t.hero.success.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{t.hero.success.desc}</p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-3">
                    
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                          type="text" 
                          name="name"
                          required
                          placeholder={t.hero.placeholder_name}
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:bg-black/80 transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                      <input 
                          type="text" 
                          name="company"
                          required
                          placeholder={t.hero.placeholder_company}
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:bg-black/80 transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <input 
                        type="email" 
                        name="email"
                        required
                        placeholder={t.hero.placeholder_email}
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-base md:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:bg-black/80 transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                    />

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-white text-black hover:bg-zinc-200 disabled:opacity-70 disabled:cursor-not-allowed transition-colors rounded-lg py-3.5 font-bold text-sm flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          <span>{t.hero.btn_join}</span>
                          <ArrowRight size={16} className={`${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
                        </>
                      )}
                    </button>
                    
                    {errorMsg && (
                        <p className="text-red-400 text-xs text-center mt-2">{errorMsg}</p>
                    )}
                    
                    <div className="flex items-center justify-center gap-2 pt-3 opacity-50">
                        <Lock size={10} className="text-zinc-500" />
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{t.hero.privacy}</span>
                    </div>
                 </form>
               )}
           </div>
        </div>

        {/* Trust Strip */}
        <div className="w-full border-t border-white/5 pt-10 mt-16">
           <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] mb-6 font-medium">{t.hero.footer_text}</p>
           <div className="flex w-full justify-center opacity-20 space-x-8 md:space-x-16 items-center flex-wrap grayscale mix-blend-screen pointer-events-none select-none">
               {logos.map((logo, index) => (
                  <span key={index} className="text-lg md:text-xl font-bold text-white tracking-widest font-mono">
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
