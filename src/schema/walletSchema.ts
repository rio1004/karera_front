import z from "zod";

const philippinePhoneRegex = /^(?:\+639\d{9}|09\d{9})$/;
export const otpSchema = z.object({
  phone: z
    .string()
    .regex(philippinePhoneRegex, "Enter a valid Philippine phone number"),
});
