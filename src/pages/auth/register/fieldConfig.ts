import type { SelectOption } from "@/components/form/FormField";
import dayjs from "dayjs";

type RegisterField = {
  name: string;
  placeholder: string;
  type: "date" | "text" | "password" | "select" | "email";
  dateDisabled?: (date: Date) => boolean;
  showValidUI?: boolean;
  defaultDate?: Date;
  options?: SelectOption[];
};

export const registerFields = (gameSites: SelectOption[]): RegisterField[] => [
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
  },
  {
    name: "userName",
    placeholder: "Username",
    type: "text",
  },
  {
    name: "permanentAddress",
    placeholder: "Permanent Address",
    type: "text",
  },
  {
    name: "currentAddress",
    placeholder: "Current Address",
    type: "text",
  },
  {
    name: "birthDate",
    placeholder: "Birth Date",
    type: "date",
    defaultDate: dayjs().subtract(21, "year").toDate(),
    dateDisabled: (date) => {
      const today = dayjs();
      const minAllowed = today.subtract(21, "year");
      return dayjs(date).isAfter(minAllowed) || dayjs(date).isAfter(today);
    },
  },
  {
    name: "birthPlace",
    placeholder: "Birth Place",
    type: "text",
  },
  {
    name: "mobile",
    placeholder: "Mobile Number",
    type: "text",
  },
  {
    name: "password",
    placeholder: "Set Your Password",
    type: "password",
    showValidUI: true,
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm Your Password",
    type: "password",
  },
  {
    name: "nationality",
    placeholder: "Nationality",
    type: "select",
    options: selectOptions.nationality,
  },
  {
    name: "gamingSite",
    placeholder: "Gaming site",
    type: "select",
    options: gameSites,
  },
  {
    name: "natureOfWork",
    placeholder: "Nature of Work",
    type: "select",
    options: selectOptions.natureOfWork,
  },
  {
    name: "sourceOfIncome",
    placeholder: "Source of Income",
    type: "select",
    options: selectOptions.sourceOfIncome,
  },
];

export const selectOptions = {
  nationality: [
    { value: "filipino", label: "Filipino" },
    { value: "american", label: "American" },
    { value: "japanese", label: "Japanese" },
  ],
  gamingSite: [{ value: "bingobee", label: "BINGO BEE, RIZAL" }],
  natureOfWork: [
    { value: "it", label: "Information Technology" },
    { value: "bpo", label: "BPO/Call Center" },
    { value: "freelance", label: "Freelance" },
  ],
  sourceOfIncome: [
    { value: "employment", label: "Employment" },
    { value: "business", label: "Business" },
    { value: "others", label: "Others" },
  ],
};
