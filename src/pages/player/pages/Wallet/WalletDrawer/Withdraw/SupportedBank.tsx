import Modal from "@/components/Modal";
import Text from "@/components/Text";
import Divider from "@/components/Divider";
import Image from "@/components/Image";
import { useWalletStore } from "@/store/player/useWalletStore";

const banks = [
  "G-Xchange, Inc. (GCash)",
  "GrabPay",
  "Maya Bank, Inc.",
  "ShopeePay Philippines, Inc.",
  "Asia United Bank Corporation",
  "Bank of the Philippine Islands",
  "BDO Unibank, Inc.",
  "Metropolitan Bank and Trust Co.",
  "Union Bank of the Philippines",
];

const SupportedBank = () => {
  const { setShowSupportedBank, showSupportedBank } = useWalletStore();

  const renderList = () =>
    banks.map((bank, index) => (
      <div key={index} className="flex gap-6 border-b border-[#d9d9d9] py-3">
        <Image path="/icons/check.png" className="h-[15px] object-contain" />
        <Text text={bank} color="#1a1a1a" type="p1" weight="medium" />
      </div>
    ));

  return (
    <div>
      <Modal
        isOpen={showSupportedBank}
        type="custom"
        parentStyle="w-[90vw]"
        hasClose={true}
        closeModal={() => setShowSupportedBank(false)}
      >
        <Text text="Supported Banks & e-Wallets" type="h8" color="#00A24A" />
        <Divider width="100%" />
        <Text
          text="Here are some banks and e-wallets that accept QRPh as a payment method."
          type="h8"
          color="#5B5B5B"
        />
        {renderList()}
      </Modal>
    </div>
  );
};

export default SupportedBank;
