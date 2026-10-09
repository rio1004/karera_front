export interface BottomNavProps {
  icon: string;
  label: string;
  to?: string;
  isWallet?: boolean;
  onClick?: () => void;
}
