
"use client";
import { useMemo, useState } from "react";
import { ChevronDown, LucideIcon, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import SubMenuItem from "./sub-item";
import { ISidebarItem } from "@/lib/types";
import { iconMap } from "../contants";
import { useTheme } from "next-themes";

const SidebarItem = ({ item }: { item: ISidebarItem }) => {

  const { resolvedTheme } = useTheme(); 
  const { name, icon: Icon, items, path } = item;
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (items && items.length > 0) {
      return setExpanded(!expanded);
    }

    return router.push(path);
  };
  const isActive = useMemo(() => {
    if (items && items.length > 0) {
      if (items.find((item) => item.path === pathname)) {
        setExpanded(true);
        return true;
      }
    }

    return path === pathname;
  }, [items, path, pathname]);

  const IconComponent = iconMap[Icon] || User;

  const textSystem = resolvedTheme === 'dark' ? 'flex items-center space-x-2 text-white' : 'flex items-center space-x-2 text-black'
  return (
    <>
      <div
        className={`flex items-center p-3 rounded-lg hover:bg-sidebar-background cursor-pointer hover:text-sidebar-active justify-between
     ${isActive && "text-sidebar-active bg-sidebar-background"}
    `}
        onClick={onClick}
      >
        <div className={textSystem}>
          <IconComponent />
          <p className="text-sm font-semibold">{name} </p>
        </div>
        {items && items.length > 0 && <ChevronDown size={18} />}
      </div>
      {expanded && items && items.length > 0 && (
        <div className="flex flex-col space-y-1 ml-10">
          {items.map((item) => (
            <SubMenuItem key={item.path} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarItem;
