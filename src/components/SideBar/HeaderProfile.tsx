import { useEffectiveType } from "@/hooks/common/useEffectiveType";
import { useAuthStore } from "@/store/auth/useAuth";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const HeaderProfile = () => {
  const effectiveType = useEffectiveType();
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const renderProfileInfo = () => {
    if (effectiveType == "operator") {
      return (
        <div className="flex flex-col justify-center">
          <p className="text-primary text-[20px]">{user?.userName}</p>
          <p className="text-light-gray text-[12px] ">
            Operator ID: {user?.id}
          </p>
        </div>
      );
    }

    return (
      <div>
        <p className="text-success text-[16px]">{user?.userName}</p>
        <p className="text-gray text-[14px]">{user?.mobile}</p>
        <div className="flex items-center gap-2">
          <p className="text-light-gray text-[12px] ">User ID: {user?.id}</p>
          <button
            type="button"
            onClick={() => handleCopy(user?.id?.toString() || "")}
            className="text-light-gray hover:text-primary transition"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-5">
      <div>
        <div className="relative">
          <img
            src="/sideBarAssets/profile.png"
            alt=""
            className="h-[65px] w-[65px] object-contain"
          />
          <img
            src="/sideBarAssets/camera.png"
            alt=""
            className="h-[20px] absolute bottom-0 right-0"
          />
        </div>
      </div>
      {renderProfileInfo()}
    </div>
  );
};

export default HeaderProfile;
