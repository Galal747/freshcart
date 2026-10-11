import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { ProductsApiResponse } from "@/features/products/types/products.types";

export async function getProductsByBrand(
  brandId: string,
): Promise<ProductsApiResponse> {
  const options: AxiosRequestConfig = {
    url: "/products",
    method: "GET",
    params: { brand: brandId },
  };

  const { data } = await apiClient.request(options);
  return data;
}