import Text from "@/components/Text";
import { FileText, ChevronDown } from "lucide-react";
import Tab from "../../components/Tab";
import { useState } from "react";
import FormField from "@/components/form/FormField";
import Divider from "@/components/Divider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateFilterSchema } from "../../components/FilterDownload/DateFilter";
import { Button } from "@/components/ui/button";

const TransactionRequest = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setActiveTab] = useState("all");
  const [dateRangeDropdown, setDateRangeDropdown] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 days");

  const transactionTabs = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Load",
      value: "load",
    },
    {
      label: "Send Credits",
      value: "send Credits",
    },
    {
      label: "Deduct Credits",
      value: "deduct Credits",
    },
  ];

  const dateRangeOptions = [
    { label: "Last 7 days", value: "last7days" },
    { label: "Last 30 days", value: "last30days" },
    { label: "Custom", value: "custom" },
  ];

  const formatLocalDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const getDateRange = (range: string) => {
    const now = new Date();
    let fromDate: Date;
    let toDate = new Date(now);

    switch (range) {
      case "last7days":
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - 6);
        break;
      case "last30days":
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - 29);
        break;
      default:
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
        toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    return {
      from: formatLocalDate(fromDate),
      to: formatLocalDate(toDate),
    };
  };

  const getDefaultDates = () => {
    return getDateRange("last7days");
  };

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dateFilterSchema),
    defaultValues: getDefaultDates(),
  });

  const handleDateRangeChange = (option: { label: string; value: string }) => {
    setSelectedDateRange(option.label);
    setDateRangeDropdown(false);

    if (option.value !== "custom") {
      const dates = getDateRange(option.value);
      setValue("from", dates.from);
      setValue("to", dates.to);
    }
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      <div className="flex flex-col text-start gap-2 items-start">
        <FileText color="white" />
        <Text text="Transaction history request" type="h6" color="#FFFF" />
        <Text
          text="Your request will be downloaded as PDF file."
          type="p1"
          color="#FFFF"
        />
      </div>
      <div className="px-4 absolute left-0 right-0 py-4 space-y-6 border-1 rounded-tr-2xl border-white mt-[24px] bg-white h-[80vh]">
        <div className="space-y-6 gap-4 flex flex-col">
          <Text
            text="Transaction Type"
            type="h8"
            className="text-start flex font-bold"
          />
          <Tab
            tabs={transactionTabs}
            onSwitch={(tab: string) => switchTab(tab)}
            defaultTab="all"
            spacing="between"
            className=""
          />
        </div>
        <div className="p-5 flex gap-5 flex-col">
          <Divider width="100%" />
          <div className="space-y-3">
            <Text text="Date Range" type="p1" align="left" weight="bold" />
            <div className="relative">
              <button
                type="button"
                onClick={() => setDateRangeDropdown(!dateRangeDropdown)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-left flex justify-between items-center hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <span className="text-gray-900">{selectedDateRange}</span>
                <ChevronDown
                  size={20}
                  className={`text-gray-500 transform transition-transform ${
                    dateRangeDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dateRangeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {dateRangeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleDateRangeChange(option)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                        selectedDateRange === option.label
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-900"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
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
        <div className="absolute bottom-0 w-full left-0 px-5 py-5 my-4 flex flex-col items-center">
          <Button variant="green" type="submit" className="w-full">
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionRequest;
