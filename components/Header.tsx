
import React, { useState, useEffect } from 'react';
import { Menu, X, Bot, ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '../App';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t, lang, setSpecificLanguage } = useLanguage();
  const isRtl = lang === 'ar';

  const languages = [
      { code: 'en', label: 'English' },
      { code: 'ar', label: 'العربية' },
      { code: 'fr', label: 'Français' },
      { code: 'es', label: 'Español' },
      { code: 'de', label: 'Deutsch' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  }

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center pt-4 px-4 md:pt-6`}>
      <div className={`
        relative w-full max-w-5xl rounded-2xl md:rounded-full transition-all duration-300 flex items-center justify-between px-5 py-3
        ${isScrolled 
          ? 'bg-zinc-900/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]' 
          : 'bg-transparent border border-transparent'
        }
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group select-none" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-black shadow-lg shadow-white/10">
             <Bot size={20} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-mono">
            Wakeel_AI
          </span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <button onClick={() => scrollTo('how-it-works')} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
             {lang === 'ar' ? 'كيف نعمل' : (lang === 'fr' ? 'Comment ça marche' : 'How it Works')}
          </button>
          <button onClick={() => scrollTo('showcase')} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
            {t.nav.showcase}
          </button>
          <button onClick={() => scrollTo('features')} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
            {t.nav.solutions}
          </button>
          
          <div className="w-[1px] h-4 bg-white/10 mx-2"></div>

          {/* Language Dropdown */}
          <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="px-3 py-2 text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider rounded-full hover:bg-white/5 flex items-center gap-1"
              >
                <Globe size={14} />
                {lang.toUpperCase()}
              </button>
              
              {showLangMenu && (
                  <div className="absolute top-full mt-2 w-32 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-xl flex flex-col p-1 animate-fade-in-up">
                      {languages.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => { setSpecificLanguage(l.code); setShowLangMenu(false); }}
                            className={`px-3 py-2 text-xs font-medium text-start rounded-lg hover:bg-white/10 transition-colors ${lang === l.code ? 'text-white bg-white/5' : 'text-zinc-400'}`}
                          >
                              {l.label}
                          </button>
                      ))}
                  </div>
              )}
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="ml-2 bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-white/5"
          >
            {t.nav.cta}
            <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden gap-3 items-center">
           <button
             onClick={() => setShowLangMenu(!showLangMenu)}
             className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase px-2 py-1"
           >
             {lang.toUpperCase()}
           </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-xl bg-zinc-800/50 text-zinc-200 hover:text-white focus:outline-none border border-white/5"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Language Menu Overlay */}
    {showLangMenu && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 md:hidden" onClick={() => setShowLangMenu(false)}>
            <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-xs overflow-hidden">
                <div className="p-4 border-b border-white/5 text-center font-bold text-white">Select Language</div>
                <div className="flex flex-col p-2">
                    {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={(e) => { e.stopPropagation(); setSpecificLanguage(l.code); setShowLangMenu(false); }}
                          className={`px-4 py-4 text-sm font-medium text-center rounded-xl hover:bg-white/10 transition-colors ${lang === l.code ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' : 'text-zinc-400'}`}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )}

    {/* Mobile Menu Overlay */}
    {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden flex items-start justify-center pt-24" onClick={() => setIsMenuOpen(false)}>
            <div 
              className="w-[90%] bg-zinc-900 border border-white/10 rounded-3xl p-2 shadow-2xl animate-fade-in-up origin-top"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col">
                <button onClick={() => scrollTo('how-it-works')} className="w-full text-start px-6 py-4 rounded-2xl text-lg font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  {lang === 'ar' ? 'كيف نعمل' : (lang === 'fr' ? 'Comment ça marche' : 'How it Works')}
                </button>
                <button onClick={() => scrollTo('showcase')} className="w-full text-start px-6 py-4 rounded-2xl text-lg font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  {t.nav.showcase}
                </button>
                <button onClick={() => scrollTo('features')} className="w-full text-start px-6 py-4 rounded-2xl text-lg font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                  {t.nav.solutions}
                </button>
                <div className="h-[1px] bg-white/5 mx-4 my-2"></div>
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-white text-black px-6 py-4 rounded-2xl font-bold text-center text-lg active:scale-95 transition-transform mt-2"
                >
                  {t.nav.cta}
                </button>
              </div>
            </div>
        </div>
    )}
    </>
  );
};

export default Header;
