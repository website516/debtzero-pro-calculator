'use client';

import Link from 'next/link';
import { useLocale } from '../hooks/useLocale';

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold">DZ</div>
            <span className="font-semibold text-white text-xl">DebtZero Pro</span>
          </div>
          <p className="text-sm">香港人專用債務清零工具</p>
        </div>

        <div>
          <div className="font-semibold text-white mb-4">資源</div>
          <div className="space-y-2 text-sm">
            <Link href="/about" className="block hover:text-white transition">關於我們</Link>
            <Link href="/disclaimer" className="block hover:text-white transition">免責聲明</Link>
          </div>
        </div>

        <div>
          <div className="font-semibold text-white mb-4">法律</div>
          <div className="space-y-2 text-sm">
            <Link href="/privacy" className="block hover:text-white transition">隱私政策</Link>
            <Link href="/terms" className="block hover:text-white transition">服務條款</Link>
            <Link href="/contact" className="block hover:text-white transition">聯絡我們</Link>
          </div>
        </div>

        <div>
          <a href="https://your-promo-link.com" target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 font-semibold rounded-3xl hover:scale-105 active:scale-95 transition text-sm">
            {t('growthButton')}
          </a>
          <p className="mt-4 text-xs">© 2026 DebtZero Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}