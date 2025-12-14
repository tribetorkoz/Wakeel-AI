
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
import Dashboard from './components/Dashboard'; // Import Dashboard
import { content } from './utils/content';

// Context definition
export const LanguageContext = createContext<any>(null);

export const useLanguage = () => useContext(LanguageContext);

function App() {
  const [lang, setLang] = useState('en');
  // User State for "Auth" simulation
  const [user, setUser] = useState<{ name: string; company: string; email: string } | null>(null);

  // Handle Directionality and Persistence
  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLang = localStorage.getItem('wakeel_lang');
    if (savedLang && ['en', 'ar', 'fr', 'es', 'de'].includes(savedLang)) {
        setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    // Set direction
    const isRtl = lang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Save preference
    localStorage.setItem('wakeel_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    // Cycle through languages: en -> ar -> fr -> es -> de -> en
    setLang(prev => {
        if (prev === 'en') return 'ar';
        if (prev === 'ar') return 'fr';
        if (prev === 'fr') return 'es';
        if (prev === 'es') return 'de';
        return 'en';
    });
  };
  
  // Direct setter for dropdowns
  const setSpecificLanguage = (code: string) => {
      setLang(code);
  };

  const handleLogin = (userData: { name: string; company: string; email: string }) => {
    setUser(userData);
    // Optional: Save to localStorage here if we wanted persistence across refresh
  };

  const handleLogout = () => {
    setUser(null);
  };

  const t = (content as any)[lang];

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setSpecificLanguage, t }}>
      <div className={`min-h-screen flex flex-col bg-black font-sans text-zinc-100 selection:bg-indigo-500/30 selection:text-white ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        
        {/* Mechanical UI Sounds */}
        <ClickSound />
        
        {/* Mobile Physics Effects */}
        <MobileScrollEnhancer />
        
        {/* Device Detection Notification */}
        <DeviceNotification />
        
        {/* Background Layers */}
        <GlobalGrid />
        
        {user ? (
          // --- LOGGED IN VIEW: DASHBOARD ---
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          // --- PUBLIC VIEW: LANDING PAGE ---
          <>
            <Header />
            
            <main className="flex-grow relative z-10 transition-transform duration-75 will-change-transform">
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
