import { NormalView } from "../networks/components/NormalView";
import { networkData } from "@/constant/operator/commission";

export const PlayerNetwork = () => {
  const players = networkData.filter((item) => item.type === "player");

  return (
    <div>
      <NormalView items={players} />
    </div>
  );
};
