'use client';

import Link from 'next/link';
import { useLocale } from '../hooks/useLocale';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Globe } from 'lucide-react';

export default function Header() {
  const { locale, changeLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-11 h-11 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-emerald-500/30">DZ</div>
          <div>
            <div className="font-semibold text-2xl tracking-tighter">DebtZero Pro</div>
            <div className="text-[10px] text-emerald-400 -mt-1 font-medium">HONG KONG · 2026</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
          <Link href="/about" className="hover:text-emerald-400 transition-colors">{t('about')}</Link>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors">{t('contact')}</Link>
          <Link href="/privacy" className="hover:text-emerald-400 transition-colors">{t('privacy')}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => changeLocale(locale === 'zh' ? 'en' : 'zh')} 
            className="p-2.5 rounded-xl hover:bg-white/10 transition flex items-center gap-1.5 text-sm"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden md:inline">{locale.toUpperCase()}</span>
          </button>
          
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-xl hover:bg-white/10 transition"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link 
            href="/contact" 
            className="px-8 py-2.5 bg-white text-slate-950 font-semibold rounded-2xl text-sm hover:bg-emerald-50 transition flex items-center gap-2 shadow-lg"
          >
            立即開始
          </Link>
        </div>
      </div>
    </header>
  );
}