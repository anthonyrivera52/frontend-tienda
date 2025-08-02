import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { getReadJSON } from '@/lib/utils/index';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Cargar usuarios simulados
    let users;
    let usersResponse;
    try {
        if(process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== "") {
        // Si la variable de entorno está configurada, usar URL externa
        usersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/users.json`);
      }else {
        console.log('Usando archivo local');
        // Si no está configurada, usar archivo local
        usersResponse = await getReadJSON('users.json');
      }

      users = usersResponse;

    } catch (error) {
      console.log('error -> ', error);
      // Fallback a usuarios locales si el fetch falla
      users = [
        {
          id: 1,
          email: 'usuario@ejemplo.com',
          password: 'password123',
          name: 'Administrador',
          role: 'admin'
        },
      ];
    }
    
    // Buscar usuario por email
    const user = users.find((u: any) => u.email === email);
    
    // Validar usuario y contraseña
    if (!user) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('isPasswordValid -> ', isPasswordValid);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }
    
    // Cargar configuración de autenticación
    let authConfig;
    try {
      if(process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== ""){
        // Si la variable de entorno está configurada, usar URL externa
        const configResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data/auth-config.json`);
        authConfig = await configResponse.json();
      }else{
        // Si no está configurada, usar archivo local
        const configResponse = await getReadJSON('auth-config.json');
        authConfig = configResponse;
      }
    } catch (error) {
      // Fallback a configuración local si el fetch falla
      authConfig = {
        cookieName: 'auth-token',
        secureCookie: false
      };
    }
    
    // Generar tokens (simulado) - Crear tokens JWT válidos
    const now = Math.floor(Date.now() / 1000);
    const accessTokenExp = now + 3600; // 1 hora
    const refreshTokenExp = now + 604800; // 7 días
    
    // Crear payloads válidos
    const accessPayload = {
      sub: user.id.toString(),
      iat: now,
      exp: accessTokenExp
    };
    
    const refreshPayload = {
      sub: user.id.toString(),
      iat: now,
      exp: refreshTokenExp
    };
    
    // Simular JWT encoding (header.payload.signature)
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const accessPayloadEncoded = btoa(JSON.stringify(accessPayload));
    const refreshPayloadEncoded = btoa(JSON.stringify(refreshPayload));
    
    const tokens = {
      accessToken: `${header}.${accessPayloadEncoded}.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
      refreshToken: `${header}.${refreshPayloadEncoded}.QsODiLz9d7LAUX0W_QQYLYkGkafp1kzrA_Tn0A34wlM`
    };
    
    // Guardar token en cookies
    const cookieStore = await cookies();
    cookieStore.set(authConfig.cookieName, tokens.accessToken, {
      httpOnly: true,
      secure: authConfig.secureCookie,
      maxAge: 60 * 60, // 1 hora
      path: '/'
    });
    
    // Devolver usuario y tokens
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      tokens
    });
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}