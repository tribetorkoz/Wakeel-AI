
import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../App';

const PricingCard: React.FC<{
  title: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  buttonText: string;
}> = ({ title, price, description, features, recommended, buttonText }) => (
  <div className={`relative rounded-2xl p-8 flex flex-col h-full border transition-transform duration-300 hover:-translate-y-2 ${recommended ? 'bg-zinc-900/90 border-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10' : 'bg-black/50 border-white/10'}`}>
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-indigo-400 shadow-lg">
        Most Popular
      </div>
    )}
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-zinc-400 mb-6 h-10 leading-relaxed">{description}</p>
    
    <div className="flex items-baseline mb-8" dir="ltr">
      <span className="text-4xl font-black text-white tracking-tight">{price}</span>
      {price !== 'Custom' && price !== 'مخصص' && <span className="ml-1 text-sm text-zinc-500 font-medium">/month</span>}
    </div>
    
    <button className={`w-full py-4 rounded-xl text-sm font-bold mb-8 transition-all shadow-lg ${recommended ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900/30' : 'bg-white text-zinc-950 hover:bg-zinc-200 hover:shadow-white/10'}`}>
      {buttonText}
    </button>

    <div className="space-y-4 flex-grow">
      <div className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-4">Included Features</div>
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 list-none">
          <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${recommended ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-500'}`}>
             <Check size={12} strokeWidth={3} />
          </div>
          <span className="text-sm text-zinc-300 leading-tight font-medium">{feature}</span>
        </li>
      ))}
    </div>
  </div>
);

const Pricing: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-32 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">{t.pricing.title}</h2>
          <p className="text-zinc-400 text-xl leading-relaxed">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          <PricingCard 
            title={t.pricing.starter.title}
            price={t.pricing.starter.price}
            description={t.pricing.starter.desc}
            buttonText={t.pricing.starter.cta}
            features={t.pricing.starter.features}
          />
          <PricingCard 
            title={t.pricing.growth.title}
            price={t.pricing.growth.price}
            recommended={true}
            description={t.pricing.growth.desc}
            buttonText={t.pricing.growth.cta}
            features={t.pricing.growth.features}
          />
          <PricingCard 
            title={t.pricing.enterprise.title}
            price={t.pricing.enterprise.price}
            description={t.pricing.enterprise.desc}
            buttonText={t.pricing.enterprise.cta}
            features={t.pricing.enterprise.features}
          />
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-zinc-500 font-medium">
           {t.pricing.guarantee.map((item: string, i: number) => (
             <div key={i} className="flex items-center gap-2 bg-zinc-900/50 px-4 py-2 rounded-full border border-white/5">
                <Check size={16} className="text-emerald-500" />
                <span>{item}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
