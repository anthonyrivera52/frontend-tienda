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
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Campañas",
    path: "/dashboard/campaigns",
    icon: Gift,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Categoria",
    path: "/dashboard/categories",
    icon: Castle,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Chat",
    path: `/dashboard/chat`,
    icon: MessageCircleMore,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Iva",
    path: `/dashboard/iva`,
    icon: PersonStanding,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Inventario",
    path: `/dashboard/inventory`,
    icon: WalletCards,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "FeedBack and Question",
    path: `/dashboard/feedback`,
    icon: MessageCircleMore,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Orders",
    path: `/dashboard/orders`,
    icon: Home,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Roles",
    path: `/dashboard/roles`,
    icon: WalletCards,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Permisos",
    path: `/dashboard/permissions`,
    icon: PersonStanding,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Productos",
    path: `/dashboard/products`,
    icon: WalletCards,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Metodos Pagos",
    path: `/dashboard/transactions`,
    icon: WalletCards,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Usuarios",
    path: `/dashboard/profile`,
    icon: User,
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
  {
    name: "Settings",
    path: `/dashboard/settings`,
    icon: "Settings",
    isActive: true,
    permissions: {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true
    }
  },
];
