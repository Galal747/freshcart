import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { BrandsApiResponse } from "../types/brands.types";

export default async function getAllBrands(): Promise<BrandsApiResponse> {
  const options: AxiosRequestConfig = {
    url: "/brands",
    method: "GET",
    params: { limit: 100 },
  };

  const { data } = await apiClient.request(options);
  return data;
}