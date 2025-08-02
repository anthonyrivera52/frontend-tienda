'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../core/auth/AuthContext';

export function useProtectedRoute() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted || isLoading) return;
    
    // Solo manejar rutas protegidas, dejar que el middleware maneje las redirecciones de rutas públicas
    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.some(route => pathname.includes(route));
    
    // Solo redirigir si es una ruta protegida y el usuario no está autenticado
    if (!isAuthenticated && !isPublicRoute) {
      const pathSegments = pathname.split('/').filter(Boolean);
      const locale = pathSegments[0] || 'es';
      console.log(`Usuario no autenticado en ruta protegida ${pathname}, redirigiendo al login`);
      router.replace(`/${locale}/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [mounted, isAuthenticated, isLoading, router, pathname]);
  
  return { isAuthenticated, isLoading: !mounted || isLoading };
}