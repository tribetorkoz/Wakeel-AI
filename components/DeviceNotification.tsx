
import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Monitor, Tablet, Wifi, Power } from 'lucide-react';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { useLanguage } from '../App';
import { logVisitorEntry } from '../services/waitlistService';

const DeviceNotification: React.FC = () => {
  const { deviceType, os, browser } = useDeviceDetect();
  const { lang } = useLanguage();
  const [show, setShow] = useState(false);
  const hasLogged = useRef(false); // Prevent double logging in React Strict Mode
  
  const isRtl = lang === 'ar';

  useEffect(() => {
    // 1. Show notification UI
    const timer = setTimeout(() => {
      setShow(true);
    }, 1500);
    
    // 2. Hide notification UI
    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 7500);

    // 3. Auto-Log to Database (Once per session load)
    // We wait slightly to ensure hook has populated values
    if (!hasLogged.current && os !== 'Unknown' && deviceType) {
        // Add a small delay so it doesn't block main thread rendering
        setTimeout(() => {
            logVisitorEntry({
                deviceType,
                os,
                browser
            });
        }, 2000);
        hasLogged.current = true;
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [deviceType, os, browser]);

  if (!show) return null;

  const getIcon = () => {
    switch (deviceType) {
      case 'Mobile': return <Smartphone size={20} className="text-emerald-400" />;
      case 'Tablet': return <Tablet size={20} className="text-emerald-400" />;
      default: return <Monitor size={20} className="text-emerald-400" />;
    }
  };

  const messages = {
    en: {
      title: "System Optimized",
      desc: `${deviceType} Uplink Established (${os})`,
      latency: "12ms latency"
    },
    ar: {
      title: "تم تهيئة النظام",
      desc: `تم الاتصال عبر ${deviceType === 'Mobile' ? 'الهاتف' : deviceType === 'Tablet' ? 'اللوحي' : 'الحاسوب'} (${os})`,
      latency: "استجابة ١٢ مللي ثانية"
    }
  };

  const text = isRtl ? messages.ar : messages.en;

  return (
    <div className={`fixed top-24 ${isRtl ? 'left-6' : 'right-6'} z-50 animate-fade-in-down`}>
      <div className="bg-zinc-900/90 backdrop-blur-md border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] rounded-lg p-4 flex items-start gap-4 max-w-sm group hover:border-emerald-500/50 transition-colors">
        
        <div className="relative">
             <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                {getIcon()}
             </div>
             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-zinc-900 rounded-full flex items-center justify-center">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
             <h4 className="text-sm font-bold text-white tracking-wide">{text.title}</h4>
             <Wifi size={12} className="text-zinc-500" />
          </div>
          <p className="text-xs text-zinc-400 font-mono mb-1">
            {text.desc}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-wider">
             <Power size={10} className="text-emerald-500" />
             <span>Secure Shell</span>
             <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
             <span>{text.latency}</span>
          </div>
        </div>
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
             <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent animate-[scan_2s_ease-in-out_infinite] opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default DeviceNotification;
