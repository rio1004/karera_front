export const WALLET_DESTINATIONS = [
  {
    type: "load" as const,
    title: "Load",
    amount: 20000.0,
    variant: "load" as const,
  },
  {
    type: "commission" as const,
    title: "Commission",
    amount: 5000.0,
    variant: "commission" as const,
  },
] as const;

export const getCardTitle = (cardType: string): string => 
  cardType === "commission" ? "Commission" : "Game Credits";