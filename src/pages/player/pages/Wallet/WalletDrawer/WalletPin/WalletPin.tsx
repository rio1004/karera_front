import { useRef } from "react";
import Image from "@/components/Image";
import Text from "@/components/Text";
import CustomDrawer from "@/pages/player/components/Drawer";
import { useWalletStore } from "@/store/player/useWalletStore";
import PinInputFields from "./PinInputFields";
import PinKeypad from "./PinKeypad";
import { Button } from "@/components/ui/button";
import type { PinResponse } from "@/types/player/wallet";
import { WalletServices } from "@/api/services/wallet.service";
import { popup } from "@/components/PopupManager";

const WalletPin = () => {
  const {
    showWalletPin,
    setShowWalletPin,
    pins,
    setPins,
    setShowDrawer,
    setShowConfirmWithdraw,
  } = useWalletStore();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const onSubmit = async () => {
    try {
      const res: PinResponse = await WalletServices.verifyWalletPin({
        pin: pins.join(""),
      });
      if (res.message) {
        setShowDrawer(true);
        setShowConfirmWithdraw(true);
        setShowWalletPin(false);
      }
    } catch (error: any) {
      popup.error(error);
    } finally {
      setPins(["", "", "", ""]);
    }
  };
  return (
    <CustomDrawer showDrawer={showWalletPin} setShowDrawer={setShowWalletPin}>
      <div className="p-5 flex flex-col gap-5">
        <Image path="/icons/lock.png" className="h-[50px] object-contain" />
        <Text
          type="h8"
          text="Enter your 4-Digit Wallet PIN"
          color="#1a1a1a"
          weight="bold"
        />
        <PinInputFields pins={pins} inputRefs={inputRefs} />
        <PinKeypad pins={pins} setPins={setPins} inputRefs={inputRefs} />
        <Button variant={"green"} onClick={onSubmit} type="button">
          Confirm
        </Button>{" "}
        <Text text="Forgot Wallet PIN?" color="#2196F3" type="p1" />
      </div>
    </CustomDrawer>
  );
};

export default WalletPin;
