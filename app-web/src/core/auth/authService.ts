import { AuthTokens, AuthUser } from './types';
import { TokenService } from './tokenService';

export class AuthService {
  private tokenService: TokenService;
  
  constructor(tokenService: TokenService) {
    this.tokenService = tokenService;
  }

  async login(email: string, password: string): Promise<{ user: AuthUser, tokens: AuthTokens } | null> {
    try {
      // Simulamos una llamada a la API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      return null;
    }
  }

  async register(userData: { email: string, password: string, name: string }): Promise<{ user: AuthUser, tokens: AuthTokens } | null> {
    try {
      // Simulamos una llamada a la API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en registro:', error);
      return null;
    }
  }

  async logout(): Promise<boolean> {
    try {
      // Simulamos una llamada a la API
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      return response.ok;
    } catch (error) {
      console.error('Error en logout:', error);
      return false;
    }
  }

  async refreshTokens(refreshToken: string): Promise<AuthTokens | null> {
    try {
      // Simulamos una llamada a la API
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        throw new Error('Error al refrescar tokens');
      }

      const data = await response.json();
      return data.tokens;
    } catch (error) {
      console.error('Error al refrescar tokens:', error);
      return null;
    }
  }

  async getCurrentUser(accessToken: string): Promise<AuthUser | null> {
    try {
      // Simulamos una llamada a la API
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener usuario actual');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return null;
    }
  }
}