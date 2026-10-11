"use server";

import axios from "axios";
import { cookies } from "next/headers";
import type {
  ActionResult,
  Order,
  ShippingAddress,
} from "@/features/orders/types/orders.types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/orders";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

async function getToken() {
  const store = await cookies();
  return store.get("token")?.value;
}

function getUserIdFromToken(token: string): string | null {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString(),
    );
    return payload.id ?? null;
  } catch {
    return null;
  }
}

function errorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message;
  }
  return "Something went wrong";
}

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress,
): Promise<ActionResult<Order>> {
  const token = await getToken();
  if (!token) return { success: false, message: "Please login first" };

  try {
    const { data } = await axios.post(
      `${BASE_URL}/${cartId}`,
      { shippingAddress },
      { headers: { token } },
    );
    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function createCheckoutSession(
  cartId: string,
  shippingAddress: ShippingAddress,
): Promise<ActionResult<{ url: string }>> {
  const token = await getToken();
  if (!token) return { success: false, message: "Please login first" };

  try {
    const { data } = await axios.post(
      `${BASE_URL}/checkout-session/${cartId}`,
      { shippingAddress },
      { headers: { token }, params: { url: SITE_URL } },
    );
    return { success: true, data: { url: data.session.url } };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function getUserOrders(): Promise<ActionResult<Order[]>> {
  const token = await getToken();
  if (!token) return { success: false, message: "Please login first" };

  const userId = getUserIdFromToken(token);
  if (!userId) return { success: false, message: "Invalid token" };

  try {
    const { data } = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: { token },
    });
    const orders: Order[] = Array.isArray(data) ? data : (data.data ?? []);
    return { success: true, data: orders };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}

export async function getAllOrders(): Promise<ActionResult<Order[]>> {
  try {
    const { data } = await axios.get(`${BASE_URL}/`);
    const orders: Order[] = Array.isArray(data) ? data : (data.data ?? []);
    return { success: true, data: orders };
  } catch (error) {
    return { success: false, message: errorMessage(error) };
  }
}