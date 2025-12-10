
import React, { useRef, useEffect, useState } from 'react';
import { Database, Sliders, Rocket, ArrowDown } from 'lucide-react';
import { useLanguage } from '../App';

const HowItWorks: React.FC = () => {
  const { t, lang } = useLanguage();
  const isRtl = lang === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const icons = [Database, Sliders, Rocket];

  // Logic to illuminate the line based on scroll position relative to this section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we scrolled into the section
      const start = rect.top - windowHeight / 2;
      const height = rect.height;
      
      // 0 when section starts hitting center, 1 when section ends hitting center
      let progress = (windowHeight / 2 - rect.top) / height;
      
      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 md:mb-24 relative z-10 reveal-on-scroll fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t.howItWorks.title}
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 -translate-x-1/2 z-0"></div>
          
          {/* Active Glowing Line */}
          <div 
             className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 -translate-x-1/2 z-0 transition-all duration-75 ease-out shadow-[0_0_15px_rgba(99,102,241,0.5)]"
             style={{ height: `${scrollProgress * 100}%` }}
          ></div>

          <div className="space-y-16 md:space-y-32">
            {t.howItWorks.steps.map((step: any, index: number) => {
              const Icon = icons[index];
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 ${!isEven && !isRtl ? 'md:flex-row-reverse' : ''} ${!isEven && isRtl ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Text Content */}
                  <div className={`flex-1 text-center md:text-start ${isRtl ? 'md:text-right' : 'md:text-left'} ${isEven && isRtl ? 'md:text-left' : ''} ${!isEven && !isRtl ? 'md:text-right' : ''} order-2 md:order-none w-full reveal-on-scroll ${isEven ? 'slide-in-left' : 'slide-in-right'}`}>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 justify-center md:justify-start">
                       <span className="flex md:hidden w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/50 text-indigo-400 items-center justify-center text-sm font-bold">{index + 1}</span>
                       {step.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-base md:text-lg font-light">
                      {step.desc}
                    </p>
                  </div>

                  {/* Center Node (Desktop) */}
                  <div className={`hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-zinc-950 border transition-all duration-500 items-center justify-center relative group order-1 md:order-none z-10 
                      ${scrollProgress > (index / 3) + 0.1 ? 'border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)] scale-110' : 'border-zinc-800'}`}>
                    
                    <Icon size={24} className={`transition-colors duration-500 ${scrollProgress > (index / 3) + 0.1 ? 'text-indigo-400' : 'text-zinc-600'}`} />
                    
                    {/* Horizontal Connector */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-[1px] bg-zinc-800 transition-colors duration-700 
                        ${isEven ? 'right-full' : 'left-full'} 
                        ${scrollProgress > (index / 3) + 0.1 ? 'bg-indigo-500/50' : ''}`}>
                    </div>
                  </div>

                  {/* Visual/Image Placeholder */}
                  <div className={`flex-1 w-full order-1 md:order-none reveal-on-scroll zoom-in delay-200`}>
                    <div className="aspect-[16/9] rounded-2xl bg-zinc-900 border border-white/5 overflow-hidden relative group shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                       <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                       
                       {/* Abstract UI representation */}
                       <div className="absolute inset-0 flex items-center justify-center">
                          {index === 0 && (
                              <div className="w-3/4 space-y-3 opacity-60">
                                  <div className="flex gap-2">
                                      <div className="w-8 h-8 rounded bg-zinc-800"></div>
                                      <div className="h-2 w-24 bg-zinc-800 rounded self-center"></div>
                                  </div>
                                  <div className="h-1 w-full bg-zinc-800/50 rounded"></div>
                                  <div className="h-1 w-2/3 bg-zinc-800/50 rounded"></div>
                                  <div className="h-1 w-3/4 bg-zinc-800/50 rounded"></div>
                              </div>
                          )}
                          {index === 1 && (
                              <div className="flex gap-4 opacity-60">
                                  <div className="w-12 h-24 rounded-lg border border-zinc-700 bg-zinc-800/20"></div>
                                  <div className="w-12 h-24 rounded-lg border border-indigo-500/50 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]"></div>
                                  <div className="w-12 h-24 rounded-lg border border-zinc-700 bg-zinc-800/20"></div>
                              </div>
                          )}
                          {index === 2 && (
                             <div className="text-center opacity-60">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-mono mb-2">
                                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                   System Active
                                </div>
                                <div className="h-24 w-48 bg-zinc-800/30 rounded-lg border border-dashed border-zinc-700 mx-auto mt-2"></div>
                             </div>
                          )}
                       </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
          
          {/* Continue Arrow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-8 opacity-20 animate-bounce hidden md:block">
              <ArrowDown className="text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
