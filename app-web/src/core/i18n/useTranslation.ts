'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

// Traducciones simples (puedes expandir esto según tus necesidades)
const translations = {
  es: {
    dashboardTitle: 'Panel de Control',
    dashboardDescription: 'Bienvenido a tu panel de control',
    logout: 'Cerrar sesión',
    loading: 'Cargando...',
    name: 'Nombre',
    email: 'Email',
    role: 'Rol'
  },
  en: {
    dashboardTitle: 'Dashboard',
    dashboardDescription: 'Welcome to your dashboard',
    logout: 'Logout',
    loading: 'Loading...',
    name: 'Name',
    email: 'Email',
    role: 'Role'
  }
}

export function useTranslation() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const locale = mounted ? (params?.locale as string || 'es') : 'es';
  
  const t = (key: string) => {
    return translations[locale as keyof typeof translations]?.[key as keyof typeof translations.es] || key
  }
  
  return {
    t,
    locale
  }
}