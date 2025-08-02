import { ReactNode } from 'react';
import { i18nConfig } from '../../core/i18n/config';
import { AuthProviderWrapper } from '../../core/auth/AuthProviderWrapper';
import { LayoutClient } from './LayoutClient';
import { ToastProvider } from '../../shared/contexts/ToastContext';
import '../globals.css';

export async function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'Tienda App',
    description: 'Aplicación de tienda con Next.js',
  };
}

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;
  
  // Configuración de autenticación por defecto
  const authConfig = {
    jwtSecret: 'default-secret-key',
    accessTokenExpiresIn: '1h',
    refreshTokenExpiresIn: '7d',
    cookieName: 'auth-token',
    secureCookie: false
  };
  
  return (
    <html lang={locale} dir="ltr">
      <body>
        <ToastProvider>
          <AuthProviderWrapper authConfig={authConfig}>
            <LayoutClient locale={locale}>
              {children}
            </LayoutClient>
          </AuthProviderWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}