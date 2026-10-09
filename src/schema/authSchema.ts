import z from "zod";

const philippinePhoneRegex = /^(?:\+639\d{9}|09\d{9})$/;

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email({ message: "Invalid email" }),
    userName: z.string().min(3, "Username must be at least 3 characters"),
    permanentAddress: z.string().min(1, "Permanent address is required"),
    currentAddress: z.string().min(1, "Current address is required"),
    birthDate: z.string().refine((val) => Boolean(Date.parse(val)), {
      message: "Invalid birth date",
    }),
    birthPlace: z.string().min(1, "Birth place is required"),
    gamingSite: z.string().min(1, "Gaming site is required"),
    nationality: z.string().min(1, "Nationality is required"),
    natureOfWork: z.string().min(1, "Nature of work is required"),
    sourceOfIncome: z.string().min(1, "Source of income is required"),
    ekycTransactionId: z.string().min(1, "Source of income is required"),
    mobile: z
      .string()
      .regex(/^(?:\+639\d{9}|09\d{9})$/, "Must be a valid PH number"),
    type: z.enum(["player", "admin", "moderator", "csr", "accounting", "host"]),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export const passwordSchema = z.object({
  type: z.string().optional(),
  userNameOrEmail: z.string().min(1, "Username is Required"),
  password: z.string().min(1, "Password is required"),
});

export const phoneLoginSchema = z.object({
  phone: z
    .string()
    .regex(philippinePhoneRegex, "Enter a valid Philippine phone number"),
});

export const forgotPasswordSchema = z.object({
  mobile: z.string(),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
  mobile: z.string().min(1, "Mobile number is required"),
});

// Reset password form schema
export const resetPasswordChangeSchema = z
  .object({
    newPassword: z
      .string()
      .min(8)
      .max(16)
      .regex(/[A-Z]/, "Must contain uppercase")
      .regex(/[a-z]/, "Must contain lowercase")
      .regex(/[0-9]/, "Must contain number")
      .regex(/[^A-Za-z0-9]/, "Must contain special character"),
    newRepeatPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.newRepeatPassword, {
    message: "Passwords do not match",
    path: ["newRepeatPassword"],
  });

export const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Must be at least 8 characters")
      .max(16, "Must be at most 16 characters")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter (A-Z)")
      .regex(/[a-z]/, "Must contain at least 1 lowercase letter (a-z)")
      .regex(/[0-9]/, "Must contain at least 1 number (0-9)")
      .regex(
        /[^A-Za-z0-9]/,
        "Must contain at least 1 special character (e.g. ! @ # $ % ^ & *)"
      ),
    newRepeatPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.newRepeatPassword, {
    message: "Passwords do not match",
    path: ["newRepeatPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const loginSchema = z.union([passwordSchema, phoneLoginSchema]);

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
export type PasswordResetFormData = z.infer<typeof resetPasswordChangeSchema>;
export type OtpSchema = z.infer<typeof otpSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type PhoneSchema = z.infer<typeof phoneLoginSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
