import SEO from '../../components/SEO';

export default function Disclaimer() {
  return (
    <>
      <SEO title="免責聲明" />
      <div className="max-w-4xl mx-auto px-6 py-20 prose prose-slate dark:prose-invert">
        <h1>免責聲明</h1>
        <p className="text-xl">本網站提供的債務清零計算器及相關資訊僅供教育和參考用途。</p>
        
        <p>我們不是財務顧問、律師或任何認證機構。請在作出任何財務決定前咩諮合資格的財務顧問或專業人士。</p>
        
        <p className="font-semibold mt-8">使用本工具的風險由你自行承擔。</p>
      </div>
    </>
  );
}