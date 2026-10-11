import { apiClient } from "@/services/apiClient";
import { AxiosRequestConfig } from "axios";
import { CategoriesApiResponse } from "../types/Categories.types";

export async function getAllCategories():Promise<CategoriesApiResponse>{
    const options:AxiosRequestConfig = {
        url: '/categories',
        method: 'GET'
    }

    const { data } = await apiClient.request(options)

    return data 
}