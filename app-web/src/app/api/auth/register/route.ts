import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { getReadJSON } from '@/lib/utils/index';
import { TokenService } from '@/core/auth/tokenService';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();
    
    // Cargar usuarios simulados
    let users;
    try {
      if(process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== ""){
        const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/data/users.json`);
        users = await usersResponse.json();
      }else{
        users = await getReadJSON('users.json');
      }
    } catch (error) {
      // Fallback a usuarios locales si el fetch falla
      users = [
        {
          id: 1,
          email: 'admin@example.com',
          password: 'admin123',
          name: 'Administrador',
          role: 'admin'
        },
        {
          id: 2,
          email: 'user@example.com',
          password: 'user123',
          name: 'Usuario',
          role: 'user'
        }
      ];
    }
    
    // Verificar si el email ya está registrado
    const existingUser = users.find((u: any) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ message: 'El email ya está registrado' }, { status: 400 });
    }
    
    // En un entorno real, aquí guardaríamos el nuevo usuario en la base de datos
    // y hashearíamos la contraseña con bcrypt
    
    // Simular la creación de un nuevo usuario
    const newUser = {
      id: String(users.length + 1),
      email,
      password: bcrypt.hashSync(password, 10), // Contraseña hasheada simulada
      name,
      role: 'user',
      createdAt: new Date().toISOString(),
      menu: [
        {
          "name": "Dashboard",
          "path": "/dashboard",
          "icon": "Home",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Campañas",
          "path": "/dashboard/campaigns",
          "icon": "Gift",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Categoria",
          "path": "/dashboard/categories",
          "icon": "Castle",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Chat",
          "path": "/dashboard/chat",
          "icon": "MessageCircleMore",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Iva",
          "path": "/dashboard/iva",
          "icon": "PersonStanding",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Inventario",
          "path": "/dashboard/inventory",
          "icon": "WalletCards",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "FeedBack and Question",
          "path": "/dashboard/feedback",
          "icon": "MessageCircleMore",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Orders",
          "path": "/dashboard/orders",
          "icon": "Home",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Roles",
          "path": "/dashboard/roles",
          "icon": "WalletCards",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Permisos",
          "path": "/dashboard/permissions",
          "icon": "PersonStanding",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Productos",
          "path": "/dashboard/products",
          "icon": "WalletCards",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Metodos Pagos",
          "path": "/dashboard/transactions",
          "icon": "WalletCards",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Usuarios",
          "path": "/dashboard/profile",
          "icon": "User",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        },
        {
          "name": "Settings",
          "path": "/dashboard/settings",
          "icon": "Settings",
          "isActive": true,
          "permissions": {
            "canCreate": true,
            "canRead": true,
            "canUpdate": true,
            "canDelete": true
          }
        }
      ]
    };
    
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
    
    // Generar tokens usando TokenService
    const tokenService = new TokenService({
      jwtSecret: authConfig.jwtSecret || 'default-secret-key',
      accessTokenExpiresIn: authConfig.accessTokenExpiresIn || '1h',
      refreshTokenExpiresIn: authConfig.refreshTokenExpiresIn || '7d',
      cookieName: authConfig.cookieName || 'auth-token',
      secureCookie: authConfig.secureCookie || false
    });
    
    const tokens = tokenService.generateTokens(newUser.id);
    
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
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        menu: newUser.menu
      },
      tokens
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}