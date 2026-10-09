import WalletPinDrawer from "@/components/WalletPinDrawer";
import { useOperatorWalletStore } from "@/store/operator/useWalletStore";
import { useRef, useState } from "react";

const SendReqWalletPinDrawer = () => {
  const [pins, setPins] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { showSendPin, setShowSendPin } = useOperatorWalletStore();

  const handleSubmit = () => {
    console.log("TesT");
  };
  return (
    <div>
      <WalletPinDrawer
        inputRefs={inputRefs}
        onSubmit={handleSubmit}
        pins={pins}
        setPins={setPins}
        setShow={setShowSendPin}
        show={showSendPin}
      />
    </div>
  );
};

export default SendReqWalletPinDrawer;
