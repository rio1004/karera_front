import z from "zod";

export const sendCreditsSchema = z.object({
  amount: z
    .coerce.number()
    .refine((val) => !isNaN(val), { message: "Amount is required" })
    .min(1, "Minimum amount is 1"),
  mobile: z.string().min(10, "Enter a valid mobile number"),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to terms"),
});

export const transferMoneySchema = z.object({
  amount: z
    .coerce.number()
    .refine((val) => !isNaN(val), { message: "Amount is required" })
    .min(1, "Minimum amount is 1"),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to terms"),
});


export type TransferMoneySchema = z.infer<typeof transferMoneySchema>;