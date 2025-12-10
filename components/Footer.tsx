
import React from 'react';
import { Bot, Twitter, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../App';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-12 pb-8 md:pt-16 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <Bot size={24} className="text-white" />
              <span className="text-lg font-bold text-white">Wakeel AI</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors p-2 -ml-2"><Twitter size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors p-2"><Github size={20} /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors p-2"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-0 col-span-1 md:col-span-3 lg:col-span-3 lg:flex lg:justify-between">
            <div className="lg:w-1/4">
                <h4 className="font-semibold text-white mb-4 md:mb-6 text-sm uppercase tracking-wider">{t.footer.sections.product}</h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">Features</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">Integrations</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">API Docs</a></li>
                </ul>
            </div>

            <div className="lg:w-1/4">
                <h4 className="font-semibold text-white mb-4 md:mb-6 text-sm uppercase tracking-wider">{t.footer.sections.company}</h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">About</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">Contact</a></li>
                </ul>
            </div>

            <div className="lg:w-1/4">
                <h4 className="font-semibold text-white mb-4 md:mb-6 text-sm uppercase tracking-wider">{t.footer.sections.legal}</h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors block py-1">Security</a></li>
                </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 text-center md:text-start">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            <span>{t.footer.made}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
