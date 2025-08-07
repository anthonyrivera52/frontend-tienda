import { NextRequest, NextResponse } from 'next/server';
import { TokenService } from '@/core/auth/tokenService';
import { getReadJSON } from '@/lib/utils/index';

export async function GET(request: NextRequest) {
  try {
    // Obtener token del encabezado de autorización
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }
    
    const token = authHeader.substring(7);
    
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
    
    // Verificar el token
    const tokenService = new TokenService(authConfig);
    const payload = tokenService.verifyToken(token);
    
    if (!payload) {
      return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }
    
    const userId = payload.sub;
    
    // Cargar usuarios simulados
    let users;
    try {
      if(process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== ""){
        const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/users.json`);
        users = await usersResponse.json();
      } else {
        users = await getReadJSON('users.json');
      }
    } catch (error) {
      // Fallback a usuarios locales si el fetch falla
      users = [
        {
          id: '1',
          email: 'admin@example.com',
          password: 'admin123',
          name: 'Administrador',
          role: 'admin'
        },
        {
          id: '2',
          email: 'user@example.com',
          password: 'user123',
          name: 'Usuario',
          role: 'user'
        }
      ];
    }
    
    // Buscar usuario por ID
    const user = users.find((u: any) => u.id === userId || u.id === parseInt(userId));
    
    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }
    
    // Devolver información del usuario (sin la contraseña)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        menu: user.menu
      }
    });
  } catch (error) {
    console.error('Error al obtener usuario actual:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}