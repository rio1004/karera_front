import type { Profile } from "@/types/host/host";

interface ProfileItemsProps {
  host: Profile;
  index: number;
}

const medalColors: Record<number, string> = {
  1: "bg-yellow-400 text-white",
  2: "bg-gray-400 text-white",
  3: "bg-amber-600 text-white",
  4: "bg-gray-200 text-gray-800",
  5: "bg-gray-200 text-gray-800",
};

export function ProfileItems({ host, index }: ProfileItemsProps) {
  return (
    <li className="relative flex flex-col items-center">
      <figure className="w-12 h-12 rounded-full border-4 border-yellow-300 overflow-hidden flex items-center justify-center">
        <img
          src={host.image}
          alt={`Profile of ${host.name}`}
          className="w-full h-full object-cover"
        />
        <figcaption className="sr-only">{host.name}</figcaption>
      </figure>

      <span
        className={`absolute bottom-0 translate-y-4 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border border-white ${
          medalColors[index + 1]
        }`}
        aria-label={`Rank ${index + 1}`}
      >
        {index + 1}
      </span>
    </li>
  );
}

export default ProfileItems;
