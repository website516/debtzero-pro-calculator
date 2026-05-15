'use client';

import SEO from '../components/SEO';
import ToolCore from '../components/ToolCore';
import AdSlot from '../components/AdSlot';
import { useLocale } from '../hooks/useLocale';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useLocale();

  return (
    <>
      <SEO />
      
      {/* Premium Hero */}
      <section className="relative pt-24 pb-20 bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_0.8px,transparent_1px)] bg-[length:4px_4px] opacity-40"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-emerald-900/30 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/30">
              香港 10,000+ 人正在使用 · 2026 最新
            </div>

            <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter text-white mb-6 leading-none">
              {t('heroTitle')}<br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">清零債務</span>
            </h1>

            <p className="max-w-2xl text-2xl text-slate-300 mb-10">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#tool" 
                 className="px-14 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl text-lg transition shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3">
                立即開始計算
              </a>
              <a href="/about" 
                 className="px-10 py-4 border border-white/20 hover:bg-white/5 text-white font-medium rounded-2xl text-lg transition">
                了解更多
              </a>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-slate-400">10,482 位香港人已清零</span>
              </div>
              <div className="text-slate-400">|</div>
              <div>平均 <span className="font-semibold text-emerald-400">14.3 個月</span> 清零</div>
              <div className="text-slate-400">|</div>
              <div>節省利息 <span className="font-semibold text-emerald-400">HK$38,700</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section id="tool" className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="glass rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <div className="p-8 md:p-14">
            <ToolCore />
          </div>
        </div>
      </section>

      <AdSlot label="推薦廣告" />

      {/* Educational Content */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <div className="text-emerald-500 font-semibold tracking-[4px] text-sm mb-3">香港人的債務現況</div>
          <h2 className="text-5xl font-semibold tracking-tight text-white">2026 年，你的債務清況如何？</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -8 }}
            className="card-premium glass rounded-3xl p-10 border border-white/10"
          >
            <div className="text-emerald-400 text-sm font-semibold mb-4">AVERAGE CREDIT CARD APR</div>
            <div className="text-6xl font-semibold text-white mb-3">24.8%</div>
            <p className="text-slate-400">香港信用卡平均年利率高達 24.8%，比全球平均高出近一倍。</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="card-premium glass rounded-3xl p-10 border border-white/10"
          >
            <div className="text-emerald-400 text-sm font-semibold mb-4">AVERAGE DEBT</div>
            <div className="text-6xl font-semibold text-white mb-3">HK$87,400</div>
            <p className="text-slate-400">香港 25-40 歲年輕人平均財卡債務達 HK$87,400。</p>
          </motion.div>
        </div>
      </section>

      <AdSlot label="内容廣告" />

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-semibold text-center mb-12 text-white">常見問題</h2>
        <div className="space-y-4">
          {[
            { q: '雪球法同雪崩法哪個更好？', a: '雪崩法通常可以省更多利息，但雪球法更容易堅持。建議大多數人一開始用雪崩法。' },
            { q: '我月入幾多才可以用呢個計算器？', a: '無論你有多少債務，只要有正常收入就可以使用。我們推薦每月多還最少債務的10%。' }
          ].map((faq, i) => (
            <div key={i} className="glass rounded-2xl p-8 border border-white/10">
              <div className="font-semibold text-xl mb-4 text-white">{faq.q}</div>
              <div className="text-slate-400 leading-relaxed">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}