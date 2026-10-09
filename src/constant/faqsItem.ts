import { UI_COLORS } from "./colors";

export interface SubAccordionData {
  id: string;
  title: string;
  content: string;
}

export interface AccordionData {
  id: string;
  title: string;
  content: string;
  bgColor: any;
  borderColor: string;
  subItems?: SubAccordionData[];
}

export interface CustomAccordionProps {
  items: AccordionData[];
}

export const FAQs_ITEM: AccordionData[] = [
  {
    id: "account",
    title: "Account Membership",
    content:
      "Details about account membership, registration process, and membership benefits...",
    borderColor: UI_COLORS.BORDER_COLOR.yellow,
    bgColor: UI_COLORS.PLAIN.accordionYellow,
    subItems: [
      {
        id: "multiple-devices",
        title: "Maaari ba akong maglaro using my account on multiple devices?",
        content:
          "Yes, you can use your account on multiple devices. However, please note that you can only be logged in on one device at a time for security reasons. If you log in on a new device, you will be automatically logged out from the previous device.\n\nTo switch devices:\n1. Log out from your current device\n2. Log in on your new device using your credentials\n3. Verify your identity if prompted\n\nThis security measure helps protect your account from unauthorized access.",
      },
      {
        id: "register-process",
        title: "Paano mag-Register sa Karera.Live?",
        content:
          "To register for Karera.Live:\n\n1. Visit the Karera.Live website or download the mobile app\n2. Click on 'Sign Up' or 'Register'\n3. Fill in your personal information (name, email, mobile number)\n4. Create a strong password (must contain uppercase, lowercase, numbers, and special characters)\n5. Verify your mobile number via SMS code\n6. Complete the KYC verification process by uploading required documents\n7. Make your first deposit to activate your account\n\nNote: Registration is only available to users 18 years and above.",
      },
      {
        id: "sign-in-process",
        title: "Paano mag-Sign In sa Karera.Live?",
        content:
          "To sign in to your Karera.Live account:\n\n1. Go to the Karera.Live website or open the mobile app\n2. Click 'Sign In' or 'Login'\n3. Enter your registered email address or mobile number\n4. Enter your password\n5. Complete any additional security verification if prompted\n6. Click 'Sign In'\n\nTroubleshooting:\n- If you forgot your password, click 'Forgot Password' to reset it\n- If your account is locked, contact customer support\n- Clear your browser cache if you encounter loading issues",
      },
      {
        id: "age-requirement",
        title: "Ano ang age requirement to play on Karera.Live?",
        content:
          "The minimum age requirement to play on Karera.Live is 18 years old. This is in compliance with Philippine gambling regulations and responsible gaming practices.\n\nAge verification requirements:\n- You must provide valid government-issued ID during KYC verification\n- Accepted IDs include: Philippine passport, driver's license, UMID, SSS ID, or voter's ID\n- Accounts found to be under 18 will be immediately suspended\n- Minors are strictly prohibited from creating accounts or participating in any gaming activities",
      },
      {
        id: "device-compatibility",
        title: "What devices can be used to access Karera.Live?",
        content:
          "Karera.Live is compatible with various devices to ensure you can play anywhere:\n\n**Mobile Devices:**\n- Android 6.0 or higher\n- iOS 12.0 or higher\n- Mobile browsers (Chrome, Safari, Firefox)\n\n**Desktop/Laptop:**\n- Windows 10 or higher\n- macOS 10.14 or higher\n- Web browsers: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+\n\n**Tablets:**\n- iPad (iOS 12.0+)\n- Android tablets (Android 6.0+)\n\nFor the best experience, we recommend using the latest version of your preferred browser and ensuring a stable internet connection.",
      },
      {
        id: "other-countries",
        title: "Available ba ang Karera.Live in other countries?",
        content:
          "Karera.Live is currently licensed and available exclusively in the Philippines. We operate under the jurisdiction of Philippine gaming regulations.\n\n**Restricted Countries:**\n- Access is geo-blocked for users outside the Philippines\n- VPN usage to bypass geo-restrictions is strictly prohibited\n- Accounts detected using VPNs will be suspended\n\n**Travel Policy:**\n- If you're a registered Philippine resident traveling abroad, contact customer support before traveling\n- Temporary access may be granted for verified Philippine residents\n- You must return to Philippine territory to resume normal account access",
      },
      {
        id: "multiple-accounts",
        title: "Maaari ba akong magkaroon ng multiple accounts?",
        content:
          "No, creating multiple accounts is strictly prohibited. Each person is allowed only ONE Karera.Live account.\n\n**Account Policy:**\n- Only one account per person, household, IP address, and device\n- Duplicate accounts will be immediately closed\n- Any winnings from duplicate accounts may be forfeited\n- Bonuses and promotions are limited to one per person\n\n**Consequences of Multiple Accounts:**\n- Permanent account closure\n- Forfeiture of funds and winnings\n- Ban from future registration\n- Legal action may be taken for fraudulent activity\n\nIf you forgot your account details, use the account recovery option instead of creating a new account.",
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Number",
    content:
      "How to update your mobile number, verification process, and mobile-related settings...",
    borderColor: UI_COLORS.BORDER_COLOR.green,
    bgColor: UI_COLORS.PLAIN.accordionGreen,
  },
  {
    id: "password",
    title: "Sign In Password",
    content:
      "Change your password, password requirements, and security best practices...",
    borderColor: UI_COLORS.BORDER_COLOR.red,
    bgColor: UI_COLORS.PLAIN.accordionRed,
  },
  {
    id: "wallet",
    title: "Wallet PIN",
    content:
      "Wallet security details, PIN setup, and how to reset your wallet PIN...",
    borderColor: UI_COLORS.BORDER_COLOR.orange,
    bgColor: UI_COLORS.PLAIN.accordionOrange,
  },
  {
    id: "transactions",
    title: "Transaction History",
    content:
      "View all transactions, download statements, and understand transaction details...",
    borderColor: UI_COLORS.BORDER_COLOR.blue,
    bgColor: UI_COLORS.PLAIN.accordionBlue,
  },
  {
    id: "deposit",
    title: "Deposit and Withdrawal",
    content:
      "How to deposit and withdraw funds, processing times, and available payment methods...",
    borderColor: UI_COLORS.BORDER_COLOR.purple,
    bgColor: UI_COLORS.PLAIN.accordionPurple,
  },
  {
    id: "kyc",
    title: "Know-Your-Customer (KYC)",
    content:
      "KYC verification steps, required documents, and verification timeline...",
    borderColor: UI_COLORS.BORDER_COLOR.yellow,
    bgColor: UI_COLORS.PLAIN.accordionYellow,
  },
];
