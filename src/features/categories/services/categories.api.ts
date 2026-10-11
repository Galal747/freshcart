const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

export interface CategoryInfo {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CategoryProduct {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string };
}

export async function getCategoryById(
  categoryId: string,
): Promise<CategoryInfo | null> {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const json = await res.json();
    return json.data ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductsByCategory(
  categoryId: string,
): Promise<CategoryProduct[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/products?category[in]=${categoryId}`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) return [];

    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
}