import { Heart, MapPin } from "lucide-react";
import { ProfileImage } from "./ProfileImage";
import { ProfileField } from "./ProfileField";
import { LikeButtonAlt } from "./LikeButton";
import type { Profile } from "@/types/host/host";
import { useAuthStore } from "@/store/auth/useAuth";
import { useRoomStore } from "@/store/host/useRoomStore";

interface ProfileCardProps {
  profile: Profile;
  isLiked: boolean;
  onToggleLike: () => void;
  onShowModal: (profile: Profile, action: "like" | "unlike" | "close") => void;
}

export const ProfileCard = ({
  profile,
  isLiked,
  onToggleLike,
  onShowModal,
}: ProfileCardProps) => {
  const { user } = useAuthStore();
  const { likeHost } = useRoomStore();

  const handleLikeClick = async () => {
    const userId = user?.id;
    const hostId = profile.id;

    if (!userId || !hostId) {
      console.warn("User ID or Host ID is missing.");
      return;
    }
    const action = isLiked ? "unlike" : "like";
    try {
      if (!isLiked) {
        await likeHost(userId, String(hostId));
        onToggleLike();
      }
      onShowModal(profile, action);
    } catch (error) {
      console.error("Error liking host:", error);
    }
  };

  return (
    <article className="bg-white border border-2-black rounded-tr-[5rem] rounded-bl-[5rem]  flex h-[32vh]">
      <div className="flex p-6 w-full justify-center">
        <div className="flex justify-center py-8 w-full">
          <ProfileImage
            image={profile.image || "/default-avatar.jpg"}
            name={profile.name}
            badge={profile.badge}
          />
        </div>

        <div className="p-6">
          <header className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              {profile.name}
            </h2>
          </header>

          <div className="space-y-2">
            <ProfileField
              icon={<MapPin className="w-4 h-4 text-red-500 fill-red-500" />}
              label={profile.location || "Not specified"}
            />

            <ProfileField
              icon="🎂"
              label={
                profile.birthday
                  ? new Date(profile.birthday).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                    })
                  : "Not specified"
              }
            />
            <ProfileField icon="✨" label={profile.zodiac || "Not specified"} />
            <ProfileField icon="💃" label={profile.talent || "Not specified"} />
          </div>

          <footer className="flex items-center gap-2 justify-between mt-4">
            <div className="flex items-center gap-1">
              <Heart
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                aria-hidden
              />
              <span
                className="text-xl font-bold text-red-500"
                aria-label={`${profile.likes || 0} likes`}
              >
                {profile.likes}
              </span>
            </div>

            <button
              onClick={handleLikeClick}
              className={`py-2 px-6 rounded-full font-normal transition-colors duration-200 ${
                isLiked
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-yellow-400 hover:bg-yellow-500 text-[#7F631A]"
              }`}
            >
              {isLiked ? "Liked" : "Like"}
            </button>
          </footer>
        </div>
      </div>
    </article>
  );
};
