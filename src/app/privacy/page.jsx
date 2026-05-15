import SEO from '../../components/SEO';

export default function Privacy() {
  return (
    <>
      <SEO title="隱私政策" description="DebtZero Pro 隱私政策。我們如何保護你的債務資料。" />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-semibold tracking-tight mb-12">隱私政策</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>歡迎使用 DebtZero Pro。我們非常重視你的隱私。本網站所有計算都在你的瀏覽器中完成，任何債務資料都不會傳送到我們的伺服器。</p>
          
          <h2>Google AdSense 說明</h2>
          <p>本網站使用 Google AdSense 服務。Google 可能會使用 Cookie 來提供個性化廣告。你可以在 <a href="https://adssettings.google.com" target="_blank">Google Ad Settings</a> 管理你的廣告偏好設定。</p>
          
          <h2>我們收集的資料</h2>
          <p>我們不會收集任何個人識別資料。所有計算結果只存在你的瀏覽器 localStorage 中。</p>
          
          <h2>聯絡我們</h2>
          <p>如果你對本隱私政策有任何問題，請電郵 support@debtzero.pro</p>
        </div>
      </div>
    </>
  );
}