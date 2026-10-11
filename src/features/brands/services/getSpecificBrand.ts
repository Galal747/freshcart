import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { BrandApiResponse } from "../types/brands.types";

export async function getSpecificBrand(id: string): Promise<BrandApiResponse> {
  const options: AxiosRequestConfig = {
    url: `/brands/${id}`,
    method: "GET",
  };

  const { data } = await apiClient.request(options);
  return data;
}