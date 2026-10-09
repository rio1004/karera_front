import { create } from "zustand";
import birthdayBente from "../../../src/assets/promo-birthday-bente.png";
import get20 from "../../../src/assets/promo-get-20.png";
import welcomeBonus from "../../../src/assets/promo-welcome-bonus.png";
import claimedbirthdayBente from "../../../src/assets/claimed-birthday-bente.png";
import claimedget20 from "../../../src/assets/claimed-get-20.png";
import claimedwelcomeBonus from "../../../src/assets/claimed-welcome-bonus.png";

export interface Promo {
    id: number;
    image: string;
    claimedImage?: string;
    description: string;
    textColor?: string;
    claimedDate?: string; // store claim date
  }
  
  interface PromoState {
    unclaimedPromos: Promo[];
    claimedPromos: Promo[];
    expandedPromoIds: Set<number>;
    claimPromo: (promoId: number) => void;
    togglePromoDescription: (promoId: number) => void;
  }

export const usePromoStore = create<PromoState>((set, get) => ({
  unclaimedPromos: [
    {
        id: 1,
        image: welcomeBonus,
        claimedImage: claimedwelcomeBonus,
        description: `<strong>How to qualify?</strong><br>
1. Register and login to Karera.Live.<br>
2. Make an initial deposit of at least ₱500 sa iyong Karera.Live wallet.<br>

<strong>Example:</strong>
<ul>
  <li>You've successfully registered and logged in.</li>
  <li>You've deposited at least ₱500.</li>
  <li>You get ₱20 bonus.</li>
  <li><strong>A 10x wagering requirement applies.</strong></li>
  <li>₱20 x 10 = ₱200 is the required valid turnover.</li>
  <li><strong>You need to play at least ₱200 before any withdrawals.</strong></li>
</ul>

<strong>Terms & Conditions:</strong><br>
1. This promo is exclusive for New Players.<br>
2. Available for a one-time claim only.<br>
3. Only one account per player is allowed.`,
    },
    {
        id: 2,
        image: get20,
        claimedImage: claimedget20,
        description: `<strong>How to qualify?</strong><br>
1. Register and login to Karera.Live.<br>
2. Mag-deposit ng at least ₱500.<br>
3. To refer, mag-generate ng iyong Referral QR Code. Go to your profile, at i-select ang "Refer & Earn!". Download your QR Code or copy the Referral link.<br>
4. Referral must register using your Referral QR Code.<br>

<strong>Example:</strong>
<ul>
  <li>Referral has registered successfully.<br></li>
  <li>You get ₱20 bonus.<br></li>
  <li><strong>10x wagering requirement.</strong><br></li>
  <li>₱20 x 10 = ₱200 required valid turnover.<br></li>
  <li><strong>You need to play at least ₱200 before any withdrawals.</strong><br></li>
</ul>

<strong>Terms & Conditions:</strong><br>
1. Limited to one referral.<br>
2. Only one account per player is allowed.<br>
3. Available for a one-time claim only.`,
        textColor: "white",
    },
    {
        id: 3,
        image: birthdayBente,
        claimedImage: claimedbirthdayBente,
        description: `<strong>How to qualify?</strong><br>
1. Register and login to Karera.Live.<br>
2. Make an initial deposit of at least ₱500 sa iyong Karera.Live wallet.<br>

<strong>Example:</strong>
<ul>
  <li>You've successfully registered and logged in.<br></li>
  <li>You've deposited at least ₱500.<br></li>
  <li>You get ₱20 bonus on your birthday.<br></li>
  <li><strong>A 10x wagering requirement applies.</strong><br></li>
  <li>₱20 x 10 = ₱200 required valid turnover.<br></li>
  <li><strong>You need to play at least ₱200 before any withdrawals.</strong><br></li>
</ul>

<strong>Terms & Conditions:</strong><br>
1. The promotion is valid once a year.<br>
2. Only one account per player is allowed.<br>
3. Maari lamang i-claim ang Birthday Bonus on the day of your birthday.<br>
4. If not claimed on the day of your birthday, the Birthday Bonus will be forfeited.`,
        textColor: "white",
    }
  ],

  claimedPromos: [],
  expandedPromoIds: new Set(),

  claimPromo: (promoId: number) => {
    const { unclaimedPromos, claimedPromos } = get();
    const promoToClaim = unclaimedPromos.find((p) => p.id === promoId);
    if (!promoToClaim) return;

    // set claim date when moving to claimed
    const now = new Date();
    const formattedDate = `${String(now.getMonth() + 1).padStart(2, "0")}/${String(
    now.getDate()
    ).padStart(2, "0")}/${now.getFullYear()}`;

    set({
    unclaimedPromos: unclaimedPromos.filter((p) => p.id !== promoId),
    claimedPromos: [
        ...claimedPromos,
        { ...promoToClaim, claimedDate: formattedDate },
    ],
    expandedPromoIds: new Set(),
    });
  },

  togglePromoDescription: (promoId: number) => {
    const expanded = new Set(get().expandedPromoIds);
    expanded.has(promoId) ? expanded.delete(promoId) : expanded.add(promoId);
    set({ expandedPromoIds: expanded });
  },
}));