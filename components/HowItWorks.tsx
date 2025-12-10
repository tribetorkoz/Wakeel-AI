
import React, { useRef, useEffect, useState } from 'react';
import { Upload, Cpu, CheckCircle } from 'lucide-react';
import { useLanguage } from '../App';

const HowItWorks: React.FC = () => {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const icons = [Upload, Cpu, CheckCircle];

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t.howItWorks.title}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{t.howItWorks.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[2px] bg-zinc-800 z-0">
              <div 
                className={`h-full bg-indigo-600 transition-all duration-[1500ms] ease-out ${isVisible ? 'w-full' : 'w-0'}`}
              ></div>
           </div>

           {t.howItWorks.steps.map((step: any, index: number) => {
             const Icon = icons[index];
             return (
               <div key={index} className={`relative z-10 flex flex-col items-center text-center reveal-on-scroll fade-up delay-${index * 200}`}>
                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 shadow-lg transition-all duration-500 ${isVisible ? 'bg-zinc-900 border-indigo-500/50 text-white' : 'bg-black border-zinc-800 text-zinc-600'}`}>
                     <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">{step.desc}</p>
               </div>
             );
           })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
