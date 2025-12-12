
import React, { useRef, useEffect, useState } from 'react';
import { Shield, Globe } from 'lucide-react';
import { useLanguage } from '../App';

const BigLogoFooter: React.FC = () => {
  const { lang } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      
      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the footer is visible
      // 0 = Just entered screen, 1 = Fully visible (bottom of page)
      const distance = windowHeight - rect.top;
      const height = rect.height;
      
      // Normalize values to create a smooth 0 to 1 curve
      let rawProgress = distance / height;
      
      // Clamp between 0 and 1
      rawProgress = Math.max(0, Math.min(1, rawProgress));
      
      setProgress(rawProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer ref={footerRef} className="w-full relative bg-black overflow-hidden flex flex-col items-center border-t border-white/5 pt-32 pb-12 min-h-[80vh] justify-end">
        
        {/* Dynamic Background Effects based on Scroll */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            
            {/* The Horizon Glow - Intensifies with scroll */}
            <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-500/20 blur-[120px] rounded-t-full transition-opacity duration-100 ease-out"
                style={{ 
                    opacity: 0.2 + (progress * 0.8), // Glows brighter as you scroll down
                    transform: `translateX(-50%) scaleY(${0.5 + (progress * 0.5)})` 
                }}
            ></div>

            {/* Sharp light line at the bottom */}
            <div 
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-white transition-all duration-300 ease-out"
                style={{
                    width: `${progress * 100}%`,
                    left: `${(1 - progress) * 50}%`,
                    opacity: progress
                }}
            ></div>
        </div>

        {/* Main Content - Massive White Logo with Physics */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 mb-auto mt-auto select-none perspective-1000">
            <h1 
                className="leading-none font-bold tracking-tighter text-white font-mono mix-blend-normal will-change-transform"
                style={{
                    fontSize: 'clamp(3rem, 20vw, 20rem)',
                    // Physics Effect: Starts huge (1.5x) and blurry, snaps to 1.0x and sharp
                    transform: `scale(${1.5 - (progress * 0.5)}) translateY(${(1 - progress) * 100}px)`,
                    filter: `blur(${(1 - progress) * 20}px)`,
                    opacity: 0.2 + (progress * 0.8),
                    transition: 'transform 0.1s linear, filter 0.1s linear, opacity 0.1s linear' // Smooth direct mapping
                }}
            >
                {lang === 'ar' ? 'وكيل' : 'WAKEEL'}
            </h1>
        </div>

        {/* System Status Bar - Fades in at the very end */}
        <div 
            className="relative z-10 w-full max-w-7xl px-6 md:px-8 mt-12 transition-all duration-700 ease-out delay-100"
            style={{ 
                opacity: progress > 0.8 ? 1 : 0,
                transform: `translateY(${(1 - progress) * 20}px)`
            }}
        >
            <div className="flex flex-col md:flex-row items-center justify-between py-6 border-t border-white/10 text-[10px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider gap-4">
                
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                    © 2024 Wakeel AI Inc.
                </div>

                <div className="flex items-center gap-6 md:gap-8">
                    <div className="flex items-center gap-2 group cursor-pointer hover:text-emerald-400 transition-colors">
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span>Systems Operational</span>
                    </div>

                    <div className="flex items-center gap-2 group cursor-pointer hover:text-zinc-300 transition-colors">
                        <Shield size={12} />
                        <span>SOC2 Compliant</span>
                    </div>

                    <div className="flex items-center gap-2 group cursor-pointer hover:text-zinc-300 transition-colors">
                        <Globe size={12} />
                        <span>Global Mesh</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>

            </div>
        </div>
    </footer>
  );
};

export default BigLogoFooter;
