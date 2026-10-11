import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/features/products/components/ProductCard"; 
import { getSpecificBrand } from "../services/getSpecificBrand";
import { getProductsByBrand } from "../services/getProductsByBrand";

export default async function BrandProductsScreen({
  brandId,
}: {
  brandId: string;
}) {
  const [brandResponse, productsResponse] = await Promise.all([
    getSpecificBrand(brandId).catch(() => null),
    getProductsByBrand(brandId),
  ]);

  if (!brandResponse) notFound();

  const brand = brandResponse.data;
  const products = productsResponse.data;

  return (
    <section className="bg-gray-50 py-8 sm:py-10">
      <div className="container mx-auto px-4">
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-primary-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/brands" className="transition hover:text-primary-600">
            Brands
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">{brand.name}</span>
        </nav>

        <div className="mb-8 flex items-center gap-4">
          <div className="relative h-16 w-24 shrink-0">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{brand.name}</h1>
            <p className="text-gray-500">
              {productsResponse.results}{" "}
              {productsResponse.results === 1 ? "product" : "products"}
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
            <p className="mb-4 text-gray-500">No products found for this brand</p>
            <Link
              href="/brands"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Back to Brands
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}