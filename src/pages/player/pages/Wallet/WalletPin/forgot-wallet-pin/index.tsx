import FormField from "@/components/form/FormField";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { useOTP } from "@/hooks/player/useOTP";
import { phoneLoginSchema, type PhoneSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ForgotWalletPin = () => {
  const { requestOTP } = useOTP();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(phoneLoginSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: PhoneSchema) => {
    await requestOTP({ mobile: data.phone });
  };
  return (
    <div onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Text
          text="Enter your Registered Mobile Number"
          type="h8"
          align="left"
          weight="bold"
        />
        <Text
          text="We'll send a code to your registered mobile number"
          type="p1"
          color="disabled"
          align="left"
        />
        <form>
          <FormField
            name="phone"
            placeholder="Enter you phone"
            register={register}
            errors={errors.phone}
          />
          <Button
            variant={"green"}
            type="submit"
            className="mt-15"
            disabled={!isValid}
          >
            Generate OTP{" "}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotWalletPin;
