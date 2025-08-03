import { LucideIcon } from "lucide-react"

export interface ISidebarItem {
    name: string,
    path: string,
    icon: LucideIcon,
    items?: ISidebarItem[],
    isActive?: boolean
}

export interface ISubItem  {
    name: string
    path: string
}

// La prop `locale` es opcional pero muy recomendada para construir los enlaces correctos.
// La obtendrías con `useParams` en el layout y la pasarías hasta aquí.
export interface NavbarProps {
  onMenuButtonClick: () => void;
  locale?: string;
}