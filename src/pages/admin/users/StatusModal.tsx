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
import type { User } from "@/store/types/auth/UserTypes";
import { useEffect } from "react";
import { AdminUserService } from "@/api/services/admin/userApi.service";
import { toast } from "sonner";
import { UI_COLORS } from "@/constant/colors";
import { CheckCheckIcon, CircleCheckBig } from "lucide-react";
import { AdminAuditTrail } from "@/api/services/admin/auditTrailApi.service";
import { useAuthStore } from "@/store/auth/useAuth";
import type { AuditPayload } from "@/types/admin/auditTrail";

interface UserEditDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  user: User | null;
  onSaved?: () => void;
}

const StatusModal = ({
  open,
  onOpenChange,
  user,
  onSaved,
}: UserEditDialogProps) => {
  const { register, control, setValue, handleSubmit, getValues } = useForm();
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("status", user.status);
      setValue("username", user.userName);
    }
  }, [user, setValue]);

  const handleBan = async () => {
    const { id, status } = getValues();
    const statusPayload = status == "active" ? "inactive" : "active";
    console.log(id, status);
    try {
      const res = await AdminUserService.updateUserStatus(id, statusPayload);
      if (res.user) {
        const status =
          res.user.status == "active" ? "Activated" : "Deactivated";
        if (currentUser) {
          const auditPayload: AuditPayload = {
            userId: Number(currentUser.id),
            meta: {
              Timestamp: new Date().toISOString(),
              User: currentUser?.userName || "",
              ActionType: status,
              Module: "User",
              Target: user?.userName || "",
            },
          };

          await AdminAuditTrail.postAuditTrail(auditPayload);
        }

        toast(
          <div className="flex gap-2 items-center">
            <CircleCheckBig color={UI_COLORS.BORDER_COLOR.green} />
            <p className="text-[18px]">
              User has been{" "}
              <span
                className={`font-semibold ${
                  res.user.status == "active"
                    ? "text-success"
                    : "text-destructive"
                }`}
              >
                {status}
              </span>
            </p>
          </div>
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      onOpenChange(false);
      onSaved?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user?.status == "active" ? "Deactivate" : "Activate"} Player?
          </DialogTitle>
        </DialogHeader>

        {user && (
          <form onSubmit={handleSubmit(handleBan)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Username</Label>
              <FormField name="username" register={register} disabled />
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
                variant={user.status == "active" ? "destructive" : "success"}
              >
                {user?.status == "active" ? "Deactivate" : "Activate"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
