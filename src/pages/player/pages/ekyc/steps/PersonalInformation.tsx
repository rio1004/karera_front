import { useNavigate } from "react-router-dom";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form/FormField";
import { useForm, type FieldError, type SubmitHandler } from "react-hook-form";
import { personalInformationFields } from "@/constant/ekyc";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInformationSchema,
  type PersonalInformationType,
} from "@/schema/ekycSchema";
import { useEKYCStore } from "@/store/player/useEKYCStore";
import { base64ToFile } from "@/utils/utils.helper";
import { useEkycHook } from "@/hooks/player/useEkyc";
import { useAuthStore } from "@/store/auth/useAuth";
import { useEffect, useState } from "react";

const PersonalInformation = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { frontImage, backImage, documentType, setEkycId, ekycId } =
    useEKYCStore();
  const { uploadById, getEkycById } = useEkycHook();
  const { user } = useAuthStore();

  const savedValues = localStorage.getItem("personalInfo");
  const initialValues: PersonalInformationType = savedValues
    ? {
        ...JSON.parse(savedValues),
        birthdate: new Date(JSON.parse(savedValues).birthdate), // convert string to Date
      }
    : {
        type: documentType,
        firstName: "",
        lastName: "",
        gender: "",
        birthplace: "",
        birthdate: new Date(),
        nationality: "",
        natureOfWork: "",
      };

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PersonalInformationType>({
    resolver: zodResolver(personalInformationSchema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (!savedValues && documentType) {
      reset({
        ...initialValues,
        type: documentType,
      });
    }
  }, [documentType, savedValues, reset]);

  const formValues = watch();

  useEffect(() => {
    if (!isSubmitted) {
      localStorage.setItem("personalInfo", JSON.stringify(formValues));
    }
  }, [formValues, isSubmitted]);

  const fetchEkyc = async (id: string) => {
    try {
      const res = await getEkycById(id);
      setEkycId(res.ekycId);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<PersonalInformationType> = async (data) => {
    if (!ekycId && user?.id) {
      await fetchEkyc(user.id);
    }

    if (frontImage && backImage) {
      const frontFile = base64ToFile(frontImage, "front-id.jpeg");
      const backFile = base64ToFile(backImage, "back-id.jpeg");

      const res = await uploadById(
        { documentFront: frontFile, documentBack: backFile },
        data
      );

      if (res.success) {
        setIsSubmitted(true);
        localStorage.removeItem("personalInfo");
        navigate("/player/ekyc-settings/upload-selfie");
      }
    }
  };

  useEffect(() => {
    if (user?.id) fetchEkyc(user.id);
  }, [user?.id]);

  return (
    <div className="pb-[70px]">
      <Text
        type="p1"
        color="#5B5B5B"
        text="Confirm your Personal Information"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mt-[15px]">
          {personalInformationFields.map((field) => {
            const fieldError = errors[
              field.name as keyof PersonalInformationType
            ] as FieldError | undefined;

            return (
              <FormField
                key={field.name}
                name={field.name}
                placeholder={field.placeholder}
                register={register}
                control={control}
                type={field.type}
                label={field.label}
                errors={fieldError}
                typeInput={field.inputType}
                options={field.options}
              />
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 bg-white z-50">
          <Button className="w-full" variant="green" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
