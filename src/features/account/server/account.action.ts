"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { ActionResult, Address } from "../types/account.types";
import type { AddressValues } from "../schemas/address.schema";
import type { PasswordValues } from "../schemas/password.schema";

const API = "https://ecommerce.routemisr.com/api/v1";

const TOKEN_COOKIE = "token";

async function getToken() {
  const store = await cookies();
  return store.get(TOKEN_COOKIE)?.value;
}

async function setToken(token: string) {
  const store = await cookies();
  store.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

function errorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    return data?.errors?.msg ?? data?.message ?? error.message;
  }
  return "Something went wrong";
}

const NOT_LOGGED_IN = {
  success: false,
  message: "Please login first",
} as const;

export async function getAddresses(): Promise<ActionResult<Address[]>> {
  const token = await getToken();
  if (!token) return NOT_LOGGED_IN;

  try {
    const { data } = await axios.get(`${API}/addresses`, {
      headers: { token },
    });
    return { success: true, data: data.data ?? [] };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function addAddress(
  values: AddressValues,
): Promise<ActionResult<Address[]>> {
  const token = await getToken();
  if (!token) return NOT_LOGGED_IN;

  try {
    const { data } = await axios.post(`${API}/addresses`, values, {
      headers: { token },
    });
    revalidatePath("/profile/addresses");
    return { success: true, data: data.data ?? [] };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function removeAddress(
  id: string,
): Promise<ActionResult<Address[]>> {
  const token = await getToken();
  if (!token) return NOT_LOGGED_IN;

  try {
    const { data } = await axios.delete(`${API}/addresses/${id}`, {
      headers: { token },
    });
    revalidatePath("/profile/addresses");
    return { success: true, data: data.data ?? [] };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function updateProfile(values: {
  name?: string;
  email?: string;
  phone?: string;
}): Promise<ActionResult<{ name: string; email: string }>> {
  const token = await getToken();
  if (!token) return NOT_LOGGED_IN;

  try {
    const { data } = await axios.put(`${API}/users/updateMe/`, values, {
      headers: { token },
    });
    return { success: true, data: data.user };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function changePassword(
  values: PasswordValues,
): Promise<ActionResult> {
  const token = await getToken();
  if (!token) return NOT_LOGGED_IN;

  try {
    const { data } = await axios.put(`${API}/users/changeMyPassword`, values, {
      headers: { token },
    });
    if (data.token) await setToken(data.token);
    return { success: true, data: null };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}


export async function forgotPassword(email: string): Promise<ActionResult> {
  try {
    await axios.post(`${API}/auth/forgotPasswords`, { email });
    return { success: true, data: null };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function verifyResetCode(resetCode: string): Promise<ActionResult> {
  try {
    await axios.post(`${API}/auth/verifyResetCode`, { resetCode });
    return { success: true, data: null };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function resetPassword(
  email: string,
  newPassword: string,
): Promise<ActionResult> {
  try {
    await axios.put(`${API}/auth/resetPassword`, { email, newPassword });
    return { success: true, data: null };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}