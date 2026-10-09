import Divider from "@/components/Divider";
import Image from "@/components/Image";
import Text from "@/components/Text";
import { CSR, ICONS } from "@/constant/image";
import Clock from "./Clock";
import { useAttendanceStore } from "@/store/csr/useAttendanceStore";
import { Button } from "@/components/ui/button";
import { useAttendance } from "@/hooks/csr/useAttendance";
import type { CheckedInOutPayload } from "@/types/csr/csr";
import { useAuthStore } from "@/store/auth/useAuth";
import dayjs from "dayjs";
import Modal from "@/components/Modal";

const ProfileCard = () => {
  const { isCheckedIn, showConfirmCheckout, setShowConfirmCheckout } =
    useAttendanceStore();
  const { user } = useAuthStore();
  const { checkInOut, isLoading } = useAttendance();

  const handleCheckInOut = () => {
    const now = dayjs();
    const dateTime = now.format("YYYY-MM-DDTHH:mm:ssZ");
    const date = now.format("YYYY-MM-DD");

    const payload: CheckedInOutPayload = {
      date,
      id: user?.id,
      userId: user?.id,
      ...(!isCheckedIn ? { checkIn: dateTime } : { checkOut: dateTime }),
    };

    checkInOut(payload);
    if (showConfirmCheckout) setShowConfirmCheckout(false);
  };
  return (
    <div className="flex-3 items-center flex">
      <Modal
        type="bare"
        isOpen={showConfirmCheckout}
        btnVariant={"blue"}
        btnText="Okay"
        headerImage={ICONS.alarm.src}
        textContent="Hey there, Princess! Time to check out! 😊"
        submit={handleCheckInOut}
      />
      <div className="flex items-center flex-col justify-center border-1 px-10 py-8 shadow-md rounded-[15px] relative">
        <div className="absolute -top-[115px] left-0 flex w-full flex justify-center">
          <Image path={CSR.dummyProfile.src} className="h-[213px] w-auto" />
        </div>
        <Text
          text={`${user?.firstName} ${user?.lastName}`}
          type="h2"
          color="primary"
          className="mt-20"
        />
        <Text text="Customer Support" type="h4" color="disabled" />
        <Divider width="100%" />
        <div className="flex">
          <Text text="Status: " type="h1" color="disabled" />
          <Text
            text={isCheckedIn ? "In" : "Out"}
            type="h1"
            color={isCheckedIn ? "success" : "error"}
          />
        </div>
        <Clock />
        {!isCheckedIn ? (
          <Button
            variant={"flatGreen"}
            onClick={handleCheckInOut}
            disabled={isLoading}
          >
            Check In
          </Button>
        ) : (
          <Button
            variant={"flatRed"}
            onClick={() => setShowConfirmCheckout(true)}
            disabled={isLoading}
          >
            Check Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
