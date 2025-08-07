'use client';
import { useTranslation } from "@/core/i18n/useTranslation";
import { ISubItem } from "@/lib/types";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

const SubMenuItem = ({ item }: { item: ISubItem }) => {
  const { name, path } = item;
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(path);
  };

  const isActive = useMemo(() => path === pathname, [path, pathname]);

  console.log('item ', name, path)
  return (
    <div
      className={`text-sm hover:text-sidebar-active hover:font-semibold cursor-pointer ${
        isActive ? "text-sidebar-active font-semibold" : ""
      }`}
      onClick={onClick}
    >
      {t(name)}
    </div>
  );
};

export default SubMenuItem;
