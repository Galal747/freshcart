import {
  BrandSummary,
  PaginationMetadata,
} from "@/features/products/types/products.types";

export type Brand = BrandSummary;

export interface BrandsApiResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Brand[];
}

export interface BrandApiResponse {
  data: Brand;
}