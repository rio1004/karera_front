import { OPERATOR_ICON } from "@/constant/image";
import NetCard from "../../components/NetCard";
import HeaderTitle from "../../components/HeaderTitle";

export const NetworkPage = () => {
  return (
    <section>
      <div>
        <HeaderTitle icon={OPERATOR_ICON.network.src} label="My Network" />

        <NetCard
          active={100}
          borderColor="#1DD5E6"
          goTo="representatives"
          inactive={200}
          label="Representatives"
          total={500}
        />
        <NetCard
          active={340}
          borderColor="#FFEA00"
          goTo="player"
          inactive={200}
          label="Direct Players"
          total={500}
        />
      </div>
    </section>
  );
};
