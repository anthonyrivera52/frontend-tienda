import {
  LayoutDashboard,
  WalletCards,
  Settings,
  PersonStanding,
  User,
  Gift,
  Castle,
  MessageCircleMore,
  Home,
} from 'lucide-react';

// Map icon names to lucide-react components
export const iconMap: { [key: string]: React.ComponentType } = {
  Home: Home,
  Gift: Gift,
  Castle: Castle,
  MessageCircleMore: MessageCircleMore,
  PersonStanding: PersonStanding,
  WalletCards: WalletCards,
  User: User,
  Settings: Settings,
  LayoutDashboard: LayoutDashboard,
};