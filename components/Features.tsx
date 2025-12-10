
import React from 'react';
import { MessageSquare, FileText, PenTool, Lock, Bot, ArrowRight } from 'lucide-react';
import { useLanguage } from '../App';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc, className }) => (
  <div className={`bg-black border border-white/10 p-10 rounded-2xl hover:border-white/20 transition-all duration-500 group ${className}`}>
    <div className="w-12 h-12 flex items-center justify-center mb-8 text-white border border-white/10 rounded-lg group-hover:bg-white group-hover:text-black transition-colors duration-500">
      {icon}
    </div>
    <h3 className="text-xl font-medium text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-zinc-500 leading-relaxed text-sm font-light">{desc}</p>
  </div>
);

const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-32 bg-black border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-24 md:flex md:items-end md:justify-between border-b border-white/5 pb-12">
          <div className="max-w-2xl">
              <span className="text-white font-mono text-xs tracking-widest uppercase mb-6 block border-l border-white pl-4">
                {t.features.badge}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                {t.features.title}
              </h2>
          </div>
          <p className="text-zinc-500 text-lg md:text-xl max-w-sm mt-6 md:mt-0 font-light leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        {/* Monochrome Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Support - Large */}
          <div className="md:col-span-2 bg-zinc-900/20 border border-white/10 p-10 rounded-2xl hover:border-white/20 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                <MessageSquare size={200} />
             </div>
             <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                    <div className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center mb-8 text-white">
                        <MessageSquare size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">{t.features.cards.support.title}</h3>
                    <p className="text-zinc-500 max-w-md font-light">{t.features.cards.support.desc}</p>
                </div>
                
                <div className="flex gap-8 mt-12 pt-8 border-t border-white/5">
                    <div>
                        <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2">{t.features.cards.support.stat1}</div>
                        <div className="text-white font-mono text-xl">{'<'}120ms</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-2">{t.features.cards.support.stat2}</div>
                        <div className="text-white font-mono text-xl">99.9%</div>
                    </div>
                </div>
             </div>
          </div>

          {/* Docs - Tall */}
          <div className="md:row-span-2 bg-zinc-900/20 border border-white/10 p-10 rounded-2xl hover:border-white/20 transition-all flex flex-col">
              <div className="w-12 h-12 border border-white/10 rounded-lg flex items-center justify-center mb-8 text-white">
                <FileText size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-white mb-4 tracking-tight">{t.features.cards.docs.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-light">{t.features.cards.docs.desc}</p>
              
              <div className="mt-auto space-y-3">
                 <div className="h-[1px] w-full bg-white/10"></div>
                 <div className="h-[1px] w-full bg-white/10"></div>
                 <div className="h-[1px] w-full bg-white/10"></div>
                 <div className="h-[1px] w-full bg-white/10"></div>
              </div>
          </div>

          {/* Content - Standard */}
          <FeatureCard 
            icon={<PenTool size={20} strokeWidth={1.5} />}
            title={t.features.cards.content.title}
            desc={t.features.cards.content.desc}
          />

          {/* Security - Standard */}
          <FeatureCard 
             icon={<Lock size={20} strokeWidth={1.5} />}
             title={t.features.cards.security.title}
             desc={t.features.cards.security.desc}
          />

          {/* Agent Callout - Wide */}
          <div className="md:col-span-3 bg-white text-black p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="flex items-start gap-8">
                    <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center shrink-0">
                       <Bot size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2 tracking-tight">{t.features.cards.agent.title}</h3>
                        <p className="text-zinc-600 max-w-xl font-light">{t.features.cards.agent.desc}</p>
                    </div>
                </div>
                <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-zinc-800 transition-colors flex items-center gap-2 whitespace-nowrap">
                    {t.features.cards.agent.cta}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
