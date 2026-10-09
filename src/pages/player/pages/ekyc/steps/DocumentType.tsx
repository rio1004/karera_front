import { useNavigate } from "react-router-dom";
import Image from "@/components/Image";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import FormField from "@/components/form/FormField";
import { useForm } from "react-hook-form";
import { idOptions } from "@/constant/ekyc";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentIdSchema, type DocumentIdType } from "@/schema/ekycSchema";
import { useEKYCStore } from "@/store/player/useEKYCStore";

const TypeDocument = () => {
  const navigate = useNavigate();
  const { setDocumentType } = useEKYCStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(documentIdSchema),
    mode: "onChange",
    defaultValues: {
      document_id: "",
    },
  });

  const onSubmit = (data: DocumentIdType) => {
    setDocumentType(data.document_id);
    navigate("/player/ekyc-settings/upload-id/front");
  };
  return (
    <div>
      <div>
        <Image path="/EKYC/picture.png" className="h-[64px]" />
        <Text
          type="p1"
          color="#5B5B5B"
          text="Select the type of valid document
below to verify your identity"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-12 flex flex-col gap-2">
          <Text text="Type of Document" type="p1" weight="bold" align="left" />
          <FormField
            name="document_id"
            register={register}
            control={control}
            type="select"
            options={idOptions}
            placeholder="Select Identification Card"
            errors={errors["document_id"]}
          />
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

export default TypeDocument;
