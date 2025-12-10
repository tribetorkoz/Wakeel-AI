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
  <div className={`relative rounded-2xl p-8 flex flex-col h-full border ${recommended ? 'bg-zinc-900/80 border-indigo-500/50 shadow-2xl shadow-indigo-500/10' : 'bg-transparent border-white/10'}`}>
    {recommended && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border border-indigo-500">
        Best Value
      </div>
    )}
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-zinc-500 mb-6 h-10">{description}</p>
    
    <div className="flex items-baseline mb-8" dir="ltr">
      <span className="text-4xl font-bold text-white tracking-tight">{price}</span>
      {price !== 'Custom' && price !== 'مخصص' && <span className="ml-1 text-sm text-zinc-500">/month</span>}
    </div>
    
    <button className={`w-full py-3 rounded-lg text-sm font-semibold mb-8 transition-all ${recommended ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-900/20' : 'bg-white text-zinc-950 hover:bg-zinc-200'}`}>
      {buttonText}
    </button>

    <div className="space-y-4 flex-grow">
      <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Features</div>
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 list-none">
          <Check size={16} className={`mt-0.5 flex-shrink-0 ${recommended ? 'text-indigo-400' : 'text-zinc-500'}`} />
          <span className="text-sm text-zinc-300 leading-tight">{feature}</span>
        </li>
      ))}
    </div>
  </div>
);

const Pricing: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-24 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.pricing.title}</h2>
          <p className="text-zinc-400 text-lg">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-zinc-500">
           {t.pricing.guarantee.map((item: string, i: number) => (
             <div key={i} className="flex items-center gap-2">
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