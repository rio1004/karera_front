export interface GameCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  hot?: boolean;
  onClick?: () => void;
}

export interface GameBannerProps {
  title: string;
  subtitle?: string;
  ctaButton?: {
    text: string;
    onClick?: () => void;
  };
  imageSrc: string;
}

export type TicketPayload = {
  sessionId: string;
  gameId: string;
};

export type TicketResponse = {
  ticket: {
    transactionDate: string;
    bets: {
      choice: string;
      amount: string;
    };
    representativeId: string;
    ticketNumber: string;
    siteName: string;
  };
};
export type GameSite = { id: string; name: string; description: string };

export type GameSiteList = GameSite[];
