import { AuthUser } from "@/core/auth/types"

export interface ISidebarItem {
    name: string,
    path: string,
    icon: string,
    items?: ISubItem[],
    isActive: boolean,
    permissions: Permission
}

export interface UserModuleRolPermission {
  menu?: ISidebarItem[]
  permission?: Permission
  idUser: AuthUser
}

export interface ISubItem  {
    name: string
    path: string
    isActive: boolean
}

export type Role = 'admin' | 'vendedor' | 'guest';

export interface Permission {
  canCreate: boolean
  canRead: boolean
  canUpdate: boolean
  canDelete: boolean
}

export type RolePermissions = {
  [key in Role]: Permission;
};

// La prop `locale` es opcional pero muy recomendada para construir los enlaces correctos.
// La obtendrías con `useParams` en el layout y la pasarías hasta aquí.
export interface NavbarProps {
  onMenuButtonClick: () => void;
  locale?: string;
}
