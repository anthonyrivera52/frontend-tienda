'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../core/auth/AuthContext';

interface AuthRedirectProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthRedirect({ 
  children, 
  requireAuth = false, 
  redirectTo 
}: AuthRedirectProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // Extraer el locale del pathname
    const pathSegments = pathname.split('/').filter(Boolean);
    const locale = pathSegments[0] || 'es';

    // Rutas públicas donde usuarios autenticados deberían ser redirigidos
    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.some(route => pathname.includes(route));

    if (isAuthenticated && isPublicRoute) {
      // Usuario autenticado en ruta pública, redirigir al dashboard
      const destination = redirectTo || `/${locale}/dashboard`;
      console.log(`Redirigiendo usuario autenticado desde ${pathname} a ${destination}`);
      router.replace(destination);
    } else if (requireAuth && !isAuthenticated && !isPublicRoute) {
      // Usuario no autenticado en ruta protegida, redirigir al login
      const loginUrl = `/${locale}/login?redirect=${encodeURIComponent(pathname)}`;
      console.log(`Redirigiendo usuario no autenticado desde ${pathname} a login`);
      router.replace(loginUrl);
    }
  }, [isAuthenticated, isLoading, pathname, router, requireAuth, redirectTo]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Mostrar loading si se está redirigiendo
  const pathSegments = pathname.split('/').filter(Boolean);
  const locale = pathSegments[0] || 'es';
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.some(route => pathname.includes(route));

  if (isAuthenticated && isPublicRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirigiendo al dashboard...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated && !isPublicRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}