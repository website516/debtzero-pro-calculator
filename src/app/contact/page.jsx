import SEO from '../../components/SEO';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('感謝你的消息！我們會在 24 小時內回覆。');
  };

  return (
    <>
      <SEO title="聯絡我們" />
      <div className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-semibold tracking-tight mb-4">聯絡我們</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">有任何問題或建議？我們很想聽到你的聲音。</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-2">姓名</label>
            <input type="text" required className="w-full px-6 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="陳大文" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">電郵</label>
            <input type="email" required className="w-full px-6 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">消息</label>
            <textarea required rows={6} className="w-full px-6 py-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" placeholder="我想提供一些建議..."></textarea>
          </div>
          <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl text-lg transition">
            發送消息
          </button>
        </form>

        <div className="mt-12 text-center text-sm text-slate-500">
          或直接電郵 support@debtzero.pro
        </div>
      </div>
    </>
  );
}