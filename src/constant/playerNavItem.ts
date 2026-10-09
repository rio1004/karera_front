import { Gift, Home, Wallet2 } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  hasNotification?: boolean;
}

export const PLAYER_NAVIGATION_ITEMS: NavItem[] = [
  { id: "lobby", label: "Lobby", icon: Home, isActive: true },
  { id: "wallet", label: "Wallet", icon: Wallet2 },
  { id: "gift", label: "Promotion", icon: Gift },
];
