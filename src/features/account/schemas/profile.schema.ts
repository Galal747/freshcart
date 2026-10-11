import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .refine((v) => v === "" || v.length >= 2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || z.string().email().safeParse(v).success,
      "Enter a valid email address",
    ),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || /^01[0125][0-9]{8}$/.test(v),
      "Enter a valid Egyptian phone number",
    ),
});

export type ProfileValues = z.infer<typeof profileSchema>;