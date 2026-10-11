import BrandProductsScreen from "@/features/brands/screens/brand-products.screen";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;

  return <BrandProductsScreen brandId={brandId} />;
}