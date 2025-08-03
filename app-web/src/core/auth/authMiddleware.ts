import { NextRequest, NextResponse } from 'next/server';
import { TokenService } from './tokenService';
import { AuthConfig } from './types';
import { getReadJSON } from '@/lib/utils/index';

// Función para obtener la configuración de autenticación
async function getAuthConfig(): Promise<AuthConfig> {
  try {
    if(process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== ""){
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/data/auth-config.json`);
      return await response.json();
    }else{
      return await getReadJSON('auth-config.json');
    }
  } catch (error) {
    console.error('Error al cargar la configuración de autenticación:', error);
    // Configuración por defecto
    return {
      jwtSecret: 'default-secret-key',
      accessTokenExpiresIn: '1h',
      refreshTokenExpiresIn: '7d',
      cookieName: 'auth-token',
      secureCookie: false
    };
  }
}

// Middleware para proteger rutas
export async function authMiddleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login', '/register'];
  const apiAuthRoutes = ['/api/auth/login', '/api/auth/register', '/api/auth/refresh', '/api/auth/logout'];
  
  // Verificar si es una ruta de API de autenticación (siempre permitir)
  const isApiAuthRoute = apiAuthRoutes.some(route => path.includes(route));
  if (isApiAuthRoute) {
    return NextResponse.next();
  }
  
  // Obtener la configuración de autenticación
  const authConfig = await getAuthConfig();
  const tokenService = new TokenService(authConfig);
  
  // Obtener el token de la cookie o del encabezado de autorización
  const authCookie = request.cookies.get(authConfig.cookieName);
  const authHeader = request.headers.get('authorization');
  
  let token = '';
  
  if (authCookie) {
    token = authCookie.value;
  } else if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
  
  // Verificar el token
  const tokenPayload = token ? tokenService.verifyToken(token) : null;
  const isAuthenticated = !!tokenPayload;
  
  // Extraer el locale del path actual
  const pathSegments = path.split('/').filter(Boolean);
  const locale = pathSegments[0] || 'es'; // Usar 'es' como fallback
  
  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some(route => path.includes(route));
  
  // Si el usuario está autenticado y trata de acceder a login o register, redirigir al dashboard
  if (isAuthenticated && isPublicRoute) {
    console.log(`Middleware: Usuario autenticado intentando acceder a ruta pública: ${path}, redirigiendo al dashboard`);
    const dashboardUrl = new URL(`/${locale}/dashboard`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }
  
  // Si es una ruta pública y no está autenticado, permitir el acceso
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // Si llegamos aquí, es una ruta protegida
  if (isAuthenticated) {
    // Token válido, permitir el acceso
    return NextResponse.next();
  }
  
  // Si es una solicitud a la API, devolver 401
  if (path.startsWith('/api/')) {
    return new NextResponse(JSON.stringify({
      message: 'No autorizado',
      error: 'UNAUTHORIZED'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Usuario no autenticado intentando acceder a ruta protegida
  console.log(`Middleware: Usuario no autenticado intentando acceder a ruta protegida: ${path}, redirigiendo al login`);
  const loginUrl = new URL('/login', request.url);
  // loginUrl.searchParams.set('redirect', path);
  return NextResponse.redirect(loginUrl);
}