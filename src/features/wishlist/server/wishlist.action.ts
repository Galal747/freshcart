"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  WishlistErrorResponse,
  WishlistMutationResponse,
  WishlistResponse,
} from "../types/wishlist.types";

const WISHLIST_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";
const WISHLIST_PATH = "/wishlist";

async function wishlistRequest<T>(
  options: Omit<AxiosRequestConfig, "headers">,
): Promise<T | WishlistErrorResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "You are not logged in. Please log in to get access",
    };
  }

  try {
    const { data } = await axios.request<T>({
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

export async function getWishlist() {
  return wishlistRequest<WishlistResponse>({
    url: WISHLIST_URL,
    method: "GET",
  });
}

export async function addToWishlist(productId: string) {
  const result = await wishlistRequest<WishlistMutationResponse>({
    url: WISHLIST_URL,
    method: "POST",
    data: { productId },
  });
  if (result.status === "success") revalidatePath(WISHLIST_PATH);
  return result;
}

export async function removeFromWishlist(productId: string) {
  const result = await wishlistRequest<WishlistMutationResponse>({
    url: `${WISHLIST_URL}/${productId}`,
    method: "DELETE",
  });
  if (result.status === "success") revalidatePath(WISHLIST_PATH);
  return result;
}