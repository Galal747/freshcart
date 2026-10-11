import { z } from "zod";

export const RESET_EMAIL_KEY = "resetEmail";

export const emailSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export const codeSchema = z.object({
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code we sent you"),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(6, "Must be at least 6 characters"),
    rePassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((v) => v.password === v.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });