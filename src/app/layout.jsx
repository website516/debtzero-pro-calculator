import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocale } from '../hooks/useLocale'; // Note: In real app use provider

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata = {
  title: 'DebtZero Pro | 香港最強債務清零計算器',
  description: '免費雪球法 vs 雪崩法債務償還計算器。香港人專用，即時比較還款計劃，省最多利息。',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-HK" className="dark">
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}