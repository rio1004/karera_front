import Image from "@/components/Image";
import Text from "@/components/Text";
import { useEffect, useRef, useState } from "react";
import PinInputFields from "../../WalletDrawer/WalletPin/PinInputFields";
import PinKeypad from "../../WalletDrawer/WalletPin/PinKeypad";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { useWallet } from "@/hooks/player/useWallet";
import { useWalletStore } from "@/store/player/useWalletStore";
import { Link, useNavigate } from "react-router-dom";
import { ICONS } from "@/constant/image";
import { useEffectiveType } from "@/hooks/common/useEffectiveType";

const UpdateWalletPin = () => {
  const { updateWalletPin, verifyWalletPin, isLoading } = useWallet();
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const effectiveType = useEffectiveType();
  const navigate = useNavigate();
  const {
    showSuccessUpdatePin,
    setShowSuccessUpdatePin,
    isPinVerified,
    pins,
    setPins,
  } = useWalletStore();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePinAction = async () => {
    const apiCall = isPinVerified ? updateWalletPin : verifyWalletPin;
    await apiCall({ pin: pins.join("") });
  };

  const handleCloseModal = () => {
    setShowSuccessUpdatePin(false);
    navigate("/player");
  };

  useEffect(() => {
    if (effectiveType === "operator") {
      setShowForgotModal(true);
    }
  }, [effectiveType]);

  return (
    <>
      <Modal
        type="custom"
        isOpen={showForgotModal}
        parentStyle="shadow-[0_4px_20px_rgba(255,228,0,0.2)] w-[80vw] max-w-[300px] text-[16px] font-[regular] bg-gradient-to-b from-[#FFFBD6] via-[#FFFCDF] to-[#FFFFFF]"
        modalAction={() => setShowForgotModal(false)}
        btnVariant={"green"}
        btnText="Okay"
      >
        <div className="relative ">
          <div className="absolute flex justify-center -top-[150px] w-full">
            <img
              src={ICONS.info_light_bulb.src}
              className="h-[130px] object-contain"
            />
          </div>
          <div className="flex flex-col items-center gap-7 mt-[50px]">
            <Text
              text="Forgot your Password or PIN? "
              type="p1"
              weight="bold"
            />
            <p className="text-center">
              No worries! Send us a message at{" "}
              <span className="text-[#7F631A] font-bold">
                support@karera.live.
              </span>{" "}
            </p>
            <Text text="We're here to help!" type="p1" />
          </div>
        </div>
      </Modal>
      <Modal
        type="bare"
        isOpen={showSuccessUpdatePin}
        hasBtn={true}
        headerImage="/icons/info.png"
        textContent="You have successfully changed your PIN!"
        textContent_2={
          <> You can change your wallet PIN only once every 24 hours.</>
        }
        parentStyle="w-[80vw] max-w-[300px] text-[16px] font-[regular]"
        modalAction={handleCloseModal}
        btnVariant={"green"}
        btnText="Okay"
        submit={handleCloseModal}
      />
      <div className="flex flex-col gap-2">
        <Image path="/icons/lock.png" className="h-[50px]" />
        <Text text="Change your Wallet PIN" type="h8" color="#1a1a1a" />
        <Text
          text={`Enter your ${
            isPinVerified ? "NEW" : "OLD"
          } 4-Digit Wallet PIN.`}
          type="p1"
          color="#5B5B5B"
        />
      </div>
      <PinInputFields pins={pins} inputRefs={inputRefs} classname="mt-3" />
      <PinKeypad inputRefs={inputRefs} pins={pins} setPins={setPins} />
      <div className="flex flex-col gap-4">
        <Button
          variant={"green"}
          onClick={handlePinAction}
          disabled={isLoading}
        >
          Change
        </Button>
        <Link to={"/player/wallet/pin/forgot"} className="mt-4">
          <Text text="Forgot Wallet PIN?" type="p1" url className="mt-4" />
        </Link>
      </div>
    </>
  );
};

export default UpdateWalletPin;
