import { NextRequest, NextResponse } from 'next/server';
import { i18nConfig } from './core/i18n/config';
import { authMiddleware } from './core/auth/authMiddleware';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  // Primero, manejar la redirección de i18n
  const pathname = request.nextUrl.pathname;
  
  // Verificar si la solicitud es para un archivo público
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/_next') ||
    pathname.includes('/api/')
  ) {
    return NextResponse.next();
  }
  
  // Manejar la redirección de i18n
  const pathnameIsMissingLocale = i18nConfig.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  
  if (pathnameIsMissingLocale) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || i18nConfig.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url));
  }
  
  // Luego, manejar la autenticación
  return authMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};