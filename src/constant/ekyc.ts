import type { PersonalInformationType } from "@/schema/ekycSchema";

export const idOptions = [
  { label: "UMID (Unified Multi-Purpose identity card)", value: "umid" },
  {
    label: "TIN (Taxpayer Identification Number) – Old Version",
    value: "tin_old",
  },
  { label: "TIN – New Version", value: "tin_new" },
  { label: "Driving License", value: "driving_license" },
  { label: "PhilHealth ID", value: "philhealth" },
  { label: "SSS (Social Security System) ID", value: "sss" },
  { label: "Postal ID", value: "postal_id" },
  { label: "PRC ID", value: "prc" },
  { label: "Voter's ID", value: "voter_id" },
  { label: "Identification System ID", value: "ids" },
  { label: "Passport – Old Version", value: "passport_old" },
  { label: "Passport – New Version", value: "passport_new" },
  { label: "Printed PhilSysID", value: "philsys" },
  { label: "Employment Permit", value: "employment_permit" },
  { label: "Alien Registration Card", value: "alien_registration" },
];
export const genderOptions = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },

];

export const nationalityOptions = [
  { value: "AF", label: "Afghan" },
  { value: "AL", label: "Albanian" },
  { value: "DZ", label: "Algerian" },
  { value: "AR", label: "Argentinian" },
  { value: "AU", label: "Australian" },
  { value: "AT", label: "Austrian" },
  { value: "BD", label: "Bangladeshi" },
  { value: "BE", label: "Belgian" },
  { value: "BR", label: "Brazilian" },
  { value: "CA", label: "Canadian" },
  { value: "CL", label: "Chilean" },
  { value: "CN", label: "Chinese" },
  { value: "CO", label: "Colombian" },
  { value: "EG", label: "Egyptian" },
  { value: "FR", label: "French" },
  { value: "DE", label: "German" },
  { value: "GH", label: "Ghanaian" },
  { value: "IN", label: "Indian" },
  { value: "ID", label: "Indonesian" },
  { value: "IE", label: "Irish" },
  { value: "IL", label: "Israeli" },
  { value: "IT", label: "Italian" },
  { value: "JP", label: "Japanese" },
  { value: "KE", label: "Kenyan" },
  { value: "MY", label: "Malaysian" },
  { value: "MX", label: "Mexican" },
  { value: "NG", label: "Nigerian" },
  { value: "PH", label: "Filipino" },
  { value: "PL", label: "Polish" },
  { value: "PT", label: "Portuguese" },
  { value: "RU", label: "Russian" },
  { value: "SA", label: "Saudi Arabian" },
  { value: "ZA", label: "South African" },
  { value: "KR", label: "South Korean" },
  { value: "ES", label: "Spanish" },
  { value: "SE", label: "Swedish" },
  { value: "CH", label: "Swiss" },
  { value: "TH", label: "Thai" },
  { value: "TR", label: "Turkish" },
  { value: "UA", label: "Ukrainian" },
  { value: "AE", label: "Emirati" },
  { value: "GB", label: "British" },
  { value: "US", label: "American" },
  { value: "VN", label: "Vietnamese" },
];

const natureOfWorkOptions = [
  { label: "Agriculture, Forestry, Fishing", value: "agriculture" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Construction", value: "construction" },
  { label: "Information Technology / Software", value: "technology" },
  { label: "Healthcare / Medical Services", value: "healthcare" },
  { label: "Education / Training", value: "education" },
  { label: "Finance / Banking / Insurance", value: "finance" },
  { label: "Retail / Wholesale Trade", value: "retail" },
  { label: "Transportation / Logistics", value: "transportation" },
  { label: "Hospitality / Tourism", value: "hospitality" },
  { label: "Energy / Utilities", value: "energy" },
  { label: "Telecommunications", value: "telecommunications" },
  { label: "Government / Public Services", value: "government" },
  { label: "Arts / Entertainment / Media", value: "arts_media" },
  { label: "Legal / Consultancy", value: "legal_consultancy" },
  { label: "Real Estate / Property Management", value: "real_estate" },
  { label: "Science / Research / Development", value: "science_research" },
  { label: "Non-Profit / NGO", value: "non_profit" },
  { label: "Other", value: "other" },
];
export interface FormFieldTypes {
  name: keyof PersonalInformationType;
  placeholder?: string;
  type: "select" | "date" | "text" | "password";
  label?: string;
  options?: { label: string; value: string }[];
  inputType?: string;
}

export const personalInformationFields: FormFieldTypes[] = [
  {
    name: "type",
    placeholder: "Select Identification Card",
    type: "select",
    label: "ID Type",
    inputType: "player",
    options: idOptions,
  },
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
    label: "First name",
    inputType: "player",
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    type: "text",
    label: "Last name",
    inputType: "player",
  },
  {
    name: "gender",
    placeholder: "Select Gender",
    type: "select",
    label: "Gender",
    inputType: "player",
    options: genderOptions,
  },
  {
    name: "birthplace",
    placeholder: "Birthplace",
    type: "text",
    label: "Birthplace",
    inputType: "player",
  },
  {
    name: "birthdate",
    placeholder: "Select Birthdate",
    type: "date",
    label: "Birthdate",
    inputType: "player",
  },
  {
    name: "nationality",
    placeholder: "Select nationality",
    type: "select",
    label: "Nationality",
    inputType: "player",
    options: nationalityOptions,
  },
  {
    name: "natureOfWork",
    placeholder: "Select Nature of Work",
    type: "select",
    label: "Nature of work",
    inputType: "player",
    options: natureOfWorkOptions,
  },
] as const;
