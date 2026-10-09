import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEKYCStore } from "@/store/player/useEKYCStore";
import { useEffect, useState } from "react";
import { base64ToFile } from "@/utils/utils.helper";
import { useEkycHook } from "@/hooks/player/useEkyc";
import { popup } from "@/components/PopupManager";
import Modal from "@/components/Modal";

const ConfirmSelfie = () => {
  const { capturedImage, frontImage, backImage } = useEKYCStore();
  const [btnText, setBtnText] = useState<string>("Save");
  const [successSelfie, setSuccessSelfie] = useState<boolean>(false);
  const { uploadById, uploadBySelfie } = useEkycHook();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from;
  const image = from?.includes("front")
    ? frontImage
    : from?.includes("back")
    ? backImage
    : capturedImage;

  const handleSubmit = async () => {
    if (from?.includes("front")) {
      navigate("/player/ekyc-settings/upload-id/back");
    }
    if (from?.includes("back")) {
      navigate("/player/ekyc-settings/personal-information");
    }
    console.log(from);
    if (from?.includes("selfie")) {
      if (capturedImage) {
        const selfie = base64ToFile(capturedImage, "selfie-id.jpeg");

        const { success } = await uploadBySelfie({
          selfie: selfie,
        });
        if (success) {
          setSuccessSelfie(true);
          // navigate("/player/ekyc-settings/personal-information");
        }
      } else {
        popup.error("Missing images, cannot convert.");
      }
    }
  };

  const handleCloseModal = () => {
    setSuccessSelfie(false);
    navigate("/player/");
  };
  useEffect(() => {
    if (from?.includes("upload-id")) {
      setBtnText("Proceed");
    }
  }, [from]);
  return (
    <div className="flex items-center gap-[70px] justify-center flex-col absolute top-0 left-0 h-full w-full bg-[#D9D9D9] px-[35px]">
      <Modal
        type="bare"
        isOpen={successSelfie}
        hasBtn={true}
        headerImage="/icons/check_2.png"
        textContent="Great, all set!"
        textContent_2="You have successfully registered! Please wait within 24-72 hours for the review of your eKYC application."
        parentStyle="w-[80vw] max-w-[300px] text-[16px] font-[regular]"
        modalAction={() => setSuccessSelfie(false)}
        btnVariant={"green"}
        btnText="Let's Go!"
        submit={handleCloseModal}
      />
      <div className="w-full">
        <img
          src={image}
          alt=""
          className="border-2 border-[#00A24A] rounded-[20px] w-full"
        />
      </div>
      <div className="w-full flex flex-col gap-5">
        <Button variant={"outlineGreen"} onClick={() => navigate(-1)}>
          Retake
        </Button>
        <Button variant={"green"} onClick={handleSubmit}>
          {btnText}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmSelfie;
