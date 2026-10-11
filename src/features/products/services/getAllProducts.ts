import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { ProductsApiResponse } from "../types/products.types";

export default async function getAllProducts():Promise<ProductsApiResponse> {
  const options: AxiosRequestConfig = {
    url: "/products",
    method: "GET",
  };

  const { data } = await apiClient.request(options);
  return data;
}