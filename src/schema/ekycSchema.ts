import { z } from "zod";

const nameSchema = z
  .string()
  .min(1, "This field is required")
  .min(2, "Must be at least 2 characters")
  .max(50, "Must not exceed 50 characters")
  .regex(
    /^[a-zA-Z\s'-]+$/,
    "Can only contain letters, spaces, hyphens, and apostrophes"
  );

const requiredString = (field: string, min = 1, max?: number) => {
  let schema = z.string().min(min, `${field} is required`);
  if (max)
    schema = schema.max(max, `${field} must not exceed ${max} characters`);
  return schema;
};

const birthdateSchema = z
  .date()
  .refine((date) => !!date, { message: "Birthdate is required" })
  .max(new Date(), "Birthdate cannot be in the future")
  .min(
    new Date(new Date().setFullYear(new Date().getFullYear() - 150)),
    "Birthdate too far in the past"
  );
export const personalInformationSchema = z.object({
  type: requiredString("ID Type"),
  firstName: nameSchema.refine((val) => !!val, {
    message: "First name is required",
  }),
  lastName: nameSchema.refine((val) => !!val, {
    message: "Last name is required",
  }),
  gender: requiredString("Gender"),
  birthplace: requiredString("Birthplace", 2, 100),
  birthdate: birthdateSchema,
  nationality: requiredString("Nationality"),
  natureOfWork: requiredString("Nature of Work"),
});

export const documentIdSchema = z.object({
  document_id: requiredString("ID Type"),
});

export type PersonalInformationType = z.infer<typeof personalInformationSchema>;
export type DocumentIdType = z.infer<typeof documentIdSchema>;
