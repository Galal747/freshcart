import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, { error: "name is required" }),

    email: z
      .string()
      .min(1, { error: "email is required" })
      .pipe(z.email({ error: "email is invalid. please try another one" })),

    password: z
      .string()
      .min(1, { error: "password is required" })
      .min(8, { error: "password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        error: "password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        error: "password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        error: "password must contain at least one number",
      })
      .regex(/[@#$%^&*!_]/, {
        error:
          "password must contain at least one of the following special characters: @ # $ % ^ & * ! _",
      }),

    rePassword: z.string().min(1, { error: "confirm password is required" }),

    phone: z
      .string()
      .min(1, { error: "phone is required" })
      .regex(/^01[0125][0-9]{8}$/, {
        error: "we only accept Egyptian phone numbers (e.g. 01012345678)",
      }),

    terms: z.boolean().refine((value) => value === true, {
      error: "you must agree to the Terms of Service and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    error: "password and confirm password should be the same",
    path: ["rePassword"],
  });

export type SignupValues = z.infer<typeof signupSchema>;