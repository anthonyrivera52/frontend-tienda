import { AuthTokens, TokenPayload, AuthConfig } from './types';

// En un entorno real, usaríamos una biblioteca como jsonwebtoken
// Aquí simulamos la funcionalidad para el propósito de este proyecto

export class TokenService {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  // Simula la verificación de un token JWT
  verifyToken(token: string): TokenPayload | null {
    try {
      // En un entorno real, usaríamos jwt.verify
      // Aquí simplemente decodificamos el token (que es un JWT simulado)
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('Token no tiene 3 partes:', parts.length);
        return null;
      }
      
      // Decodificar el payload
      let payload;
      try {
        payload = JSON.parse(atob(parts[1]));
      } catch (decodeError) {
        console.error('Error al decodificar payload del token:', decodeError);
        return null;
      }
      
      // Verificar que el payload tenga la estructura correcta
      if (!payload.sub || !payload.iat) {
        console.error('Token payload inválido:', payload);
        return null;
      }
      
      const now = Math.floor(Date.now() / 1000);
      // Verificar si el token ha expirado
      if (payload.exp && payload.exp < now) {
        return null; // Token expirado
      }
      
      console.log('Token válido');
      return payload;
    } catch (error) {
      console.error('Error al verificar token:', error);
      return null;
    }
  }

  // Obtiene el userId del token
  getUserIdFromToken(token: string): string | null {
    const payload = this.verifyToken(token);
    return payload ? payload.sub : null;
  }

  // Simula la generación de tokens (en un entorno real usaríamos jwt.sign)
  generateTokens(userId: string): AuthTokens {
    const now = Math.floor(Date.now() / 1000);
    const accessTokenExp = now + 3600; // 1 hora
    const refreshTokenExp = now + 604800; // 7 días
    
    // Crear payloads válidos
    const accessPayload = {
      sub: userId,
      iat: now,
      exp: accessTokenExp
    };
    
    const refreshPayload = {
      sub: userId,
      iat: now,
      exp: refreshTokenExp
    };
    
    // Simular JWT encoding (header.payload.signature)
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const accessPayloadEncoded = btoa(JSON.stringify(accessPayload));
    const refreshPayloadEncoded = btoa(JSON.stringify(refreshPayload));
    
    return {
      accessToken: `${header}.${accessPayloadEncoded}.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
      refreshToken: `${header}.${refreshPayloadEncoded}.QsODiLz9d7LAUX0W_QQYLYkGkafp1kzrA_Tn0A34wlM`
    };
  }
}