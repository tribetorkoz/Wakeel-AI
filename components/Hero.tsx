
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
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Minimalist Badge */}
        <div className="mb-8 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/50 rounded-full px-4 py-1.5 text-[11px] font-mono uppercase tracking-widest text-zinc-400 backdrop-blur-sm">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               {t.hero.badge}
            </span>
        </div>

        {/* Headline - Bolder and More Impactful */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 max-w-5xl mx-auto leading-[1.05] animate-fade-in-up delay-100">
          {t.hero.title}
        </h1>
        
        {/* Subtitle - Refined Typography */}
        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
          {t.hero.subtitle}
        </p>

        {/* Main Form Area - Vertical Stack */}
        <div className="w-full max-w-sm animate-fade-in-up delay-300 relative z-30">
           <div className="bg-transparent md:bg-zinc-900/30 md:backdrop-blur-sm md:border border-white/5 rounded-2xl p-0 md:p-8">
               {isSuccess ? (
                 <div className="text-center animate-fade-in py-8 bg-zinc-900/80 rounded-2xl border border-emerald-500/20">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500 border border-emerald-500/20">
                      <CheckCircle size={32} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">{t.hero.success.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed px-4">{t.hero.success.desc}</p>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="space-y-4">
                      <input 
                          type="text" 
                          name="name"
                          required
                          placeholder={t.hero.placeholder_name}
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-900/50 transition-all shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                      <input 
                          type="text" 
                          name="company"
                          required
                          placeholder={t.hero.placeholder_company}
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-900/50 transition-all shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                      <input 
                          type="email" 
                          name="email"
                          required
                          placeholder={t.hero.placeholder_email}
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-black border border-zinc-800 rounded-xl px-5 py-4 text-base text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-900/50 transition-all shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-white text-black hover:bg-zinc-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all rounded-xl py-4 font-bold text-sm md:text-base flex items-center justify-center gap-2 group shadow-lg shadow-white/5 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <>
                          <span>{t.hero.btn_join}</span>
                          <ArrowRight size={18} className={`${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
                        </>
                      )}
                    </button>
                    
                    {errorMsg && (
                        <p className="text-red-400 text-xs text-center mt-2">{errorMsg}</p>
                    )}

                    <div className="text-center pt-2">
                         <span className="text-zinc-500 text-xs">Join growing list of companies.</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 pt-1 opacity-60">
                        <Lock size={10} className="text-zinc-600" />
                        <span className="text-[10px] text-zinc-600 uppercase tracking-wider">{t.hero.privacy}</span>
                    </div>
                 </form>
               )}
           </div>
        </div>

        {/* Trust Strip - Low opacity logos */}
        <div className="w-full max-w-4xl mx-auto mt-20 md:mt-24 reveal-on-scroll fade-up">
           <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] mb-8 font-semibold opacity-70">{t.hero.footer_text}</p>
           <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 md:gap-x-16 grayscale opacity-30 hover:opacity-50 transition-opacity duration-500">
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
