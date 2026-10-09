export interface LetraConfig {
  bg: string;
  title: string;
  imgIcon: string;
}
export interface LetraTextsTYPE {
  gift: string;
}

export const LETRA: Record<string, LetraConfig> = {
  LETRA_A: {
    bg: "linear-gradient(180deg, #FF2020 0%, #C80000 100%)",
    title: "LETRA A",
    imgIcon: "/DosLetra/DosLetraA.png",
  },
  LETRA_B: {
    bg: "linear-gradient(180deg, #00C0FA 0%, #015EEA 100%)",
    title: "LETRA B",
    imgIcon: "/DosLetra/DosLetraB.png",
  },
} as const;

export const LETRA_TEXTS: LetraTextsTYPE = {
  gift: "Do you want to give ₱10 to our lovely host?",
};

export type LetraType = keyof typeof LETRA;
