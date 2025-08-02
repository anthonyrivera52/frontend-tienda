'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthTokens } from './types';
import { AuthService } from './authService';
import { TokenService } from './tokenService';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { email: string, password: string, name: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<boolean>;
  redirectToDashboard: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  authConfig: any; // La configuración de autenticación
}

export const AuthProvider = ({ children, authConfig }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Inicializar servicios
  const tokenService = new TokenService(authConfig);
  const authService = new AuthService(tokenService);
  
  // Función para guardar tokens en localStorage
  const saveTokens = (newTokens: AuthTokens) => {
    if (mounted) {
      localStorage.setItem('accessToken', newTokens.accessToken);
      localStorage.setItem('refreshToken', newTokens.refreshToken);
    }
    setTokens(newTokens);
  };
  
  // Función para eliminar tokens del localStorage
  const clearTokens = () => {
    if (mounted) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    setTokens(null);
  };
  
  // Marcar como montado cuando el componente se monta en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Inicializar el estado de autenticación al cargar
  useEffect(() => {
    if (!mounted) return;
    
    const initAuth = async () => {
      try {
        // Intentar recuperar tokens del localStorage
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        
        if (!storedAccessToken || !storedRefreshToken) {
          console.log('No hay tokens almacenados');
          setIsLoading(false);
          return;
        }
        
        // Verificar si el token de acceso es válido
        const accessTokenPayload = tokenService.verifyToken(storedAccessToken);
        
        if (accessTokenPayload) {
          console.log('Token de acceso válido, obteniendo usuario actual');
          // Si el token es válido, obtener el usuario actual
          const currentUser = await authService.getCurrentUser(storedAccessToken);
          if (currentUser) {
            console.log('Usuario obtenido exitosamente:', currentUser.email);
            setUser(currentUser);
            setTokens({ accessToken: storedAccessToken, refreshToken: storedRefreshToken });
            setIsLoading(false);
            return;
          } else {
            console.log('No se pudo obtener el usuario actual');
          }
        } else {
          console.log('Token de acceso inválido, intentando refrescar');
        }
        
        // Si el token de acceso no es válido, intentar refrescar
        const refreshTokenPayload = tokenService.verifyToken(storedRefreshToken);
        if (refreshTokenPayload) {
          console.log('Refresh token válido, refrescando tokens');
          const newTokens = await authService.refreshTokens(storedRefreshToken);
          if (newTokens) {
            console.log('Tokens refrescados exitosamente');
            saveTokens(newTokens);
            const currentUser = await authService.getCurrentUser(newTokens.accessToken);
            if (currentUser) {
              console.log('Usuario obtenido con nuevos tokens:', currentUser.email);
              setUser(currentUser);
              setIsLoading(false);
              return;
            }
          } else {
            console.log('No se pudieron refrescar los tokens');
          }
        } else {
          console.log('Refresh token inválido');
        }
        
        // Si no se pudo refrescar, limpiar tokens
        console.log('Limpiando tokens y estado de usuario');
        clearTokens();
        setUser(null);
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        clearTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
  }, [mounted]);
  
  // Función para redirigir al dashboard
  const redirectToDashboard = () => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/').filter(Boolean);
      const locale = pathSegments[0] || 'es';
      
      // Usar replace para evitar que el usuario pueda volver atrás
      window.location.replace(`/${locale}/dashboard`);
    }
  };

  // Función para iniciar sesión
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await authService.login(email, password);
      if (result && result.user && result.tokens) {
        setUser(result.user);
        saveTokens(result.tokens);
        
        // Pequeño delay para asegurar que el estado se actualice
        setTimeout(() => {
          console.log('Login exitoso, usuario autenticado');
        }, 100);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };
  
  // Función para registrar un nuevo usuario
  const register = async (userData: { email: string, password: string, name: string }): Promise<boolean> => {
    try {
      const result = await authService.register(userData);
      if (result && result.user && result.tokens) {
        setUser(result.user);
        saveTokens(result.tokens);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    }
  };
  
  // Función para cerrar sesión
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      clearTokens();
      setUser(null);
      
      // Redirigir al login después del logout
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(Boolean);
        const locale = pathSegments[0] || 'es';
        
        console.log('Logout exitoso, redirigiendo al login');
        // Usar replace para evitar que el usuario pueda volver atrás
        window.location.replace(`/${locale}/login`);
      }
    }
  };
  
  // Función para refrescar tokens
  const refreshTokens = async (): Promise<boolean> => {
    try {
      if (!mounted) return false;
      
      const storedRefreshToken = localStorage.getItem('refreshToken');
      if (!storedRefreshToken) return false;
      
      const newTokens = await authService.refreshTokens(storedRefreshToken);
      if (newTokens) {
        saveTokens(newTokens);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error al refrescar tokens:', error);
      return false;
    }
  };
  
  const value = {
    user,
    isLoading: !mounted || isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshTokens,
    redirectToDashboard
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};