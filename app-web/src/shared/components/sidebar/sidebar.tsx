'use client'
import '../../../../public/styles/dashboard.css'

import { ISidebarItem } from "@/lib/types";
import SidebarItem from "./sidebar-item";
import { useAuth } from "@/core/auth/AuthContext";
import { useTheme } from 'next-themes';

const Sidebar = () => {
  const { user } = useAuth();
  const { resolvedTheme } = useTheme(); // Get the resolved theme (light, dark, or system)
  if (!user) return null; // Check if user is logged in

  // Use user.menu if available, fallback to item, and filter active items with read permissions
  const items: ISidebarItem[] = user.menu ? user.menu.filter((x) => x.isActive === true) : [];
  
  // Select logo based on theme
  const logoSrc = resolvedTheme === 'dark' ? '/img/logo/logo_black.png' : '/img/logo/logo_white.png';
  const backgroudSidebar = resolvedTheme === 'dark' ? 'fixed top-0 left-0 h-screen w-64 shadow-lg z-10 p-4' : 'fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4'

  return (
    <div className={backgroudSidebar}>
      <div className="flex flex-col h-full w-full">
        {/* Logo Section (Fixed, non-scrollable) */}
        <div className="flex-shrink-0">
          <img className="h-30 w-fit" src={logoSrc} alt="Logo" />
        </div>
        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto mt-4">
          <div className="flex flex-col space-y-2">
            {items.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
