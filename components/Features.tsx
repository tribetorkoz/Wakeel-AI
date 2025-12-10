
import React from 'react';
import { MessageSquare, FileText, PenTool, Bot, ArrowRight, Zap, Globe, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../App';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
  stat?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc, className, stat }) => (
  <div className={`bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/60 hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full ${className}`}>
    <div className="w-12 h-12 flex items-center justify-center mb-6 text-zinc-400 border border-white/10 rounded-xl group-hover:bg-white group-hover:text-black transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{title}</h3>
    <p className="text-zinc-400 leading-relaxed text-sm flex-grow">{desc}</p>
    {stat && (
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Zap size={12} className="text-yellow-500" />
            <span>{stat}</span>
        </div>
    )}
  </div>
);

const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-20 md:flex md:items-end md:justify-between pb-12 border-b border-white/5">
          <div className="max-w-2xl">
              <span className="text-indigo-500 font-mono text-xs tracking-widest uppercase mb-6 block">
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

        {/* True Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Primary Feature: Support */}
          <div className="md:col-span-2 bg-zinc-900/20 border border-white/5 p-8 md:p-10 rounded-3xl hover:border-white/10 transition-all group relative overflow-hidden flex flex-col justify-between">
             <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity pointer-events-none">
                <MessageSquare size={200} />
             </div>
             
             <div>
                <div className="w-12 h-12 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-zinc-300 bg-zinc-900">
                    <MessageSquare size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{t.features.cards.support.title}</h3>
                <p className="text-zinc-400 max-w-md">{t.features.cards.support.desc}</p>
             </div>
             
             <div className="flex gap-12 mt-12 pt-8 border-t border-white/5">
                <div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest mb-2">
                         <Zap size={10} className="text-yellow-500" />
                         {t.features.cards.support.stat1}
                    </div>
                    <div className="text-white font-mono text-2xl font-bold">{'<'}120ms</div>
                </div>
                <div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest mb-2">
                         <Globe size={10} className="text-blue-500" />
                         {t.features.cards.support.stat2}
                    </div>
                    <div className="text-white font-mono text-2xl font-bold">99.9%</div>
                </div>
             </div>
          </div>

          {/* Secondary Feature: Docs */}
          <div className="md:col-span-1 bg-zinc-900/20 border border-white/5 p-8 md:p-10 rounded-3xl hover:border-white/10 transition-all flex flex-col">
              <div className="w-12 h-12 border border-white/10 rounded-xl flex items-center justify-center mb-8 text-zinc-300 bg-zinc-900">
                <FileText size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{t.features.cards.docs.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">{t.features.cards.docs.desc}</p>
              
              <div className="mt-auto space-y-3 p-4 bg-zinc-900/50 rounded-xl border border-white/5">
                 <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                    <span>Scan Status</span>
                    <span className="text-emerald-500">Active</span>
                 </div>
                 <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-3/4 animate-pulse"></div>
                 </div>
              </div>
          </div>

          {/* Feature: Marketing */}
          <FeatureCard 
            icon={<PenTool size={20} strokeWidth={1.5} />}
            title={t.features.cards.content.title}
            desc={t.features.cards.content.desc}
            stat="SEO Optimized"
          />

          {/* Feature: Security */}
          <FeatureCard 
             icon={<ShieldCheck size={20} strokeWidth={1.5} />}
             title={t.features.cards.security.title}
             desc={t.features.cards.security.desc}
             stat="AES-256 Encryption"
          />

          {/* Callout Card */}
          <div className="md:col-span-1 bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 rounded-2xl flex flex-col justify-center items-center text-center group">
               <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center mb-4 shadow-lg shadow-white/10">
                   <Bot size={28} strokeWidth={1.5} />
               </div>
               <h3 className="text-lg font-bold text-white mb-2">{t.features.cards.agent.title}</h3>
               <p className="text-zinc-500 text-sm mb-6">{t.features.cards.agent.desc}</p>
               <button className="text-white text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                   {t.features.cards.agent.cta} <ArrowRight size={16} />
               </button>
          </div>

        </div>

        {/* Bottom CTA for Scrollers */}
        <div className="mt-24 p-12 rounded-3xl bg-white text-black text-center flex flex-col items-center">
             <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{t.features.cta_banner.title}</h3>
             <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-6 px-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
             >
                {t.features.cta_banner.btn} <ArrowRight size={20} />
             </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
