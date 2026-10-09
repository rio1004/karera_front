import Text from "@/components/Text";
import { phoneFields } from "./fieldConfig";
import { type LoginSchema } from "@/schema/authSchema";
import FormField from "@/components/form/FormField";
import { Button } from "@/components/ui/button";

type Props = {
  register: any;
  errors: any;
  isValid: boolean;
  isChecked?: boolean;
  isLoading: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => void; 
};

const PhoneForm = ({
  errors,
  isLoading,
  isValid,
  register,
  isChecked,
  onSubmit,
}: Props) => {
  return (
    <form
      className="flex flex-col gap-2 mt-2"
      onSubmit={onSubmit}
    >
      <Text
        text="We’ll send a code to your mobile number"
        type="p2"
        color="disabled"
        className="text-[14px]"
        align="left"
      />
      {phoneFields.map((field) => (
        <FormField
          key={field.name}
          name={field.name as keyof LoginSchema}
          placeholder={field.placeholder}
          type={field.type}
          register={register}
          errors={errors[field.name as keyof LoginSchema]}
          prefix="+63"
        />
      ))}
      <Button
        disabled={!isValid || !isChecked || isLoading}
        type="submit"
        variant={"green"}
        className="mt-3"
      >
        Request OTP
      </Button>
    </form>
  );
};

export default PhoneForm;
