
import React, { useState } from 'react';
import { Sparkles, Copy, Loader2, Terminal, Type } from 'lucide-react';
import { generateMarketingContent } from '../services/geminiService';
import { useLanguage } from '../App';

const Demo: React.FC = () => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'post' | 'desc' | 'ad'>('post');
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isRtl = lang === 'ar';

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setResult('');
    
    try {
      const content = await generateMarketingContent(topic, activeTab);
      setResult(content);
    } catch (err) {
      console.error(err);
      setResult("System Error: Unable to connect to neural engine. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 bg-black relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-mono mb-4 border border-indigo-500/20">
            <Terminal size={12} />
            <span>{t.demo.badge}</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">{t.demo.title}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            {t.demo.subtitle}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl border border-white/10 overflow-hidden flex flex-col md:flex-row min-h-[550px] shadow-2xl">
          {/* Controls Panel */}
          <div className={`w-full md:w-1/3 bg-zinc-900 p-6 md:p-8 flex flex-col ${isRtl ? 'md:border-l' : 'md:border-r'} border-white/5`}>
            <div className="mb-8">
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">{t.demo.output_label}</label>
              <div className="space-y-2">
                {[
                  { id: 'post', label: t.demo.options.post, icon: <Terminal size={16}/> },
                  { id: 'desc', label: t.demo.options.desc, icon: <Type size={16}/> },
                  { id: 'ad', label: t.demo.options.ad, icon: <Sparkles size={16}/> }
                ].map((type) => (
                  <button 
                    key={type.id}
                    onClick={() => setActiveTab(type.id as any)}
                    className={`w-full flex items-center gap-3 text-start px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${activeTab === type.id ? 'bg-zinc-800 text-white border-white/10 shadow-sm' : 'bg-transparent text-zinc-400 border-transparent hover:bg-zinc-800/50'}`}
                  >
                    {type.icon}
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-grow">
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">{t.demo.input_label}</label>
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.demo.placeholder}
                className="w-full h-32 px-4 py-3 rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none mb-6 transition-all text-sm resize-none"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isLoading || !topic}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-bold text-sm transition-all ${isLoading || !topic ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]'}`}
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
              {isLoading ? t.demo.processing : t.demo.generate}
            </button>
          </div>

          {/* Result Panel */}
          <div className="w-full md:w-2/3 bg-zinc-950 p-6 md:p-8 relative flex flex-col">
             <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                {result && (
                  <button 
                   onClick={() => navigator.clipboard.writeText(result)}
                   className="text-xs flex items-center gap-2 text-zinc-500 hover:text-white transition-colors bg-zinc-900 border border-white/5 px-2 py-1 rounded"
                  >
                    <Copy size={12} /> {t.demo.copy}
                  </button>
                )}
             </div>

             <div className="flex-grow font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-y-auto text-start" dir="ltr">
                {result ? (
                  <div className="animate-fade-in space-y-4">
                    <p className="text-zinc-500 mb-2 border-b border-zinc-900 pb-2 select-none">// Output generated by Wakeel-v2 model</p>
                    {result}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-700 select-none">
                    <Terminal size={32} className="mb-4 opacity-50" />
                    <p>{t.demo.ready}</p>
                    <p className="text-xs mt-2">{t.demo.waiting}</p>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
