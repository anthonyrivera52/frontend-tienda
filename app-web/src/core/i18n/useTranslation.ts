'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import translationsENData from '../../../public/locales/en/common.json'
import translationESData from '../../../public/locales/es/common.json'

// Traducciones simples (puedes expandir esto según tus necesidades)
const translations = {
  en: translationsENData,
  es: translationESData, // create a copy of the English translation data and modify it for Spanish
};

export function useTranslation() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const locale = mounted ? (params?.locale as string || 'es') : 'es';
  
const t = (key: string) => {
  const translationData = translations[locale as keyof typeof translations];
    return (translationData as Record<string, string>)?.[key] || key;
};
  
  return {
    t,
    locale
  }
}