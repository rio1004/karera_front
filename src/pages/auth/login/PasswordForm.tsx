import Text from "@/components/Text";
import { passwordFields } from "./fieldConfig";
import { type LoginSchema } from "@/schema/authSchema";
import FormField from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type Props = {
  register: any;
  errors: any;
  isValid: boolean;
  isChecked: boolean;
  isLoading: boolean;
};

const PasswordForm = ({
  errors,
  isChecked,
  isLoading,
  isValid,
  register,
}: Props) => {


  const navigate = useNavigate()

  const handleForgotPassword = () => {
    navigate("/auth/forgot-password");
  }
  return (
    <div className="flex flex-col gap-2 mt-2">
      <Text
        text="Enter your number and password to get started!"
        type="p2"
        color="disabled"
        className="text-[14px] flex text-start"
      />
      {passwordFields.map((field) => (
        <FormField
          key={field.name}
          name={field.name as keyof LoginSchema}
          placeholder={field.placeholder}
          type={field.type}
          register={register}
          errors={errors[field.name as keyof LoginSchema]}
        />
      ))}
      <Text
        text="Forgot password?"
        type="p2"
        className="text-[13px] cursor-pointer"
        align="right"
        color="#2196F3"
        onClick={handleForgotPassword}
      />
      <Button
        disabled={!isValid || !isChecked || isLoading}
        type="submit"
        variant={"green"}
        className="mt-1"
      >
        Sign In
      </Button>
    </div>
  );
};

export default PasswordForm;
