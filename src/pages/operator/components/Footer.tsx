import { OPERATOR_ICON } from "@/constant/image";
import { useNavigate } from "react-router-dom";

const tabs = [
  {
    icon: OPERATOR_ICON.dashboard.src,
    alt: OPERATOR_ICON.dashboard.alt,
    title: "Dashboard",
    to: "/operator",
  },
  {
    icon: OPERATOR_ICON.commision.src,
    alt: OPERATOR_ICON.commision.alt,
    title: "Commission",
    to: "/operator/commission",
  },
  {
    icon: OPERATOR_ICON.walletOp.src,
    alt: OPERATOR_ICON.walletOp.alt,
    title: "Wallet",
    to: "/operator/wallet",
  },
  {
    icon: OPERATOR_ICON.network.src,
    alt: OPERATOR_ICON.network.alt,
    title: "Network",
    to: "/operator/network",
  },
];

const Footer = () => {
  const navigate = useNavigate();

  const renderTab = () =>
    tabs.map((item) => (
      <div
        className="flex flex-col items-center text-gray-400"
        onClick={() => navigate(item.to)}
      >
        <img src={item.icon} className="w-8 h-8" alt={item.alt} />
        <span className="text-[10px]">{item.title}</span>
      </div>
    ));

  return (
    <div>
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-3 text-sm">
        {renderTab()}
      </footer>
    </div>
  );
};

export default Footer;
