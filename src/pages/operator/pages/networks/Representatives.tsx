import { NormalView } from "../networks/components/NormalView";
import { networkData } from "@/constant/operator/commission";

const RepresentativeNetwork = () => {
  const representatives = networkData.filter(
    (item) => item.type === "representative"
  );

  return (
    <div className="min-h-screen ">
      <div className="max-w-md mx-auto">
        <NormalView items={representatives} />
      </div>
    </div>
  );
};

export default RepresentativeNetwork;
