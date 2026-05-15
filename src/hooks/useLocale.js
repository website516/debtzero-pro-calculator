import { useState, useEffect } from 'react';
import en from '../locales/en.json';
import zh from '../locales/zh.json';

const translations = { en, zh };

export function useLocale() {
  const [locale, setLocale] = useState('zh');

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (saved && (saved === 'en' || saved === 'zh')) {
      setLocale(saved);
    }
  }, []);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key) => translations[locale][key] || key;

  return { locale, changeLocale, t };
}