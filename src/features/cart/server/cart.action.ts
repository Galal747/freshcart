"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CartResponse, CartErrorResponse } from "../types/cart.types";

const CART_URL = "https://ecommerce.routemisr.com/api/v1/cart";
const CART_PATH = "/cart";

async function cartRequest(
  options: Omit<AxiosRequestConfig, "headers">,
): Promise<CartResponse | CartErrorResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "You are not logged in. Please log in to get access",
    };
  }

  try {
    const { data } = await axios.request<CartResponse>({
      ...options,
      headers: { token: token.value },
    });
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "fail",
      message: "something went wrong. try again later.",
    };
  }
}

export async function getCartItems(): Promise<
  CartResponse | CartErrorResponse
> {
  return cartRequest({ url: CART_URL, method: "GET" });
}

export async function addProductToCart(productId: string) {
  const result = await cartRequest({
    url: CART_URL,
    method: "POST",
    data: { productId },
  });
  if (result.status === "success") revalidatePath(CART_PATH);
  return result;
}

export async function updateCartItemCount(productId: string, count: number) {
  const result = await cartRequest({
    url: `${CART_URL}/${productId}`,
    method: "PUT",
    data: { count },
  });
  if (result.status === "success") revalidatePath(CART_PATH);
  return result;
}

export async function removeCartItem(productId: string) {
  const result = await cartRequest({
    url: `${CART_URL}/${productId}`,
    method: "DELETE",
  });
  if (result.status === "success") revalidatePath(CART_PATH);
  return result;
}

export async function clearCart() {
  const result = await cartRequest({ url: CART_URL, method: "DELETE" });
  if (result.status !== "fail" && result.status !== "error") {
    revalidatePath(CART_PATH);
  }
  return result;
}