import { LOGIN_ASSETS } from "@/constant/image";
import CustomDrawer from "./Drawer";
import Image from "@/components/Image";
import { Termstext } from "@/constant/TermsAndConditions";
import Divider from "@/components/Divider";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/player/usePlayerStore";
import { useState } from "react";

const TermsAndCondDrawer = () => {
  const {
    showTerms,
    setShowTerms,
    setShowTOU,
    setShowPrivacy,
    setShowResponsible,
  } = usePlayerStore();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleAccept = () => {
    setShowTerms(isChecked);
  };

  return (
    <CustomDrawer showDrawer={!showTerms} setShowDrawer={() => {}} hasClose>
      <div className="p-5 flex flex-col gap-4  max-h-[80vh]">
        <div className="overflow-y-auto">
          <Image
            path={LOGIN_ASSETS.pagcorLogoModerator.src}
            className="h-[71px]"
          />
          <p>
            The following personalities are{" "}
            <span className="font-bold text-[#BD0000]">NOT ALLOWED</span> to
            register and/or play in this online gaming website:
          </p>
          <ul className="list-disc list-outside pl-6 space-y-2">
            {Termstext.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="font-bold">{Termstext.text2}</p>
          <p>{Termstext.text3}</p>
          <Divider width="100%" />
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <p className="text-[14px]">
              I have read and agree to the{" "}
              <span
                className="underline text-[#2196F3]"
                onClick={() => setShowTOU(true)}
              >
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span
                className="underline text-[#2196F3]"
                onClick={() => setShowPrivacy(true)}
              >
                {" "}
                Privacy Policy.
              </span>
            </p>
          </div>{" "}
          <div className="px-6">
            <Button
              variant={isChecked ? "green" : "disable"}
              onClick={handleAccept}
            >
              ACCEPT
            </Button>
          </div>
          <p className="text-[14px] text-center">
            Please read our{" "}
            <span
              className="underline text-[#2196F3]"
              onClick={() => setShowResponsible(true)}
            >
              Responsible Gaming
            </span>{" "}
            guidelines carefully.
          </p>
        </div>
      </div>
    </CustomDrawer>
  );
};

export default TermsAndCondDrawer;
