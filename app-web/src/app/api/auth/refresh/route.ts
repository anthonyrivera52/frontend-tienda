import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getReadJSON } from '@/lib/utils/index';
import { TokenService } from '@/core/auth/tokenService';

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();
    
    if (!refreshToken) {
      return NextResponse.json({ message: 'Token de refresco no proporcionado' }, { status: 400 });
    }
    
    // Cargar configuración de autenticación
    let authConfig;
    try {
      if(process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== ""){
        const configResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/auth-config.json`);
        authConfig = await configResponse.json();
      } else {
        authConfig = await getReadJSON('auth-config.json');
      }
    } catch (error) {
      authConfig = {
        jwtSecret: 'default-secret-key',
        accessTokenExpiresIn: '1h',
        refreshTokenExpiresIn: '7d',
        cookieName: 'auth-token',
        secureCookie: false
      };
    }
    
    // Verificar el refresh token
    const tokenService = new TokenService(authConfig);
    const payload = tokenService.verifyToken(refreshToken);
    
    if (!payload) {
      return NextResponse.json({ message: 'Token de refresco inválido' }, { status: 401 });
    }
    
    const userId = payload.sub;
    
    // Generar nuevos tokens
    const newTokens = tokenService.generateTokens(userId);
    
    // Guardar nuevo token en cookies
    const cookieStore = await cookies();
    cookieStore.set(authConfig.cookieName, newTokens.accessToken, {
      httpOnly: true,
      secure: authConfig.secureCookie,
      maxAge: 60 * 60, // 1 hora
      path: '/'
    });
    
    // Devolver nuevos tokens
    return NextResponse.json({ tokens: newTokens });
  } catch (error) {
    console.error('Error al refrescar tokens:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}