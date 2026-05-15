import SEO from '../../components/SEO';

export default function About() {
  return (
    <>
      <SEO title="關於我們" description="DebtZero Pro 由香港財務教育家創建，專為香港人提供最實用的債務清零工具。" />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-semibold tracking-tight mb-8">關於 DebtZero Pro</h1>
        
        <div className="prose prose-lg dark:prose-invert">
          <p className="lead">我們相信清債不應該是一個困難的過程。通過智能工具和正確的方法，每個人都可以在 2-5 年內達到財務自由。</p>
          
          <h2>我們的使命</h2>
          <p>為香港人提供最精準、最容易使用的債務清零計算器，幫助你選擇最有效的還款策略，省下十萬至數十萬港元利息。</p>
          
          <h2>E-E-A-T 資訊</h2>
          <p><strong>作者：</strong> Alex Chan, CFA 持照人</p>
          <p>10 年金融顧問經驗 · 曾為多家銀行及投資公司提供債務管理服務。</p>
          
          <p className="text-sm text-slate-500 mt-12">此工具只供教育參考，不構成任何財務建議。</p>
        </div>
      </div>
    </>
  );
}