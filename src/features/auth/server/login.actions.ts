"use server";

import z from "zod";
import { loginSchema, LoginValues } from "../schemas/login.schema";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { apiClient } from "@/services/apiClient";


type LoginResponse = {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

type loginFieldErrors = Partial<Record<keyof LoginValues, string[]>>;

type loginActionReturn =
  | { success: true; message: string , data: LoginResponse}
  | { success: false; message: string; fieldErrors?: loginFieldErrors };

export async function loginAction(
  values: LoginValues,
): Promise<loginActionReturn> {
  const validationResult = loginSchema.safeParse(values);

  if (!validationResult.success) {
    const { fieldErrors, formErrors } = z.flattenError(validationResult.error);

    return {
      success: false,
      message: formErrors[0] ?? "fix highlighted errors",
      fieldErrors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "/auth/signin",
      method: "POST",
      data: validationResult.data,
    };

   const{data} =  await apiClient.request(options);

    return {
      success: true,
      message: "user loggged in successfully",
      data
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data.message ??
          "can not reach server, try again later",
      };
    }

    return {
      success: false,
      message: "something went wrong",
    };
  }
}