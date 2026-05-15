import Link from 'next/link';
import { useLocale } from '../hooks/useLocale';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Globe } from 'lucide-react';

export default function Header() {
  const { locale, changeLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">DZ</div>
          <div>
            <div className="font-semibold text-xl tracking-tight">DebtZero Pro</div>
            <div className="text-[10px] text-slate-500 -mt-1">香港 · 2026</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/about" className="hover:text-emerald-600 transition">{t('about')}</Link>
          <Link href="/contact" className="hover:text-emerald-600 transition">{t('contact')}</Link>
          <Link href="/privacy" className="hover:text-emerald-600 transition">{t('privacy')}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => changeLocale(locale === 'zh' ? 'en' : 'zh')} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <Globe className="w-5 h-5" />
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link href="/contact" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-2xl transition flex items-center gap-2">
            立即開始
          </Link>
        </div>
      </div>
    </header>
  );
}