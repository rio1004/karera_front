import { Label } from "@/components/ui/label";
import FormField from "@/components/form/FormField";
import { useForm } from "react-hook-form";
import type { Role } from "@/constant/roles";
import { AdminUserService } from "@/api/services/admin/userApi.service";
import type { User } from "@/store/types/auth/UserTypes";
import { useEffect } from "react";
import { CircleCheckBig } from "lucide-react";
import { UI_COLORS } from "@/constant/colors";
import { useApiWithAudit } from "@/hooks/common/useAudit";
import { AdminModal } from "../components/AdminModal";

interface UserEditDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  user: User | null;
  onSaved?: () => void;
}

const EditTypeModal = ({
  open,
  onOpenChange,
  user,
  onSaved,
}: UserEditDialogProps) => {
  const { register, control, setValue, handleSubmit, getValues } = useForm();
  const { executeWithAudit, isLoading } = useApiWithAudit();

  useEffect(() => {
    if (user) {
      setValue("username", user.userName);
      setValue("user_type", user.type);
      setValue("id", user.id);
    }
  }, [user, setValue]);

  const handleSave = async () => {
    const { user_type, id } = getValues();
    await executeWithAudit(
      () => AdminUserService.updateUserType(id, user_type as Role),
      {
        audit: {
          actionType: (response) => "Change User type to " + response.user.type,
          module: "User",
          target: user?.userName || "",
        },
        toast: {
          success: {
            message: (response) => {
              const status =
                response.user.status == "active" ? "Activated" : "Deactivated";
              return (
                <div className="flex gap-2 items-center">
                  <CircleCheckBig color={UI_COLORS.BORDER_COLOR.green} />
                  <p className="text-[18px]">
                    User has been{" "}
                    <span
                      className={`font-semibold ${
                        response.user.status == "active"
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {status}
                    </span>
                  </p>
                </div>
              );
            },
          },
        },
        onSuccess: () => {
          onOpenChange(false);
          onSaved?.();
        },
        onError: () => {
          onOpenChange(false);
          onSaved?.();
        },
      }
    );
  };

  return (
    <AdminModal
      title="Edit User Type"
      open={open}
      setOpen={onOpenChange}
      handleSubmit={handleSubmit(handleSave)}
      saveName="Save"
      isLoading={isLoading}
    >
      {user && (
        <div className="space-y-4">
          <div>
            <Label>Username</Label>
            <FormField name="username" register={register} disabled />
          </div>
          <div>
            <Label>User Type</Label>
            <FormField
              name="user_type"
              register={register}
              control={control}
              type="select"
              options={[
                { label: "Player", value: "player" },
                { label: "Operator", value: "operator" },
                { label: "Admin", value: "admin" },
                { label: "Csr", value: "csr" },
                { label: "Cashier", value: "cashier" },
              ]}
            />
          </div>
        </div>
      )}
    </AdminModal>
  );
};

export default EditTypeModal;
