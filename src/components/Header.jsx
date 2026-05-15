'use client';

import Link from 'next/link';
import { useLocale } from '../hooks/useLocale';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const { locale, changeLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();

  return null; // Header is now in page.jsx to match target design exactly
}