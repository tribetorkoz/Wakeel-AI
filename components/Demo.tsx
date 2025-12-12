
import React, { useState } from 'react';
import { Sparkles, Copy, Loader2, Terminal, Type, Wand2 } from 'lucide-react';
import { generateMarketingContent } from '../services/geminiService';
import { useLanguage } from '../App';

const Demo: React.FC = () => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'post' | 'desc' | 'ad'>('post');
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isRtl = lang === 'ar';

  const creativeIdeas = [
    "A cyberpunk-themed energy drink for coders",
    "Sustainable sneakers made from recycled ocean plastic",
    "AI-powered meditation app for busy executives",
    "A subscription service for rare coffee beans",
    "Smart home device that manages plant care"
  ];

  const handleInspire = () => {
    const randomIdea = creativeIdeas[Math.floor(Math.random() * creativeIdeas.length)];
    setTopic(randomIdea);
  };

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
    <section id="demo" className="py-24 bg-gradient-to-b from-black to-zinc-900/50 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono mb-4 border border-purple-500/20">
            <Wand2 size={12} />
            <span>{t.demo.badge}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t.demo.title}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            {t.demo.subtitle}
          </p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row min-h-[550px] shadow-2xl ring-1 ring-purple-500/10">
          {/* Controls Panel */}
          <div className={`w-full md:w-1/3 p-6 md:p-8 flex flex-col ${isRtl ? 'md:border-l' : 'md:border-r'} border-white/5`}>
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
                    className={`w-full flex items-center gap-3 text-start px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${activeTab === type.id ? 'bg-purple-600/10 text-purple-300 border-purple-500/30' : 'bg-zinc-900/50 text-zinc-400 border-transparent hover:bg-zinc-800'}`}
                  >
                    {type.icon}
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-center mb-4">
                 <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider">{t.demo.input_label}</label>
                 <button onClick={handleInspire} className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                    <Wand2 size={10} /> {t.demo.inspire}
                 </button>
              </div>
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.demo.placeholder}
                className="w-full h-32 px-4 py-3 rounded-xl bg-zinc-950/50 border border-white/10 text-white placeholder-zinc-600 focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none mb-6 transition-all text-sm resize-none"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={isLoading || !topic}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${isLoading || !topic ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:scale-[1.02]'}`}
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
              {isLoading ? t.demo.processing : t.demo.generate}
            </button>
          </div>

          {/* Result Panel */}
          <div className="w-full md:w-2/3 bg-[#09090b] p-6 md:p-8 relative flex flex-col">
             <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 opacity-50">
                   <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                   <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                   <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                </div>
                {result && (
                  <button 
                   onClick={() => navigator.clipboard.writeText(result)}
                   className="text-xs flex items-center gap-2 text-zinc-500 hover:text-white transition-colors bg-zinc-900 border border-white/5 px-3 py-1.5 rounded-lg hover:border-white/20"
                  >
                    <Copy size={12} /> {t.demo.copy}
                  </button>
                )}
             </div>

             <div className="flex-grow font-mono text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-y-auto text-start custom-scrollbar" dir="ltr">
                {result ? (
                  <div className="animate-fade-in space-y-4">
                    <p className="text-zinc-600 mb-4 select-none flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        Generated by Wakeel Creative Engine
                    </p>
                    <div className="pl-4 border-l-2 border-purple-500/20">
                        {result}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-700 select-none">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800">
                        <Sparkles size={24} className="opacity-20" />
                    </div>
                    <p>{t.demo.ready}</p>
                    <p className="text-xs mt-2 text-zinc-600">{t.demo.waiting}</p>
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
