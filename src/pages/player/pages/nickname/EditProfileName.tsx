import { useForm, type SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react";
import type { UpdateProfileFormData } from "@/types";
import { useProfileStore } from "@/store/player/useEditProfileStore";
import FormField from "@/components/form/FormField";
import { Button } from "@/components/ui/button";

export const EditNickname = () => {
  const { isLoading, updateProfile } = useProfileStore();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    defaultValues: {
      userId: "545979957639",
      nickname: "jode7891990",
      firstName: "John",
      lastName: "Dela Cruz",
      birthdate: "12/25/1990",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    console.log("run");
    try {
      await updateProfile(data);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const clearField = (fieldName: keyof UpdateProfileFormData) => {
    setValue(fieldName, "", { shouldValidate: true });
  };

  return (
    <div className="h-[90vh] relative max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
        <FormField
          name="userId"
          register={register}
          errors={errors.userId}
          type="text"
          placeholder="User ID"
          className="bg-gray-200"
        />

        {/* Nickname Field */}
        <FormField
          name="nickname"
          register={register}
          errors={errors.nickname}
          type="text"
          placeholder="Enter nickname"
          validate={(value) => {
            if (!value || value.trim() === "") return "Nickname is required";
            if (value.length < 3)
              return "Nickname must be at least 3 characters";
            if (value.length > 20)
              return "Nickname must be less than 20 characters";
            return true;
          }}
        />

        {/* First Name Field */}
        <FormField
          name="firstName"
          register={register}
          errors={errors.firstName}
          type="text"
          placeholder="Enter first name"
          validate={(value) => {
            if (!value || value.trim() === "") return "First name is required";
            if (value.length < 2)
              return "First name must be at least 2 characters";
            return true;
          }}
        />

        {/* Last Name Field */}
        <FormField
          name="lastName"
          register={register}
          errors={errors.lastName}
          type="text"
          placeholder="Enter last name"
          validate={(value) => {
            if (!value || value.trim() === "") return "Last name is required";
            if (value.length < 2)
              return "Last name must be at least 2 characters";
            return true;
          }}
        />

        {/* Birthdate Field */}
        <FormField
          name="birthdate"
          register={register}
          control={control}
          errors={errors.birthdate}
          type="date"
          typeInput="player"
          label="Birthdate"
          placeholder="Select birthdate"
          validate={(value) => {
            if (!value) return "Birthdate is required";
            return true;
          }}
        />
        <div className="absolute bottom-0 w-full left-0 px-5 py-5 my-4 flex flex-col items-center">
          <Button variant="green" type="submit" className="w-full">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
