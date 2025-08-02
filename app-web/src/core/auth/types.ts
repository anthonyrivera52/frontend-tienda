export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  sub: string; // userId
  iat: number; // issued at
  exp: number; // expires at
  [key: string]: any; // otros campos opcionales
}

export interface AuthConfig {
  jwtSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  cookieName: string;
  secureCookie: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}