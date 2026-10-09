import Divider from "@/components/Divider";
import FormField from "@/components/form/FormField";
import Text from "@/components/Text";
import { useCustomDrawer } from "@/hooks/common/useCustomDrawer";
import { formatDatePretty } from "@/utils/utils.helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw, X } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

type DateRangeType = {
  show: boolean;
  api?: string;
  onClose: () => void;
};
export const dateFilterSchema = z
  .object({
    from: z.string().nonempty("From date is required"),
    to: z.string().nonempty("To date is required"),
  })
  .refine(
    (data) => {
      if (!data.from || !data.to) return true;
      return new Date(data.from) <= new Date(data.to);
    },
    {
      message: "From date must be earlier than To date",
      path: ["to"],
    }
  );

const formatLocalDate = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const getDefaultDates = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    from: formatLocalDate(firstDay),
    to: formatLocalDate(lastDay),
  };
};

const DateFilter = ({ show, api, onClose }: DateRangeType) => {
  const {
    register,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dateFilterSchema),
    defaultValues: getDefaultDates(),
  });

  const from = watch("from");
  const to = watch("to");

  const handleClose = () => {
    reset(getDefaultDates());
    onClose();
  };

  const { DrawerComponent, closeDrawer } = useCustomDrawer({
    content: (
      <div className="p-5 flex gap-5 flex-col">
        <div className="flex justify-between">
          <RotateCcw color="#808080" strokeWidth={3} />
          <Text text="Date Range" type="h7" weight="medium" />
          <X color="#808080" strokeWidth={3.5} onClick={() => closeDrawer()} />
        </div>
        <Divider width="100%" />
        <div className="bg-[#D9D9D980] flex justify-center items-center p-3 gap-3 rounded-[10px]">
          <div className="shadow-[0_4px_4px_0_rgba(153,153,153,0.15)] bg-white p-2 rounded-[5px] w-full">
            <Text text={formatDatePretty(from)} type="p1" />
          </div>
          <div className="shadow-[0_4px_4px_0_rgba(153,153,153,0.15)] bg-white p-2 rounded-[5px] w-full">
            <Text text={formatDatePretty(to)} type="p1" />
          </div>
        </div>

        <Text text="From" type="p1" align="left" weight="bold" />
        <FormField
          name="from"
          register={register}
          type="date"
          errors={errors["from"]}
          control={control}
        />
        <Text text="To" type="p1" align="left" weight="bold" />
        <FormField
          name="to"
          register={register}
          type="date"
          errors={errors["to"]}
          control={control}
        />
      </div>
    ),
    show: show,
    onClose: handleClose,
  });

  return <div>{DrawerComponent}</div>;
};

export default DateFilter;
