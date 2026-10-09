
import { profiles } from "@/constant/hostData";
import ProfileItems from "./ProfileItems";

const HostRanking = () => {
  return (
    <div>
      <ul className="flex justify-center gap-6">
        {profiles.slice(0, 5).map((host, index) => (
          <ProfileItems key={host.id} host={host} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default HostRanking;
