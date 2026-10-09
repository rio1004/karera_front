import { UI_COLORS } from "@/constant/colors";
import { ICONS, OPERATOR_ICON } from "@/constant/image";
import type { Role } from "@/constant/roles";
import RepresentativeCommission from "@/pages/operator/pages/commission/RepresentativeCommission";
import EKYC from "@/pages/player/pages/ekyc";
import ConfirmSelfie from "@/pages/player/pages/ekyc/steps/ConfirmSelfie";
import TypeDocument from "@/pages/player/pages/ekyc/steps/DocumentType";
import PersonalInformation from "@/pages/player/pages/ekyc/steps/PersonalInformation";
import Selfie from "@/pages/player/pages/ekyc/steps/Selfie";
import UploadID from "@/pages/player/pages/ekyc/steps/UploadID";
import UploadSelfie from "@/pages/player/pages/ekyc/steps/UploadSelfie";

import Inbox from "@/pages/player/pages/messages/Inbox";
import Message from "@/pages/player/pages/messages/Message";
import FaqsPage from "@/pages/player/pages/more/faqs/FaqsPage";
import FaqsSubItemsPage from "@/pages/player/pages/more/faqs/FaqsSubItemsPage";
import { EditNickname } from "@/pages/player/pages/nickname/EditProfileName";
import OTP from "@/pages/player/pages/otp";
import EditProfilePhoto from "@/pages/player/pages/photo/EditProfilePhoto";
import LinkBank from "@/pages/player/pages/Wallet/LinkBank";
import CreateWalletPin from "@/pages/player/pages/Wallet/WalletPin/create-wallet-pin";
import ForgotWalletPin from "@/pages/player/pages/Wallet/WalletPin/forgot-wallet-pin";
import UpdateWalletPin from "@/pages/player/pages/Wallet/WalletPin/update-wallet-pin";
import { QrCode } from "lucide-react";
import TransactionReceiptPage from "@/pages/operator/components/TransactionPage";
import OperatorTransactions from "@/pages/operator/pages/wallet/OperatorTransactions";
import OperatorCommission from "@/pages/operator/pages/commission/OperatorCommission";
import ChangePassword from "@/pages/player/pages/change-password/ChangePassword";
import Referral from "@/pages/operator/pages/referal";
import { NetworkPage } from "@/pages/operator/pages/networks/NetworkPage";
import { PlayerNetwork } from "@/pages/operator/pages/networks/Player";
import RepresentativeNetwork from "@/pages/operator/pages/networks/Representatives";
import { useOperatorStore } from "@/store/operator/useOperatorStore";
import TransactionRequest from "@/pages/operator/pages/wallet/TransactionRequest";
import PlayerCSR from "@/pages/player/pages/csr";
import { TransactionHistory } from "@/pages/player/pages/Wallet/transaction/Transaction";

type SettingsType = {
  path: string;
  title: string;
  icon?: React.ReactNode;
  bgColor?: string;
  color?: string;
  element: React.ReactNode;
  type?: Role;
  hasNoBorder?: boolean;
  bodyBG?: string;
  hasNoPadding?: boolean;
};

export const SettingsLayoutConfig = (): SettingsType[] => {
  const { expandCommission } = useOperatorStore();
  return [
    //Player pages
    {
      path: "ekyc-settings/",
      title: "KYC Setting",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <EKYC />,
    },
    {
      path: "ekyc-settings/upload-id/front",
      title: "Take an ID Photo",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <UploadID />,
    },
    {
      path: "ekyc-settings/upload-id/back",
      title: "Take an ID Photo",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <UploadID />,
    },
    {
      path: "ekyc-settings/document-type",
      title: "Select Type of Document",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <TypeDocument />,
    },
    {
      path: "ekyc-settings/personal-information",
      title: "Confirm Personal Information",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <PersonalInformation />,
    },
    {
      path: "ekyc-settings/upload-selfie",
      title: "Upload Selfie",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <UploadSelfie />,
    },
    {
      path: "ekyc-settings/upload-selfie/selfie",
      title: "Upload Selfie",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <Selfie />,
    },
    {
      path: "ekyc-settings/upload-selfie/confirm-selfie",
      title: "Confirm Selfie",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <ConfirmSelfie />,
    },
    {
      path: "ekyc-settings/upload-id/confirm-id",
      title: "Confirm ID Photo",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <ConfirmSelfie />,
    },
    {
      path: "edit-profile",
      title: "Edit Profile",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <EditProfilePhoto />,
    },
    {
      path: "edit-nickname",
      title: "Edit Profile",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      element: <EditNickname />,
    },
    {
      path: "faqs",
      title: "FAQs",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: UI_COLORS.LINEAR.red,
      color: "#fff",
      element: <FaqsPage />,
    },
    {
      path: "faqs/subItems",
      title: "FAQs",
      icon: (
        <img
          src="/sideBarAssets/card.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: UI_COLORS.LINEAR.red,
      color: "#fff",
      element: <FaqsSubItemsPage />,
    },
    {
      path: "wallet/pin/create",
      title: "Create Wallet PIN",
      icon: (
        <img src="/icons/info.png" alt="Home" className="w-[24px] h-[24px]" />
      ),
      element: <CreateWalletPin />,
    },
    {
      path: "wallet/pin/change",
      title: "Change Wallet PIN",
      icon: (
        <img src="/icons/info.png" alt="Home" className="w-[24px] h-[24px]" />
      ),
      element: <UpdateWalletPin />,
    },
    {
      path: "wallet/pin/forgot",
      title: "Forgot Wallet PIN",
      icon: (
        <img src="/icons/info.png" alt="Home" className="w-[24px] h-[24px]" />
      ),
      element: <ForgotWalletPin />,
    },
    {
      path: "wallet/link-bank",
      title: "Link a Bank Account",
      icon: (
        <img
          src="/icons/info.png"
          alt="Home"
          className="w-[24px] h-[24px] opacity-0"
        />
      ),
      bgColor: "#00A24A",
      color: "#fff",
      element: <LinkBank />,
    },
    {
      path: "otp",
      title: "Enter OTP",
      icon: (
        <img src="/icons/info.png" alt="Home" className="w-[24px] h-[24px]" />
      ),
      element: <OTP />,
    },
    {
      path: "csr",
      title: "Customer Support",
      icon: (
        <img
          src="/icons/csr-white.png"
          alt="Home"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: UI_COLORS.LINEAR.yellow,
      color: "#000",
      element: <PlayerCSR />,
    },
    {
      path: "message",
      title: "Messages",
      icon: (
        <img src={ICONS.message.src} alt="Home" className="w-[24px] h-[24px]" />
      ),
      bgColor: UI_COLORS.LINEAR.green,
      color: "#fff",
      element: <Message />,
    },
    {
      path: "message/inbox",
      title: "Messages",
      icon: (
        <img src={ICONS.trash.src} alt="Home" className="w-[24px] h-[24px]" />
      ),
      bgColor: UI_COLORS.LINEAR.green,
      color: "#fff",
      element: <Inbox />,
    },
    {
      path: "change-password",
      title: "Change Password",
      icon: (
        <img
          src={ICONS.password.src}
          alt="password"
          className="w-[24px] h-[24px]"
        />
      ),
      color: "#0000000",
      element: <ChangePassword />,
    },
    {
      path: "wallet/transaction-history",
      title: "Transaction",
      icon: (
        <img
          src={ICONS.detailReceipt.src}
          alt="password"
          className="w-[24px] h-[24px]"
        />
      ),
      color: "#000000",
      element: <TransactionHistory />,
    },

        {
      path: "wallet/transaction-receipt",
      title: "Transaction Receipt",
      icon: (
        <img
          src={OPERATOR_ICON.walletMoney.src}
          alt="password"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: "#fff",
      color: "#000000",
      element: <TransactionReceiptPage />,
      type: "player",
      hasNoBorder: true,
      bodyBG: "#FFFF",
    },

    //operator Page
    {
      path: "operator/referral-codes/",
      title: "My Referral Codes",
      icon: <QrCode className="w-[24px] h-[24px]" />,
      bgColor: "#00A24A",
      color: "#fff",
      element: <Referral />,
      type: "operator",
      hasNoBorder: true,
      bodyBG: "#00A24A",
    },

    {
      path: "operator/commission",
      title: "Commissions",
      icon: (
        <img
          src={OPERATOR_ICON.moneyBag.src}
          alt="password"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: !expandCommission ? "#fff" : "#00A24A",
      color: !expandCommission ? "#1a1a1a" : "#fff",
      element: <OperatorCommission />,
      type: "operator",
      hasNoBorder: true,
      bodyBG: "#ffff",
      hasNoPadding: true,
    },

    {
      path: "operator/network",
      title: "Network",
      icon: (
        <img
          src={OPERATOR_ICON.colorfulNetwork.src}
          alt="password"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: "#00A24A",
      color: "#fff",
      element: <NetworkPage />,
      type: "operator",
      hasNoBorder: true,
      bodyBG: "#ffff",
    },

    {
      path: "operator/network/representatives",
      title: "Representatives",
      icon: (
        <img
          src={OPERATOR_ICON.colorfulNetwork.src}
          alt="password"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: "#ffff",
      color: "#000000",
      element: <RepresentativeNetwork />,
      type: "operator",
      bodyBG: "#ffff",
    },

    {
      path: "operator/network/player",
      title: "Player",
      icon: (
        <img
          src={OPERATOR_ICON.colorfulNetwork.src}
          alt="password"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: "#ffff",
      color: "#000000",
      element: <PlayerNetwork />,
      type: "operator",
      bodyBG: "#ffff",
    },

    {
      path: "operator/commission/representative",
      title: "Commissions",
      icon: (
        <img
          src={OPERATOR_ICON.colorfulNetwork.src}
          alt="password"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: !expandCommission ? "#fff" : "#00A24A",
      color: !expandCommission ? "#1a1a1a" : "#fff",
      element: <RepresentativeCommission />,
      hasNoBorder: true,
      type: "operator",
      hasNoPadding: true,
    },
    {
      path: "operator/wallet/transaction-receipt",
      title: "Transaction Receipt",
      icon: (
        <img
          src={OPERATOR_ICON.walletMoney.src}
          alt="password"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: "#fff",
      color: "#000000",
      element: <TransactionReceiptPage />,
      type: "operator",
      hasNoBorder: true,
      bodyBG: "#FFFF",
    },

    {
      path: "operator/wallet/transactions",
      title: "Wallet Balance",
      icon: (
        <img
          src={OPERATOR_ICON.walletMoney.src}
          alt="password"
          className="w-[24px] h-[24px]"
        />
      ),
      bgColor: "#00A24A",
      color: "#ffff",
      element: <OperatorTransactions />,
      type: "operator",
      hasNoBorder: true,
      bodyBG: "#00A24A",
    },
    {
      path: "operator/wallet/pin/change",
      title: "Change Wallet PIN",
      icon: (
        <img src="/icons/info.png" alt="Home" className="w-[24px] h-[24px]" />
      ),
      type: "operator",
      element: <UpdateWalletPin />,
    },
    {
      path: "operator/wallet/transactions/request-transaction",
      title: "Request Transaction",
      icon: (
        <img src="/icons/info.png" alt="Home" className="w-[24px] h-[24px]" />
      ),
      color: "#000000",
      type: "operator",
      bodyBG: "#00A24A",
      element: <TransactionRequest />,
    },
  ];
};
