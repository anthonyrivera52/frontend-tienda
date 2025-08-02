import { useAuth } from '../auth/AuthContext';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export class HttpClient {
  private baseUrl: string;
  private refreshPromise: Promise<boolean> | null = null;
  
  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }
  
  async request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { requiresAuth = false, ...fetchOptions } = options;
    const fullUrl = this.baseUrl + url;
    
    // Si requiere autenticación, añadir el token de acceso
    if (requiresAuth) {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No hay token de acceso disponible');
      }
      
      fetchOptions.headers = {
        ...fetchOptions.headers,
        'Authorization': `Bearer ${accessToken}`
      };
    }
    
    try {
      const response = await fetch(fullUrl, fetchOptions);
      
      // Si la respuesta es 401 (No autorizado), intentar refrescar el token
      if (response.status === 401 && requiresAuth) {
        const refreshed = await this.refreshAccessToken();
        
        if (refreshed) {
          // Reintentar la solicitud con el nuevo token
          const newAccessToken = localStorage.getItem('accessToken');
          fetchOptions.headers = {
            ...fetchOptions.headers,
            'Authorization': `Bearer ${newAccessToken}`
          };
          
          const retryResponse = await fetch(fullUrl, fetchOptions);
          return this.handleResponse<T>(retryResponse);
        } else {
          // Si no se pudo refrescar, redirigir al login
          this.redirectToLogin();
          throw new Error('Sesión expirada');
        }
      }
      
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('Error en solicitud HTTP:', error);
      throw error;
    }
  }
  
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }
    
    // Para respuestas vacías (como 204 No Content)
    if (response.status === 204) {
      return {} as T;
    }
    
    return await response.json();
  }
  
  private async refreshAccessToken(): Promise<boolean> {
    // Evitar múltiples solicitudes de refresco simultáneas
    if (!this.refreshPromise) {
      const auth = useAuth();
      this.refreshPromise = auth.refreshTokens();
      const result = await this.refreshPromise;
      this.refreshPromise = null;
      return result;
    }
    
    return await this.refreshPromise;
  }
  
  private redirectToLogin() {
    // En un entorno cliente, redirigir al login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
  
  // Métodos de conveniencia
  async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }
  
  async post<T>(url: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    });
  }
  
  async put<T>(url: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    });
  }
  
  async delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }
}

// Hook para usar el cliente HTTP
export const useHttpClient = () => {
  return new HttpClient();
};