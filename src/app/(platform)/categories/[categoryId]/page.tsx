import CategoryProductsScreen from "@/features/categories/screens/category-products.screen";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;

  return <CategoryProductsScreen categoryId={categoryId} />;
}