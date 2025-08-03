'use client'

import { ISidebarItem } from "@/lib/types";
import { LayoutDashboard, WalletCards, Settings, PersonStanding, User, Gift, Castle,
  MessageCircleMore,
  Home
 } from 'lucide-react'

export const item: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: `/dashboard`,
    icon: Home,
  },
  {
    name: "Campañas",
    path: "/dashboard/campaigns",
    icon: Gift,
  },
  {
    name: "Categoria",
    path: "/dashboard/categories",
    icon: Castle,
  },
  {
    name: "Chat",
    path: `/dashboard/chat`,
    icon: MessageCircleMore
  },
  {
    name: "Iva",
    path: `/dashboard/iva`,
    icon: PersonStanding
  },
  {
    name: "Inventario",
    path: `/dashboard/inventory`,
    icon: WalletCards
  },
  {
    name: "FeedBack and Question",
    path: `/dashboard/feedback`,
    icon: MessageCircleMore
  },
  {
    name: "Orders",
    path: `/dashboard/orders`,
    icon: Home,
  },
  {
    name: "Roles",
    path: `/dashboard/roles`,
    icon: WalletCards,
  },
  {
    name: "Permisos",
    path: `/dashboard/permissions`,
    icon: PersonStanding
  },
  {
    name: "Productos",
    path: `/dashboard/products`,
    icon: WalletCards
  },
  {
    name: "Metodos Pagos",
    path: `/dashboard/transactions`,
    icon: WalletCards
  },
  {
    name: "Usuarios",
    path: `/dashboard/profile`,
    icon: User,
  },
  {
    name: "Settings",
    path: `/dashboard/settings`,
    icon: Settings,
  },
];