
import React from 'react';
import { useLanguage } from '../App';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">{t.testimonials.title}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.testimonials.items.map((item: any, index: number) => (
            <div key={index} className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl hover:border-white/10 transition-colors">
              <Quote className="text-indigo-500 mb-6 opacity-50" size={32} />
              <p className="text-zinc-300 text-lg leading-relaxed mb-8 font-light">"{item.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 border border-white/5">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{item.author}</div>
                  <div className="text-zinc-500 text-xs">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
