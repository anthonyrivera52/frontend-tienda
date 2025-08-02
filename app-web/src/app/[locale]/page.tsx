import { redirect } from 'next/navigation';
import { i18nConfig } from '../../core/i18n/config';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Redirigir al login por defecto (la autenticación se manejará en el cliente)
  redirect(`/${locale}/login`);
}