import { Button } from "@/components/ui/button";

interface LikeButtonProps {
  isLiked: boolean;
  onClick: () => void;
}

export const LikeButtonAlt = ({ isLiked, onClick }: LikeButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={isLiked ? "destructive" : "default"}
      className={`rounded-full font-semibold text-sm transition-all duration-200 transform hover:scale-105 shadow-md active:scale-95 min-w-[90px] ${
        isLiked
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"
      }`}
    >
      {isLiked ? "❤️ Liked" : "👍 Like"}
    </Button>
  );
};
