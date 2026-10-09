import Text from "@/components/Text";
import { ICONS } from "@/constant/image";
import CustomDrawer from "@/pages/player/components/Drawer";
import { useDosLetraStore } from "@/store/player/useDosLetraStore";
import { X } from "lucide-react";
import BadgeCard from "./BadgeCard";

const BadgesDrawer = () => {
  const { showBadgeDrawer, setShowBadgeDrawer } = useDosLetraStore();
  return (
    <div>
      <CustomDrawer
        setShowDrawer={setShowBadgeDrawer}
        showDrawer={showBadgeDrawer}
        style={{
          background: "url('/DosLetra/gameHistoryBackground.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="px-5 pt-5 pb-0">
          <div className="pb-5">
            <div className="w-full flex justify-end">
              <X
                className="text-right"
                size={21}
                strokeWidth={3}
                onClick={() => setShowBadgeDrawer(false)}
              />
            </div>
            <Text
              text="How To Earn Karera Badges?"
              type="h8"
              weight="semiBold"
            />
          </div>

          <div className="overflow-y-auto max-h-[80vh] pb-[20vh] space-y-5">
            {" "}
            <BadgeCard
              badgeIcon={ICONS.vipBadge.src}
              title="VIP Badge"
              description={
                <>
                  Players who have bet a total of{" "}
                  <span className="font-semibold">₱500,000+</span> within one
                  month.
                </>
              }
              chatBoxDuration="6 months"
              frameDuration="6 months"
              profileFrameIcon="/dosLetraAssets/gift/profile.png"
              username="Let's go!"
              bgHighligthColor="#4F2787A6"
              textColor="#4F2787"
            />
            <BadgeCard
              badgeIcon={ICONS.frontRunner.src}
              title="Front-Runner Badge"
              description={
                <>
                  Players who have played{" "}
                  <span className="font-semibold">300 rounds</span> per week.
                </>
              }
              chatBoxDuration="7 days"
              username="Let's go!"
              bgHighligthColor="#FE6100B5"
              textColor="#FE6100"
            />
            <BadgeCard
              badgeIcon={ICONS.loyaltyBadge.src}
              title="Loyalty Badge"
              description={
                <>
                  Players who open Karera Live daily, from{" "}
                  <span className="font-semibold">Monday to Sunday.</span>
                </>
              }
              chatBoxDuration="7 days"
              username="Let's go!"
              bgHighligthColor="#59D7FF"
              textColor="#00C2FF"
            />
            <BadgeCard
              badgeIcon={ICONS.masterBadge.src}
              title="Loyalty Badge"
              description={
                <>
                  <span className="font-semibold">
                    Monthly Top 10 Generous Givers{" "}
                  </span>
                  who sent gifts to our awesome hosts.
                </>
              }
              chatBoxDuration="7 days"
              username="Let's go!"
              bgHighligthColor="#3DB875"
              textColor="#00A24A"
            />
          </div>
        </div>
      </CustomDrawer>
    </div>
  );
};

export default BadgesDrawer;
