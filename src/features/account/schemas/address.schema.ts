import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().trim().min(2, "Give this address a name (e.g. Home)"),
  city: z.string().trim().min(2, "City is required"),
  details: z.string().trim().min(5, "Address details must be at least 5 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
});

export type AddressValues = z.infer<typeof addressSchema>;