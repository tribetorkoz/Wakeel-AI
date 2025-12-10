import React from 'react';
import { Activity, Users, Clock } from 'lucide-react';
import { useLanguage } from '../App';

const DashboardPreview: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="dashboard" className="py-24 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold text-white mb-6 leading-tight whitespace-pre-line">
              {t.dashboard_preview.title}
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              {t.dashboard_preview.subtitle}
            </p>
            
            <div className="space-y-6">
              {[
                { title: t.dashboard_preview.features[0].title, desc: t.dashboard_preview.features[0].desc, icon: <Activity size={18} /> },
                { title: t.dashboard_preview.features[1].title, desc: t.dashboard_preview.features[1].desc, icon: <Users size={18} /> },
                { title: t.dashboard_preview.features[2].title, desc: t.dashboard_preview.features[2].desc, icon: <Clock size={18} /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-indigo-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
             {/* Abstract Metric Cards */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl">
                   <div className="flex justify-between items-start mb-8">
                      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                         <Activity size={20} />
                      </div>
                      <span className="text-xs text-zinc-500 font-mono" dir="ltr">+12.5%</span>
                   </div>
                   <div className="text-3xl font-semibold text-white mb-1" dir="ltr">24.5k</div>
                   <div className="text-sm text-zinc-500">{t.dashboard_preview.cards.processed}</div>
                </div>
                
                <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl">
                   <div className="flex justify-between items-start mb-8">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                         <Clock size={20} />
                      </div>
                      <span className="text-xs text-zinc-500 font-mono" dir="ltr">-40%</span>
                   </div>
                   <div className="text-3xl font-semibold text-white mb-1" dir="ltr">142h</div>
                   <div className="text-sm text-zinc-500">{t.dashboard_preview.cards.saved}</div>
                </div>

                <div className="col-span-2 bg-zinc-900 border border-white/10 p-6 rounded-2xl">
                   <div className="flex items-center justify-between mb-6">
                      <h4 className="text-sm font-medium text-white">{t.dashboard_preview.cards.activity}</h4>
                      <button className="text-xs text-indigo-400 hover:text-indigo-300">{t.dashboard_preview.cards.view_all}</button>
                   </div>
                   <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                         <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                               <span className="text-sm text-zinc-300">{t.dashboard_preview.cards.item}</span>
                            </div>
                            <span className="text-xs text-zinc-600 font-mono" dir="ltr">10:4{i} AM</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;