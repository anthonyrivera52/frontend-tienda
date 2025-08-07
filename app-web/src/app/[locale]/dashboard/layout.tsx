'use client'; // Essential for using hooks like useState
import { useState } from 'react';
import Navbar from '@/shared/components/navbar/navbar';
import SideNavbar from '@/shared/components/sidebar/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* SIDEBAR FOR DESKTOP */}
      {/* Hidden on mobile (hidden), visible from md (md:block) */}
      <div className="hidden md:flex md:w-64 md:flex-shrink-0">
        <SideNavbar />
      </div>

      {/* CONTAINER PRINCIPAL (Navbar + Children) */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Pass the function so the Navbar can open the mobile menu */}
        <Navbar onMenuButtonClick={() => setSidebarOpen(true)} />

        {/* MAIN CONTENT AREA with own scroll */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>

      {/* SIDEBAR FOR MOBILE (OVERLAY) */}
      {/* Conditional based on state */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-20 flex md:hidden">
          {/* Dark background with opacity */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          {/* Side Navbar content */}
          <div className="relative flex w-64 max-w-xs flex-col bg-white dark:bg-gray-800">
            {/* You can add a close button if you want */}
            <SideNavbar />
          </div>
        </div>
      )}
    </div>
  );
}