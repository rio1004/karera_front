import FormField from "@/components/form/FormField";
import Text from "@/components/Text";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

const redirectOptions = [
  { label: "Admin Site", value: "admin" },
  { label: "Player Site", value: "player" },
  { label: "Operator Site", value: "operator" },
  { label: "CSR Site", value: "csr" },
];

const redirectSchema = z.object({
  redirect_to: z.string().min(1, "Redirect to is required"),
});
type RedirectFormData = z.infer<typeof redirectSchema>;

const AdminRedirector = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(redirectSchema),
    defaultValues: {
      redirect_to: "",
    },
  });
  const onSubmit = (data: RedirectFormData) => {
    navigate(`/${data.redirect_to}`);
  };
  return (
    <div className="p-5">
      <Text
        text="Please choose where you will be going"
        type="p1"
        weight="medium"
      />
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="redirect_to"
          placeholder="Redirect to?"
          register={register}
          control={control}
          type="select"
          options={redirectOptions}
          errors={errors["redirect_to"]}
        />
        <div className="absolute bottom-5 w-full left-0 px-5">
          {" "}
          <Button variant={"green"} className="mt-10 ">
            Proceed
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminRedirector;
