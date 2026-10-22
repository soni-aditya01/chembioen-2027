import { z } from "zod";

const nameField = z.string().trim().min(2).max(120);
const emailField = z.string().trim().email().max(254).transform((email) => email.toLowerCase());
const passwordField = z
  .string()
  .min(12)
  .max(72)
  .refine((password) => Buffer.byteLength(password, "utf8") <= 72, "Password must be at most 72 bytes.");

export const registrationSchema = z
  .object({
    name: nameField,
    email: emailField,
    phone: z.string().trim().min(7).max(24).regex(/^[+\d][\d\s().-]*$/),
    institution: z.string().trim().min(1).max(160),
    department: z.string().trim().min(1).max(120),
    designation: z.string().trim().min(1).max(80),
    password: passwordField,
    confirmPassword: z.string(),
    termsAccepted: z.boolean()
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match."
      });
    }
    if (!data.termsAccepted) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["termsAccepted"],
        message: "Accept the terms and conditions to continue."
      });
    }
  });

export const loginSchema = z.object({
  email: emailField,
  password: z
    .string()
    .min(1)
    .max(72)
    .refine((password) => Buffer.byteLength(password, "utf8") <= 72, "Password must be at most 72 bytes.")
});
