
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, FileText, Check, Cpu, ArrowRight, Loader2, FileCheck } from 'lucide-react';
import { useLanguage } from '../App';

const ProductShowcase: React.FC = () => {
  const { t, lang } = useLanguage();
  const isRtl = lang === 'ar';
  
  const [step, setStep] = useState(0); // 0: Idle, 1: Typing Input, 2: Processing, 3: Output
  const [typedText, setTypedText] = useState('');
  const [logLines, setLogLines] = useState<string[]>([]);
  
  const targetText = t.productShowcase.simulation.input_text;
  const processingLogs = t.productShowcase.simulation.processing;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Animation Sequence
  useEffect(() => {
    if (!isVisible) return;

    // Reset loop
    if (step === 3) {
        const timer = setTimeout(() => {
            setStep(0);
            setTypedText('');
            setLogLines([]);
        }, 12000); // Hold result longer
        return () => clearTimeout(timer);
    }

    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 1000);
      return () => clearTimeout(timer);
    }

    if (step === 1) {
      if (typedText.length < targetText.length) {
        const timeout = setTimeout(() => {
          setTypedText(targetText.slice(0, typedText.length + 1));
        }, 25); // Faster typing
        return () => clearTimeout(timeout);
      } else {
        const timer = setTimeout(() => setStep(2), 500);
        return () => clearTimeout(timer);
      }
    }

    if (step === 2) {
      if (logLines.length < processingLogs.length) {
        const timeout = setTimeout(() => {
          setLogLines(prev => [...prev, processingLogs[prev.length]]);
        }, 800);
        return () => clearTimeout(timeout);
      } else {
        const timer = setTimeout(() => setStep(3), 800);
        return () => clearTimeout(timer);
      }
    }

  }, [isVisible, step, typedText, logLines, targetText, processingLogs]);


  return (
    <section ref={sectionRef} id="showcase" className="py-32 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono mb-4 border border-indigo-500/20">
            <Cpu size={12} />
            <span>Core Architecture</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {t.productShowcase.title}
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {t.productShowcase.subtitle}
          </p>
        </div>

        {/* The Terminal Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl bg-[#0d0d0d] border border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/5 transform transition-transform hover:scale-[1.01] duration-700">
            
            {/* Terminal Title Bar */}
            <div className="bg-[#1a1a1a] border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <div className="text-xs text-zinc-500 font-mono opacity-50 flex items-center gap-2">
                <Terminal size={10} />
                wakeel_agent — v2.4
              </div>
              <div className="w-12"></div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-8 font-mono text-sm md:text-base h-[550px] flex flex-col relative bg-black/95">
                
                {/* User Input Line */}
                <div className="mb-6 opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-zinc-500 mb-2 text-xs uppercase tracking-wider">
                         {t.productShowcase.simulation.input_label}
                    </div>
                    <div className="flex items-start gap-2">
                         <span className="text-emerald-500 font-bold">$</span>
                         <div className="text-zinc-100 break-all">
                             {typedText}
                             {step === 1 && <span className="animate-pulse inline-block w-2 h-4 bg-zinc-500 ml-1 align-middle"></span>}
                         </div>
                    </div>
                </div>

                {/* Processing Logs */}
                <div className="flex-grow space-y-3 mb-8 overflow-hidden">
                    {logLines.map((log, i) => (
                        <div key={i} className="flex items-center gap-3 text-zinc-400 text-xs md:text-sm animate-fade-in-up">
                            <span className="text-blue-500">ℹ</span>
                            <span className="font-light">{log}</span>
                            {i === logLines.length - 1 && step === 2 && <Loader2 size={12} className="animate-spin ml-2 text-zinc-600" />}
                        </div>
                    ))}
                </div>

                {/* Final Output Card */}
                {step === 3 && (
                     <div className="animate-fade-in-up absolute bottom-8 left-6 right-6 md:left-8 md:right-8">
                         <div className="flex items-center gap-2 text-zinc-500 mb-3 text-xs uppercase tracking-wider">
                            <Cpu size={14} />
                            {t.productShowcase.simulation.output_label}
                         </div>
                         
                         <div className="bg-[#111] border border-zinc-800 rounded-lg p-6 shadow-xl relative overflow-hidden group">
                             <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                             
                             <div className="flex items-center justify-between mb-6">
                                <span className="text-emerald-400 text-sm font-bold flex items-center gap-2">
                                    <Check size={14} />
                                    {t.productShowcase.simulation.output_json.status}
                                </span>
                                <span className="text-zinc-600 text-xs font-mono">{t.productShowcase.simulation.output_json.latency}</span>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                     <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Total Revenue</div>
                                     <div className="text-white text-xl font-bold font-sans tracking-tight">{t.productShowcase.simulation.output_json.data.revenue}</div>
                                 </div>
                                 <div>
                                     <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Net Profit</div>
                                     <div className="text-white text-xl font-bold font-sans tracking-tight">{t.productShowcase.simulation.output_json.data.net_profit}</div>
                                 </div>
                                 <div className="md:col-span-2">
                                     <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Key Insight</div>
                                     <div className="text-zinc-300 leading-snug font-sans">{t.productShowcase.simulation.output_json.data.key_driver}</div>
                                 </div>
                             </div>

                             <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center gap-3 text-xs text-zinc-400">
                                 <FileCheck size={14} className="text-blue-500" />
                                 <span className="font-mono">{t.productShowcase.simulation.output_json.data.action}</span>
                             </div>
                         </div>
                     </div>
                )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;
