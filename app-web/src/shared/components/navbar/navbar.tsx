// @/shared/components/navbar/navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, Search, User, Settings, LogOut } from 'lucide-react';
import { NavbarProps } from '@/lib/types';
import { useAuth } from '@/core/auth/AuthContext';
import { item } from '@/shared/config/routes';


export default function Navbar({ onMenuButtonClick, locale = 'es' }: NavbarProps) {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  // Hook para cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    // Agregar el listener cuando el menú está abierto
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Limpiar el listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="flex items-center gap-4">
        {/* Botón de Menú (Hamburguesa) - SOLO VISIBLE EN MÓVIL */}
        <button
          onClick={onMenuButtonClick}
          className="text-gray-500 focus:outline-none md:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Barra de Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 md:w-64"
          />
        </div>
      </div>

      {/* Menú de Usuario - Lado derecho */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setUserMenuOpen(!isUserMenuOpen)}
          className="h-10 w-10 overflow-hidden rounded-full"
          aria-label="Abrir menú de usuario"
        >
          {/* Puedes usar una imagen de perfil o un icono */}
          <User className="h-full w-full rounded-full bg-gray-200 p-2 text-gray-600 dark:bg-gray-600 dark:text-gray-300" />
          {/* <img src="/path-to-user-avatar.jpg" alt="Avatar de usuario" /> */}
        </button>

        {/* Menú Desplegable */}
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
            <div className="py-1">
              <button
                onClick={logout}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <LogOut className="mr-3 h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}