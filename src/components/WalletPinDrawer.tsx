import CustomDrawer from "@/pages/player/components/Drawer";
import React, {
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from "react";
import Image from "./Image";
import Text from "./Text";
import PinInputFields from "@/pages/player/pages/Wallet/WalletDrawer/WalletPin/PinInputFields";
import PinKeypad from "@/pages/player/pages/Wallet/WalletDrawer/WalletPin/PinKeypad";
import { Button } from "./ui/button";

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
  pins: string[];
  setPins: Dispatch<SetStateAction<string[]>>;
  inputRefs: RefObject<(HTMLInputElement | null)[]>;
  onSubmit: () => void;
};

const WalletPinDrawer = ({
  show,
  inputRefs,
  onSubmit,
  pins,
  setPins,
  setShow,
}: Props) => {
  return (
    <CustomDrawer showDrawer={show} setShowDrawer={setShow}>
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

export default WalletPinDrawer;
