import { registerSchema, type RegisterSchema } from "@/schema/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Text from "@/components/Text";
import FormField, { type SelectOption } from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/player/usePlayerStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerFields, selectOptions } from "./fieldConfig.ts";
import { useRegister } from "@/hooks/auth/useRegistration.ts";
import dayjs from "dayjs";
import { GameSiteServices } from "@/api/services/gameSite.service.ts";

const Register = () => {
  const { showTerms } = usePlayerStore();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { handleRegister } = useRegister();
  const [gameSites, setGameSites] = useState<SelectOption[]>([]);

  const fetchGameSites = async () => {
    try {
      const res = (await GameSiteServices.getGameSites()).map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });
      setGameSites(res);
    } catch (error) {}
  };
  useEffect(() => {
    setIsChecked(showTerms);
  }, [showTerms]);

  useEffect(() => {
    fetchGameSites();
  }, []);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      permanentAddress: "",
      currentAddress: "",
      birthDate: dayjs().subtract(21, "year").toDate(),
      birthPlace: "",
      gamingSite: "",
      nationality: "",
      natureOfWork: "",
      sourceOfIncome: "",
      mobile: "",
      type: "player",
      password: "",
      confirmPassword: "",
      ekycTransactionId: "test",
    },
  });
  const password = watch("password");
  const onSubmit = async (data: RegisterSchema) => {
    await handleRegister(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-2"
      >
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {registerFields(gameSites).map((field) => {
              const validate =
                field.name === "confirmPassword"
                  ? (value: string) =>
                      value === password || "Passwords do not match"
                  : undefined;

              return (
                <FormField
                  key={field.name}
                  name={field.name as keyof RegisterSchema}
                  register={register}
                  errors={errors[field.name as keyof RegisterSchema]}
                  placeholder={field.placeholder}
                  type={field.type}
                  disabledDate={field?.dateDisabled}
                  control={control}
                  showValidUI={field.showValidUI ?? false}
                  options={field.type === "select" ? field.options : []}
                  validate={validate}
                />
              );
            })}
          </div>
          <Button
            variant="green"
            type="submit"
            className="mt-4"
            disabled={!isChecked || Object.keys(errors).length > 0}
          >
            Proceed
          </Button>
          <div
            className="flex justify-center my-[15px] gap-1"
            onClick={() => navigate("/auth/login")}
          >
            <Text text="Already have an account? " type="p2" />{" "}
            <Text
              text="Sign In"
              type="p2"
              className="!text-[#2196F3] underline"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <p className="text-[14px]">
              I have read and agree to the{" "}
              <span className="underline text-[#2196F3]">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="underline text-[#2196F3]"> Privacy Policy.</span>
            </p>
          </div>{" "}
        </section>
      </form>
    </>
  );
};

export default Register;
