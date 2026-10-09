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
import type { Role } from "@/constant/roles";
import { AdminUserService } from "@/api/services/admin/userApi.service";
import type { User } from "@/store/types/auth/UserTypes";
import { useEffect } from "react";

interface UserEditDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  user: User | null;
  onSaved?: () => void;
}

const BanUserModal = ({
  open,
  onOpenChange,
  user,
  onSaved,
}: UserEditDialogProps) => {
  const { register, control, setValue, handleSubmit, getValues } = useForm();

  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("username", user.userName);
    }
  }, [user, setValue]);

  const handleBan = async () => {
    const { id } = getValues();
    console.log(id);
    // const { user_type, id } = getValues();
    // await AdminUserService.updateUserType(id, user_type as Role);
    // onOpenChange(false);
    onSaved?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ban Player?</DialogTitle>
        </DialogHeader>

        {user && (
          <form onSubmit={handleSubmit(handleBan)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label>Username</Label>
              <FormField name="username" register={register} disabled />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Reason for Banning</Label>
              <FormField
                name="reason"
                register={register}
                type="textarea"
                className="p-3"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant={"destructive"}>
                Ban
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BanUserModal;
