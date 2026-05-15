'use client';

import SEO from '../components/SEO';
import ToolCore from '../components/ToolCore';
import AdSlot from '../components/AdSlot';
import { useLocale } from '../hooks/useLocale';

export default function Home() {
  const { t } = useLocale();

  return (
    <>
      <SEO />
      
      {/* Hero */}
      <section className="relative pt-20 pb-24 bg-gradient-to-b from-slate-950 to-slate-900 text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm mb-6">
            香港人正在使用 · 2026 最新
          </div>
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter mb-6">
            {t('heroTitle')}
          </h1>
          <p className="max-w-2xl mx-auto text-2xl text-slate-300 mb-10">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tool" className="px-10 py-4 bg-white text-slate-950 font-semibold rounded-2xl text-lg hover:bg-emerald-50 transition">
              立即開始計算
            </a>
            <a href="/about" className="px-10 py-4 border border-white/30 hover:bg-white/10 rounded-2xl text-lg transition">
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section id="tool" className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
          <ToolCore />
        </div>
      </section>

      <AdSlot label="推薦廣告" />

      {/* Educational Content for SEO & AdSense */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="text-emerald-600 font-semibold tracking-[3px] text-sm">教育資源</div>
          <h2 className="text-5xl font-semibold tracking-tight mt-3">香港人如何更快清債？</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl border">
            <h3 className="text-2xl font-semibold mb-4">雪球法 vs 雪崩法：哪個更好？</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              雪球法選擇由最小餘額的債務開始還清，建立信心。雪崩法則先攻最高利率債務，省最多利息。
              根據研究，大部分人在雪崩法上可以省 15-30% 利息。
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl border">
            <h3 className="text-2xl font-semibold mb-4">香港信用卡平均利率 24% 以上</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              如果你有 HK$80,000 信用卡債，每月只還最低金額，可能需要 8 年才能清零！
              使用我們的計算器，每月多還 HK$3,000 可以縮短至 3 年內清零。
            </p>
          </div>
        </div>
      </section>

      <AdSlot label="内容廣告" />

      {/* FAQ for SEO */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-semibold text-center mb-12">常見問題</h2>
        <div className="space-y-4">
          {[
            { q: '雪球法同雪崩法哪個更好？', a: '雪崩法通常省更多利息，但雪球法更容易堅持。建議一開始用雪崩法。' },
            { q: '月入幾多才可以用這計算器？', a: '無論你有多少債務，只要有正常收入就可以使用。我們推薦每月多還最少 10% 的債務。' },
            { q: '計算結果準確嗎？', a: '正常情況下非常準確。但實際還款可能受到收入變化、額外開支影響。' }
          ].map((faq, i) => (
            <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
              <div className="font-semibold text-xl mb-3">{faq.q}</div>
              <div className="text-slate-600 dark:text-slate-400">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}