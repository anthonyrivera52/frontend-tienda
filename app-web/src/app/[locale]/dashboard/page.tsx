'use client';

import { useTranslation } from '../../../core/i18n/useTranslation';
import { useProtectedRoute } from '../../../shared/hooks/useProtectedRoute';
import { useAuth } from '../../../core/auth/AuthContext';
import { ClientOnly } from '../../../shared/components/ClientOnly';

export default function DashboardPage() {
  const { t } = useTranslation();
  const { isLoading } = useProtectedRoute();
  const { user, logout } = useAuth();
  
  // Fallback para mostrar mientras se hidrata
  const fallback = (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando...</p>
      </div>
    </div>
  );
  
  return (
    <ClientOnly fallback={fallback}>
      {isLoading ? (
        <div className="container mx-auto p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('loading')}</p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{t('dashboardTitle')}</h1>
          <p className="mb-4">{t('dashboardDescription')}</p>
          
          {user && (
            <div className="bg-white p-4 rounded shadow mb-4">
              <h2 className="text-xl font-semibold mb-2">Información del usuario</h2>
              <p><strong>{t('name')}:</strong> {user.name}</p>
              <p><strong>{t('email')}:</strong> {user.email}</p>
              <p><strong>{t('role')}:</strong> {user.role}</p>
            </div>
          )}
          
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            {t('logout')}
          </button>
        </div>
      )}
    </ClientOnly>
  );
}