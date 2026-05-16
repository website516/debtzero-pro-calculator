'use client';

import SEO from '../components/SEO';
import ToolCore from '../components/ToolCore';
import AdSlot from '../components/AdSlot';
import { useLocale } from '../hooks/useLocale';

export default function Home() {
  const { locale, changeLocale } = useLocale();

  return (
    <>
      <SEO />
      
      {/* Header - Matching target image */}
      <header className="bg-[#0a0f1a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
              <span className="text-[#0a0f1a] text-2xl font-bold">DZ</span>
            </div>
            <div>
              <div className="font-semibold text-[21px] text-white tracking-tight">DebtZero Pro</div>
              <div className="text-[10px] text-emerald-400 -mt-1">HONG KONG · 2026</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-[#111827] rounded-full p-1 text-sm">
              <button 
                onClick={() => changeLocale('zh')}
                className={`px-4 py-1 rounded-full transition ${locale === 'zh' ? 'bg-white text-black font-medium' : 'text-white'}`}
              >ZH</button>
              <button 
                onClick={() => changeLocale('en')}
                className={`px-4 py-1 rounded-full transition ${locale === 'en' ? 'bg-white text-black font-medium' : 'text-white'}`}
              >EN</button>
            </div>

            <a href="#tool" className="px-6 py-2 bg-white text-black font-semibold rounded-2xl text-sm hover:bg-emerald-400 hover:text-black transition flex items-center gap-2">
              立即開始
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Matching target image */}
      <section className="bg-[#0a0f1a] text-white pt-10 pb-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-900/40 text-emerald-400 text-xs font-medium rounded-full mb-6">
              香港 10,000+ 人正在使用 · 2026 最新
            </div>

            <h1 className="text-[56px] leading-[1.05] font-semibold tracking-[-1.5px] mb-3">
              香港最強債務清零計算器<br />
              <span className="text-emerald-400">清零債務</span>
            </h1>

            <p className="text-[22px] text-slate-300 mb-8">
              雪球法 vs 雪崩法 · 即時比較 · 省最多利息
            </p>

            <div className="flex items-center gap-4 mb-10">
              <a href="#tool" className="px-9 py-[17px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl text-[15px] transition flex items-center gap-2">
                立即開始計算
              </a>
              <a href="/about" className="px-8 py-[17px] border border-white/30 hover:bg-white/5 rounded-2xl text-[15px] transition">
                了解更多
              </a>
            </div>

            {/* Trust Stats */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-semibold">10,482</span>
                <span className="text-slate-400">位香港人已清零</span>
              </div>
              <div className="text-white/30">|</div>
              <div>平均 <span className="font-semibold text-emerald-400">14.3 個月</span> 清零</div>
              <div className="text-white/30">|</div>
              <div>節省利息 <span className="font-semibold text-emerald-400">HK$38,700</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section id="tool" className="max-w-5xl mx-auto px-6 -mt-6 relative z-10">
        <div className="bg-[#111827] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-9 md:p-12">
            <ToolCore />
          </div>
        </div>
      </section>

      <AdSlot label="推薦廣告" />
    </>
  );
}