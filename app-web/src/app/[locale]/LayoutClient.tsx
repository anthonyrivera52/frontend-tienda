'use client';

import { ReactNode, useEffect } from 'react';

interface LayoutClientProps {
  children: ReactNode;
  locale: string;
}

export function LayoutClient({ children, locale }: LayoutClientProps) {
  useEffect(() => {
    // Actualizar el atributo lang del html después de la hidratación
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
} 