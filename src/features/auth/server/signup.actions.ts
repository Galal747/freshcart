"use server";

import { z } from "zod";
import { isAxiosError, type AxiosRequestConfig } from "axios";
import { apiClient } from "@/services/apiClient";
import { signupSchema, type SignupValues } from "../schemas/signup.schema";

type SignupFieldErrors = Partial<Record<keyof SignupValues, string[]>>;

type SignupActionReturn =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: SignupFieldErrors };

const ACCOUNT_EXISTS_PATTERN =
  /already|exist|taken|registered|duplicate|in use/i;

export async function signupAction(
  values: SignupValues,
): Promise<SignupActionReturn> {
  const validationResult = signupSchema.safeParse(values);

  if (!validationResult.success) {
    const { formErrors, fieldErrors } = z.flattenError(validationResult.error);

    return {
      success: false,
      message: formErrors[0] ?? "Please fix the highlighted errors.",
      fieldErrors,
    };
  }

  const { name, email, password, rePassword, phone } = validationResult.data;

  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/signup`,
      data: { name, email, password, rePassword, phone },
    };

    await apiClient.request(options);

    return {
      success: true,
      message: "Account created successfully.",
    };
  } catch (error) {
    if (isAxiosError<{ message?: unknown }>(error)) {
      if (!error.response) {
        return {
          success: false,
          message: "We couldn't reach the server. Please try again later.",
        };
      }

      const status = error.response.status;
      const rawMessage = error.response.data?.message;
      const serverMessage =
        typeof rawMessage === "string" ? rawMessage : undefined;

      const accountExists =
        status === 409 || ACCOUNT_EXISTS_PATTERN.test(serverMessage ?? "");

      if (accountExists) {
        const isPhone = /phone|mobile/i.test(serverMessage ?? "");
        const message = isPhone
          ? "An account with this phone number already exists."
          : "An account with this email already exists.";

        const fieldErrors: SignupFieldErrors = isPhone
          ? { phone: [message] }
          : { email: [message] };

        return { success: false, message, fieldErrors };
      }

      return {
        success: false,
        message: serverMessage ?? "Something went wrong. Please try again.",
      };
    }

    console.error("Unexpected signup error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}