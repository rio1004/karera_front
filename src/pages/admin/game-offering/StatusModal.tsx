import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormField from "@/components/form/FormField";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UI_COLORS } from "@/constant/colors";
import { CircleCheckBig } from "lucide-react";
import { AdminAuditTrail } from "@/api/services/admin/auditTrailApi.service";
import { useAuthStore } from "@/store/auth/useAuth";
import type { AuditPayload } from "@/types/admin/auditTrail";
import type { Game } from "@/store/moderator/useGameRoom";
import { GameServices } from "@/api/services/gamesApi.service";
import { useEffect } from "react";

interface StatusModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  game: Game | null;
  onSaved?: () => void;
}

const StatusModal = ({
  open,
  onOpenChange,
  game,
  onSaved,
}: StatusModalProps) => {
  const { register, setValue, handleSubmit, getValues } = useForm();
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    if (game) {
      setValue("id", game.id);
      setValue("status", game.status);
      setValue("name", game.name);
    }
  }, [game, setValue]);

  const handleStatusToggle = async () => {
    const { id, status } = getValues();
    const statusPayload = status == "enable" ? "disable" : "enable";

    try {
      const res = await GameServices.updateGameStatusById(
        Number(id),
        statusPayload
      );
      if (res) {
        const isNewStatusActive = res.status === "enable";
        const actionType = isNewStatusActive ? "Enable" : "Disable";

        if (currentUser) {
          const auditPayload: AuditPayload = {
            userId: Number(currentUser.id),
            meta: {
              Timestamp: new Date().toISOString(),
              User: currentUser?.userName || "",
              ActionType: status,
              Module: "Game",
              Target: game?.name || "",
            },
          };
          await AdminAuditTrail.postAuditTrail(auditPayload);
        }

        toast(
          <div className="flex gap-2 items-center">
            <CircleCheckBig color={UI_COLORS.BORDER_COLOR.green} />
            <p className="text-[18px]">
              Game has been{" "}
              <span
                className={`font-semibold ${
                  isNewStatusActive ? "text-success" : "text-destructive"
                }`}
              >
                {actionType}
              </span>
            </p>
          </div>
        );
      }
    } catch (error) {
      console.error("Error updating game status:", error);
      toast(
        <div className="flex gap-2 items-center">
          <p className="text-[18px] text-destructive">
            Failed to update game status. Please try again.
          </p>
        </div>
      );
    } finally {
      onOpenChange(false);
      onSaved?.();
    }
  };

  const isActive = game?.status === "enable" || game?.status === "active";
  const actionText = isActive ? "Deactivate" : "Activate";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{actionText} Game</DialogTitle>
        </DialogHeader>

        {game && (
          <form
            onSubmit={handleSubmit(handleStatusToggle)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2">
              <Label>Game Name</Label>
              <FormField name="name" register={register} disabled />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Current Status</Label>
              <div
                className={`px-3 py-2 rounded-md font-medium ${
                  isActive
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {isActive ? "Enable" : "Disabled"}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Are you sure you want to {actionText.toLowerCase()} this game?
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={isActive ? "destructive" : "default"}
              >
                {actionText}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
