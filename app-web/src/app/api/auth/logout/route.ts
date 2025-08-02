import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getReadJSON } from '@/lib/utils/index';

export async function POST(request: NextRequest) {
  try {
    // Cargar configuración de autenticación
    let authConfig;
    try {
      if(process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== ""){
        const configResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/data/auth-config.json`);
        authConfig = await configResponse.json();
      }else{
        authConfig = await getReadJSON('auth-config.json');
      }
    } catch (error) {
      // Fallback a configuración local si el fetch falla
      authConfig = {
        cookieName: 'auth-token',
        secureCookie: false
      };
    }
    
    // Eliminar cookie de autenticación
    const cookieStore = await cookies();
    cookieStore.delete(authConfig.cookieName);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en logout:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}