import Modal from "@/components/Modal";
import { GaminGuidelines } from "@/constant/TermsAndConditions";
import { usePlayerStore } from "@/store/player/usePlayerStore";
import { X } from "lucide-react";

const ResponsibleGaming = () => {
  const { showResponsible, setShowResponsible } = usePlayerStore();
  return (
    <div>
      <Modal
        type="custom"
        isOpen={showResponsible}
        contentStyle=" !font-[Roboto] relative text-justify"
      >
        <div
          className="absolute top-0 right-0"
          onClick={() => setShowResponsible(false)}
        >
          <X color="#000" />
        </div>
        <p className="text-[22px] font-semibold text-center">
          Responsible Gaming
        </p>
        <p className="text-[22px] font-semibold text-center">Guidelines</p>
        <div className="max-h-[600px] overflow-y-auto">
          {" "}
          <div className="flex flex-col gap-2 mt-4">
            {GaminGuidelines.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <p className="font-medium text-[13px]">{item.header}</p>
                {item.descriptions.map((desc, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <p className="text-[13px]">{desc.list_desc}</p>
                    {desc.bullets?.map((bullet, j) => (
                      <p key={j} className="text-[13px] ml-4">
                        • {bullet}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ResponsibleGaming;
