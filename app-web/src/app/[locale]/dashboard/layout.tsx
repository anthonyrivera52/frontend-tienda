'use client'; // 💡 Esencial para usar hooks como useState

import { useState } from 'react';
import Navbar from '@/shared/components/navbar/navbar';
import SideNavbar from '@/shared/components/sidebar/sidebar';
// No necesitas importar el CSS aquí si ya está en un layout superior o global.

export default function Layout({ children }: { children: React.ReactNode }) {
  // Estado para controlar la visibilidad del sidebar en móviles
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* ===== SIDEBAR PARA DESKTOP ===== */}
      {/* Oculto en móvil (hidden), visible a partir de md (md:block) */}
      <div className="hidden md:flex md:w-64 md:flex-shrink-0">
        <SideNavbar />
      </div>

      {/* ===== CONTENEDOR PRINCIPAL (Navbar + Children) ===== */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Pasamos la función para que el Navbar pueda abrir el menú móvil */}
        <Navbar onMenuButtonClick={() => setSidebarOpen(true)} />

        {/* Área de contenido principal con scroll propio */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>

      {/* ===== SIDEBAR PARA MÓVIL (OVERLAY) ===== */}
      {/* Se muestra condicionalmente basado en el estado */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-20 flex md:hidden">
          {/* Fondo oscuro con opacidad */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          {/* Contenido del Sidebar */}
          <div className="relative flex w-64 max-w-xs flex-col bg-white dark:bg-gray-800">
            {/* Aquí puedes añadir un botón de cerrar si quieres */}
            <SideNavbar />
          </div>
        </div>
      )}
    </div>
  );
}