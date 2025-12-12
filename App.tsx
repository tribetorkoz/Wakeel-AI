
import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductShowcase from './components/ProductShowcase';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import BigLogoFooter from './components/BigLogoFooter';
import GlobalGrid from './components/GlobalGrid';
import ClickSound from './components/ClickSound';
import MobileScrollEnhancer from './components/MobileScrollEnhancer';
import DeviceNotification from './components/DeviceNotification';
import { content } from './utils/content';

// Context definition
export const LanguageContext = createContext<any>(null);

export const useLanguage = () => useContext(LanguageContext);

function App() {
  const [lang, setLang] = useState('en');

  // Handle Directionality
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (content as any)[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      <div className={`min-h-screen flex flex-col bg-black font-sans text-zinc-100 selection:bg-indigo-500/30 selection:text-white ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        
        {/* Mechanical UI Sounds */}
        <ClickSound />
        
        {/* Mobile Physics Effects */}
        <MobileScrollEnhancer />
        
        {/* Device Detection Notification */}
        <DeviceNotification />
        
        {/* Background Layers */}
        <GlobalGrid />
        
        <Header />
        
        <main className="flex-grow relative z-10 transition-transform duration-75 will-change-transform">
          <Hero />
          
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
        
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
