
import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductShowcase from './components/ProductShowcase';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import BigLogoFooter from './components/BigLogoFooter';
import DeviceNotification from './components/DeviceNotification';
import Dashboard from './components/Dashboard';
import VisualEngine from './components/layout/VisualEngine';
import { content } from './utils/content';

// Context definition
export const LanguageContext = createContext<any>(null);

export const useLanguage = () => useContext(LanguageContext);

function App() {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState<{ name: string; company: string; email: string } | null>(null);

  // Handle Persistence
  useEffect(() => {
    const savedLang = localStorage.getItem('wakeel_lang');
    if (savedLang && ['en', 'ar', 'fr', 'es', 'de'].includes(savedLang)) {
        setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    const isRtl = lang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('wakeel_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => {
        if (prev === 'en') return 'ar';
        if (prev === 'ar') return 'fr';
        if (prev === 'fr') return 'es';
        if (prev === 'es') return 'de';
        return 'en';
    });
  };
  
  const setSpecificLanguage = (code: string) => {
      setLang(code);
  };

  const handleLogin = (userData: { name: string; company: string; email: string }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const t = (content as any)[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setSpecificLanguage, t }}>
      <div className={`min-h-screen flex flex-col bg-black font-sans text-zinc-100 selection:bg-indigo-500/30 selection:text-white ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        
        {/* Unified Visual Engine (Optimized) */}
        <VisualEngine />
        
        {/* Device Detection (Professional) */}
        <DeviceNotification />
        
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <>
            <Header />
            <main className="flex-grow relative z-10">
              <Hero onRegister={handleLogin} />
              
              <div className="reveal-on-scroll fade-up">
                <HowItWorks />
              </div>

              <div className="reveal-on-scroll fade-up">
                <ProductShowcase />
              </div>

              <div className="reveal-on-scroll fade-up">
                <Features />
              </div>
              
              <div className="reveal-on-scroll fade-up">
                <Testimonials />
              </div>

              <div className="reveal-on-scroll fade-up">
                <BigLogoFooter />
              </div>
            </main>
          </>
        )}
        
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
