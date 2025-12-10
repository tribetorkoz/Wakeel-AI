
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, FileText, Check, Cpu, ArrowRight, Loader2 } from 'lucide-react';
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

    // Reset simulation if it becomes visible again (optional loop)
    if (step === 3) {
        const timer = setTimeout(() => {
            setStep(0);
            setTypedText('');
            setLogLines([]);
        }, 8000);
        return () => clearTimeout(timer);
    }

    if (step === 0) {
      // Start typing after a delay
      const timer = setTimeout(() => setStep(1), 1000);
      return () => clearTimeout(timer);
    }

    if (step === 1) {
      if (typedText.length < targetText.length) {
        const timeout = setTimeout(() => {
          setTypedText(targetText.slice(0, typedText.length + 1));
        }, 30); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        // Typing done, start processing
        const timer = setTimeout(() => setStep(2), 500);
        return () => clearTimeout(timer);
      }
    }

    if (step === 2) {
      if (logLines.length < processingLogs.length) {
        const timeout = setTimeout(() => {
          setLogLines(prev => [...prev, processingLogs[prev.length]]);
        }, 600); // Log speed
        return () => clearTimeout(timeout);
      } else {
        // Processing done, show output
        const timer = setTimeout(() => setStep(3), 800);
        return () => clearTimeout(timer);
      }
    }

  }, [isVisible, step, typedText, logLines, targetText, processingLogs]);


  return (
    <section ref={sectionRef} id="showcase" className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono mb-4 border border-indigo-500/20">
            <Cpu size={12} />
            <span>v2.4.0 Stable</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {t.productShowcase.title}
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {t.productShowcase.subtitle}
          </p>
        </div>

        {/* The Interface Container */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-black border border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/5">
            
            {/* Window Bar */}
            <div className="bg-zinc-900/50 border-b border-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <div className="text-xs text-zinc-500 font-mono">agent_executor — zsh — 80x24</div>
              <div className="w-8"></div>
            </div>

            <div className="p-6 md:p-8 font-mono text-sm md:text-base h-[500px] flex flex-col relative bg-black/80 backdrop-blur-sm">
                
                {/* User Input Section */}
                <div className="mb-8 opacity-100 transition-opacity">
                    <div className="flex items-center gap-3 text-emerald-500 mb-2 font-bold text-xs uppercase tracking-widest">
                        <Terminal size={14} />
                        {t.productShowcase.simulation.input_label}
                    </div>
                    <div className="flex items-start gap-3 bg-zinc-900/30 p-4 rounded-lg border border-white/5">
                         <div className="mt-1">
                             <FileText size={18} className="text-zinc-400" />
                         </div>
                         <div className="text-zinc-200">
                             {typedText}
                             {step === 1 && <span className="animate-pulse inline-block w-2 h-4 bg-indigo-500 ml-1 align-middle"></span>}
                         </div>
                    </div>
                </div>

                {/* Processing Logs */}
                <div className="flex-grow space-y-2 mb-8 overflow-hidden">
                    {logLines.map((log, i) => (
                        <div key={i} className="flex items-center gap-2 text-zinc-500 text-xs animate-fade-in-up">
                            <span className="text-indigo-500">➜</span>
                            <span>{log}</span>
                            {i === logLines.length - 1 && step === 2 && <Loader2 size={10} className="animate-spin ml-2" />}
                        </div>
                    ))}
                </div>

                {/* Agent Output - The Reveal */}
                {step === 3 && (
                     <div className="animate-fade-in-up absolute bottom-8 left-8 right-8">
                         <div className="flex items-center gap-2 text-indigo-400 mb-2 font-bold text-xs uppercase tracking-widest">
                            <Cpu size={14} />
                            {t.productShowcase.simulation.output_label}
                         </div>
                         
                         <div className="bg-zinc-900 border border-indigo-500/30 rounded-lg p-5 shadow-[0_0_30px_rgba(99,102,241,0.1)] relative overflow-hidden group">
                             <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                             
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                     <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Total Revenue</div>
                                     <div className="text-white text-xl font-bold">{t.productShowcase.simulation.output_json.data.revenue}</div>
                                 </div>
                                 <div>
                                     <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Net Profit</div>
                                     <div className="text-white text-xl font-bold">{t.productShowcase.simulation.output_json.data.net_profit}</div>
                                 </div>
                                 <div className="md:col-span-2">
                                     <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Key Insight</div>
                                     <div className="text-zinc-300 leading-snug">{t.productShowcase.simulation.output_json.data.key_driver}</div>
                                 </div>
                             </div>

                             <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                                 <div className="flex items-center gap-2 text-emerald-500">
                                     <Check size={12} />
                                     {t.productShowcase.simulation.output_json.data.action}
                                 </div>
                                 <div className="text-zinc-600 font-mono">{t.productShowcase.simulation.output_json.latency}</div>
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
