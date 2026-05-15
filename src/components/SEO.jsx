import Head from 'next/head';

export default function SEO({ title, description, canonical, ogImage = '/og-image.jpg' }) {
  const fullTitle = title ? `${title} | DebtZero Pro` : 'DebtZero Pro | 香港最強債務清零計算器';
  const fullDesc = description || '免費雪球法 vs 雪崩法債務償還計算器。香港人專用，即時比較還款計劃，省最多利息。';

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical" href={canonical || 'https://debtzero-pro.netlify.app'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}