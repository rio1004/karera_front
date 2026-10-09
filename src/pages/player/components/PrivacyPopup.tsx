import Modal from "@/components/Modal";
import Text from "@/components/Text";
import { PrivacyPolicy } from "@/constant/TermsAndConditions";
import { usePlayerStore } from "@/store/player/usePlayerStore";
import { X } from "lucide-react";

const PrivacyPopup = () => {
  const { showPrivacy, setShowPrivacy } = usePlayerStore();
  return (
    <div>
      <Modal
        type="custom"
        isOpen={showPrivacy}
        contentStyle=" !font-[Roboto] relative text-justify"
      >
        <div
          className="absolute top-0 right-0"
          onClick={() => setShowPrivacy(false)}
        >
          <X color="#000" />
        </div>
        <Text text="Privacy Policy" type="h7" weight="medium" />

        <div className="max-h-[600px] overflow-y-auto">
          {" "}
          <div className="flex flex-col gap-2 mt-4">
            {PrivacyPolicy.map((item) => (
              <div className="flex flex-col gap-2">
                <p className="font-medium text-[13px]">{item.header}</p>
                <p className="text-[13px] text-justify">{item.description}</p>
                {item?.nestedLetters?.map((item) => (
                  <ul className="text-[13px]">
                    <li>
                      <p>{item.title}</p>
                      <p className="mb-2">{item.description}</p>
                      {item.descList.map((item) => (
                        <p>{item}</p>
                      ))}
                    </li>
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PrivacyPopup;
