import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { error: "email is required" })
    .pipe(z.email({ error: "email is invalid. please enter a valid email" })),

  password: z.string().min(1, { error: "password is required" }),
});

export type LoginValues = z.infer<typeof loginSchema>;