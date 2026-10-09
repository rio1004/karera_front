import Image from "@/components/Image";
import Text from "@/components/Text";
import { useRef, useState } from "react";
import PinInputFields from "../../WalletDrawer/WalletPin/PinInputFields";
import PinKeypad from "../../WalletDrawer/WalletPin/PinKeypad";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { useWallet } from "@/hooks/player/useWallet";
import { useWalletStore } from "@/store/player/useWalletStore";
import { useNavigate } from "react-router-dom";

const CreateWalletPin = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { createWalletPIn, isLoading, checkPinStatus } = useWallet();
  const { showSuccessPin, setShowSuccessPin, pins, setPins } = useWalletStore();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCreatePin = async () => {
    await createWalletPIn({ pin: pins.join("") });
  };

  const handleSubmit = () => {
    setShowSuccessPin(false);
    checkPinStatus();
    navigate(-1);
  };

  return (
    <>
      <Modal
        type="bare"
        isOpen={isOpen}
        hasBtn={false}
        headerImage="/icons/info.png"
        textContent="Your Wallet PIN will be used for secure withdrawal transactions."
        parentStyle="w-[80vw] max-w-[300px] text-[16px] font-[regular]"
        hasClose
        closeModal={() => setIsOpen(false)}
      />
      <Modal
        type="bare"
        isOpen={showSuccessPin}
        hasBtn={true}
        headerImage="/icons/info.png"
        textContent="You have successfully created your PIN!"
        textContent_2={
          <>
            {" "}
            You can change your PIN in <br />{" "}
            <span className="font-medium">
              Account &gt; Change Wallet PIN
            </span>{" "}
          </>
        }
        parentStyle="w-[80vw] max-w-[300px] text-[16px] font-[regular]"
        modalAction={() => setShowSuccessPin(false)}
        btnVariant={"green"}
        btnText="Okay"
        submit={handleSubmit}
      />
      <div className="flex flex-col gap-2">
        <Image path="/icons/lock.png" className="h-[50px]" />
        <Text text="Create your Wallet PIN" type="h8" color="#1a1a1a" />
        <Text
          text="Set your 4-Digit Wallet PIN. It will be used for secure withdrawal transaction."
          type="p1"
          color="#5B5B5B"
        />
      </div>
      <PinInputFields pins={pins} inputRefs={inputRefs} classname="mt-3" />
      <PinKeypad inputRefs={inputRefs} pins={pins} setPins={setPins} />
      <Button variant={"green"} onClick={handleCreatePin} disabled={isLoading}>
        Create
      </Button>
    </>
  );
};

export default CreateWalletPin;
