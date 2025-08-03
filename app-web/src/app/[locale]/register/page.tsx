'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useAuth } from '../../../core/auth/AuthContext';
import { useToast } from '../../../shared/contexts/ToastContext';
import { ClientOnly } from '../../../shared/components/ClientOnly';

export default function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  const { showError, showSuccess } = useToast();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirigir si ya está autenticado (solo si no está en proceso de carga)
  useEffect(() => {
    if (mounted && !authLoading && isAuthenticated && !isLoading) {
      console.log('Usuario ya autenticado en registro, redirigiendo al dashboard');
      router.replace(`/${locale}/dashboard`);
    }
  }, [mounted, isAuthenticated, authLoading, isLoading, router, locale]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Cambiando ${name}: ${value}`); // Debug log
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      console.log('Nuevo formData:', newData); // Debug log
      return newData;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading || authLoading) return;

    if (formData.password !== formData.confirmPassword) {
      showError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (success) {
        showSuccess('Cuenta creada exitosamente');
        console.log('Registro exitoso, el useEffect manejará la redirección');
        // No hacer redirección manual aquí, dejar que el useEffect la maneje
        // cuando isAuthenticated cambie a true
      } else {
        showError('Error al crear la cuenta');
      }
    } catch (err) {
      console.error('Error en registro:', err);
      showError('Error al registrar usuario');
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

  // Formulario de registro
  return (
    <ClientOnly fallback={fallback}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              t('createRegister')
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  disabled={isLoading}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
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
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                    Creando cuenta...
                  </>
                ) : (
                  'Crear cuenta'
                )}
              </button>
            </div>

            <div className="text-center">
              <a
                href={`/${locale}/login`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </a>
            </div>
          </form>
        </div>
      </div>
    </ClientOnly>
  );
}
