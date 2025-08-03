'use client'
import SidebarItem from "./sidebar-item";
import { item } from '@/shared/config/routes'

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4">
      <div className="flex flex-col space-y-10 w-full">
        <img className="h-10 w-fit" src="/logo-expanded.png" alt="Logo" />
        <div className="flex flex-col space-y-2">
          {item.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
