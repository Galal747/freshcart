import { z } from "zod";

export const shippingSchema = z.object({
  details: z.string().trim().min(5, "Address details must be at least 5 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  city: z.string().trim().min(2, "City is required"),
});

export type ShippingFormValues = z.infer<typeof shippingSchema>;