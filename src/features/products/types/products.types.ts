export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface CategorySummary {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface BrandSummary {
  _id: string;
  name: string;
  slug: string;
  image: string;
}



export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  sold: number;
  images: string[];
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  subcategory: Subcategory[];
  category: CategorySummary;
  brand: BrandSummary;
  availableColors?: string[];
  createdAt: string;
  updatedAt: string;

}


export interface ProductsApiResponse {
  results: number;
  metadata: PaginationMetadata;
  data: Product[];
}
