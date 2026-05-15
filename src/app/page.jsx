'use client';

import SEO from '../components/SEO';
import ToolCore from '../components/ToolCore';
import AdSlot from '../components/AdSlot';
import { useLocale } from '../hooks/useLocale';
import { motion } from 'framer-motion';

export default function Home() {
  const { t, locale, changeLocale } = useLocale();

  return (
    <>
      <SEO />
      
      {/* Header */}
      <header className="bg-[#0a0f1a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-[#0a0f1a] text-2xl font-bold">DZ</span>
              </div>
              <div>
                <div className="font-semibold text-xl text-white">DebtZero Pro</div>
                <div className="text-[10px] text-emerald-400 -mt-1">HONG KONG · 2026</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#111827] rounded-full p-1 text-sm">
              <button 
                onClick={() => changeLocale('zh')}
                className={`px-4 py-1 rounded-full transition ${locale === 'zh' ? 'bg-white text-black' : 'text-white'}`}
              >
                ZH
              </button>
              <button 
                onClick={() => changeLocale('en')}
                className={`px-4 py-1 rounded-full transition ${locale === 'en' ? 'bg-white text-black' : 'text-white'}`}
              >
                EN
              </button>
            </div>

            <button className="px-6 py-2 bg-white text-black font-semibold rounded-2xl text-sm hover:bg-emerald-400 hover:text-black transition">
              立即開始
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Exact Match */}
      <section className="bg-[#0a0f1a] text-white pt-12 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-900/50 text-emerald-400 text-xs font-medium rounded-full mb-6">
              香港 10,000+ 人正在使用 · 2026 最新
            </div>

            <h1 className="text-6xl font-semibold tracking-tight leading-none mb-4">
              香港最強債務清零計算器<br />
              <span className="text-emerald-400">清零債務</span>
            </h1>

            <p className="text-2xl text-slate-300 mb-8">
              雪球法 vs 雪崩法 · 即時比較 · 省最多利息
            </p>

            <div className="flex items-center gap-4 mb-12">
              <a href="#tool" className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl text-lg transition flex items-center gap-2">
                立即開始計算
              </a>
              <a href="/about" className="px-8 py-4 border border-white/30 hover:bg-white/5 rounded-2xl text-lg transition">
                了解更多
              </a>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="text-emerald-400">10,482</div>
                <div className="text-slate-400">位香港人已清零</div>
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
      <section id="tool" className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-[#111827] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-10 md:p-14">
            <ToolCore />
          </div>
        </div>
      </section>

      <AdSlot label="推薦廣告" />

      {/* Educational Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-semibold mb-6">為什麼選擇 DebtZero Pro？</h2>
          <div className="text-xl text-slate-300 space-y-4">
            <p>我們專為香港人設計，結合雪球法與雪崩法，幫助你最快最慳錢地清零債務。</p>
            <p>所有計算即時完成，數據永不離開你的裝置。</p>
          </div>
        </div>
      </section>
    </>
  );
}