import { Product } from "@/features/products/types/products.types";

export interface WishlistResponse {
  status: "success";
  count: number;
  data: Product[];
}

export interface WishlistMutationResponse {
  status: "success";
  message: string;
  data: string[];
}

export interface WishlistErrorResponse {
  status: "fail" | "error";
  message: string;
}