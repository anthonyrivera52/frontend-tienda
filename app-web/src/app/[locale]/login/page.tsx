'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react';
import { useAuth } from '../../../core/auth/AuthContext';
import { useToast } from '../../../shared/contexts/ToastContext';
import { ClientOnly } from '../../../shared/components/ClientOnly';

export default function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const { showError, showSuccess } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || `/${locale}/dashboard`;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Manejar redirección cuando el usuario ya está autenticado
  useEffect(() => {
    if (mounted && !authLoading && isAuthenticated) {
      console.log('Usuario ya autenticado en login, redirigiendo a:', redirectTo);
      router.replace(redirectTo);
    }
  }, [mounted, isAuthenticated, authLoading, router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading || authLoading) return;
    
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        showSuccess('Inicio de sesión exitoso');
        console.log('Login exitoso, redirigiendo a:', redirectTo);
        // Esperar un poco para que el estado se actualice y luego redirigir
        setTimeout(() => {
          router.replace(redirectTo);
        }, 5000);
      } else {
        showError('Credenciales inválidas');
      }
    } catch (err) {
      console.error('Error en login:', err);
      showError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  // Componente de carga
  const LoadingComponent = ({ message }: { message: string }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );

  // Fallback para mostrar mientras se hidrata
  const fallback = <LoadingComponent message="Cargando..." />;

  // Si no está montado o está cargando la autenticación, mostrar loading
  if (!mounted || authLoading) {
    return <LoadingComponent message="Verificando autenticación..." />;
  }

  // Si está autenticado, mostrar loading de redirección
  if (isAuthenticated) {
    return <LoadingComponent message="Redirigiendo al dashboard..." />;
  }

  // Formulario de login
  const LoginForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isLoading}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </div>

          <div className="text-center">
            <a
              href={`/${locale}/register`}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              ¿No tienes cuenta? Regístrate
            </a>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <ClientOnly fallback={fallback}>
      <LoginForm />
    </ClientOnly>
  );
}
