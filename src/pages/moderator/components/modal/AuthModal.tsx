import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/Modal";
import { IMAGES } from "@/constant/image";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/api/services/authApi.service";

interface AuthDrawerModalProps {
  isSignOutOpen: boolean;
  setIsSignOutOpen: (value: boolean) => void;
  isEndGameOpen: boolean;
  setIsEndGameOpen: (value: boolean) => void;
}

export default function AuthDrawerModal({
  isSignOutOpen,
  setIsSignOutOpen,
  isEndGameOpen,
  setIsEndGameOpen,
}: AuthDrawerModalProps) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("auth-storage");
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsSignOutOpen(false);
  };

  const handleEndGame = () => {
    navigate(-1);
    setIsEndGameOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isEndGameOpen}
        type="bare"
        textContent="Are you sure you want to end the game room?"
        headerImage={IMAGES.endGameIcon.src}
        hasClose
        closeModal={() => setIsEndGameOpen(false)}
        multipleBtn
        parentStyle="max-w-[300px]"
        hasParentBg={true}
        hasContentBg={true}
      >
        <div className="flex justify-center gap-4 w-full">
          <Button onClick={handleEndGame} variant="red" className="w-[120px]">
            Yes
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsEndGameOpen(false)}
            className="w-[120px]"
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isSignOutOpen}
        type="bare"
        textContent="Are you sure you want to Sign Out?"
        headerImage={IMAGES.signOutIcon.src}
        hasClose
        closeModal={() => setIsSignOutOpen(false)}
        multipleBtn
        parentStyle="max-w-[300px]"
        hasParentBg={true}
        hasContentBg={true}
      >
        <div className="flex justify-center gap-4 w-full">
          <Button onClick={handleSignOut} variant="red" className="w-[120px]">
            Yes
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsSignOutOpen(false)}
            className="w-[120px]"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
