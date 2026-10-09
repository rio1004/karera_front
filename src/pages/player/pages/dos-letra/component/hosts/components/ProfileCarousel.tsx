import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { ProfileCard } from "./ProfileCard";
import { LikedHostModal } from "./LikedHostsModal";
import type { Profile } from "@/types/host/host";
import { useHostsStore } from "@/store/moderator/useHostStore";

interface ModalState {
  isOpen: boolean;
  profile: Profile | null;
  action: "like" | "unlike";
}

export function ProfileCarousel() {
  const { fetchHosts, hosts } = useHostsStore();
  const [likedProfiles, setLikedProfiles] = useState<Set<string | number>>(
    new Set()
  );

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    profile: null,
    action: "like",
  });

  useEffect(() => {
    fetchHosts();
  }, []);

  const mapHostToProfile = (host: any): Profile => ({
    id: parseInt(host.id) || host.id,
    name: `${host.lastName}`,
    location:
      host.profile?.meta?.location ||
      host.profile?.permanentAddress ||
      "Not specified",
    birthday:
      host.profile?.meta?.birthDate ||
      host.profile?.birthDate ||
      host.birthDate ||
      null,
    zodiac: host.profile?.meta?.zodiac || null,
    talent: host.profile?.meta?.talent || null,
    image:
      host.profile?.profilePictureUrl ||
      host.profile?.profilePicture ||
      "/default-avatar.jpg",
    badge: "",
    likes: 0,
  });

  const toggleLike = (profileId: string | number) => {
    setLikedProfiles((prev) => {
      const updated = new Set(prev);
      if (updated.has(profileId)) {
        updated.delete(profileId);
      } else {
        updated.add(profileId);
      }
      return updated;
    });
  };

  const handleShowModal = (
    profile: Profile,
    action: "like" | "unlike" | "close"
  ) => {
    if (action === "close") {
      handleCloseModal();
      return;
    }
    if (action === "like") {
      toggleLike(profile.id);
      setModalState({ isOpen: true, profile, action });
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } else if (action === "unlike") {
      setModalState({ isOpen: true, profile, action });
    }
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, profile: null, action: "like" });
  };

  const handleConfirmAction = () => {
    if (modalState.profile && modalState.action === "unlike") {
      toggleLike(modalState.profile.id);
    }
    handleCloseModal();
  };

  if (!hosts || hosts.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">No hosts available.</p>
      </div>
    );
  }

  console.log("HOSTS", hosts);

  return (
    <section>
      <Carousel className="w-full">
        <CarouselContent>
          {hosts.map((host) => {
            const profile = mapHostToProfile(host);
            return (
              <CarouselItem key={host.id}>
                <ProfileCard
                  profile={profile}
                  isLiked={likedProfiles.has(profile.id)}
                  onToggleLike={() => toggleLike(profile.id)}
                  onShowModal={handleShowModal}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {modalState.profile && (
        <LikedHostModal
          open={modalState.isOpen}
          onClose={handleCloseModal}
          name={modalState.profile.name}
          image={modalState.profile.image}
          action={modalState.action}
          onConfirm={handleConfirmAction}
        />
      )}
    </section>
  );
}
