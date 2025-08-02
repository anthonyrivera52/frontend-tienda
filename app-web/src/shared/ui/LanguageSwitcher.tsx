'use client'

import { useTranslation } from '@/core/i18n/useTranslation'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

export default function LanguageSwitcher() {
  const { locale } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  
  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return
    
    // Obtener la ruta sin el locale actual
    const pathWithoutLocale = pathname.replace(`/${locale}`, '')
    
    // Construir la nueva ruta con el nuevo locale
    const newPath = `/${newLocale}${pathWithoutLocale}`
    
    router.push(newPath)
  }
  
  return (
    <div className="flex gap-2 items-center">
      <button 
        onClick={() => switchLocale('es')} 
        className={`p-1 rounded ${locale === 'es' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
      >
        <Image src="/globe.svg" alt="Español" width={24} height={24} />
        <span className="sr-only">Español</span>
      </button>
      <button 
        onClick={() => switchLocale('en')} 
        className={`p-1 rounded ${locale === 'en' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
      >
        <Image src="/globe.svg" alt="English" width={24} height={24} />
        <span className="sr-only">English</span>
      </button>
    </div>
  )
}