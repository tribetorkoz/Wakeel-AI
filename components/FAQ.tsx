
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../App';

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-24 bg-zinc-900/30 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 md:mb-12">{t.faq.title}</h2>
        
        <div className="space-y-3 md:space-y-4">
          {t.faq.items.map((item: any, index: number) => (
            <div 
              key={index} 
              className={`bg-zinc-900 border ${openIndex === index ? 'border-indigo-500/30' : 'border-white/5'} rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-start focus:outline-none"
              >
                <span className={`font-semibold text-sm md:text-base pr-4 md:pr-0 ${openIndex === index ? 'text-white' : 'text-zinc-400'}`}>
                  {item.q}
                </span>
                <span className={`p-1.5 md:p-2 rounded-full flex-shrink-0 ${openIndex === index ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-zinc-500'}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-5 md:p-6 pt-0 text-sm md:text-base text-zinc-400 leading-relaxed border-t border-white/5 mt-2">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
