import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/features/products/components/ProductCard"; 
import {
  getCategoryById,
  getProductsByCategory,
} from "../services/categories.api";

export default async function CategoryProductsScreen({
  categoryId,
}: {
  categoryId: string;
}) {
  const [category, products] = await Promise.all([
    getCategoryById(categoryId),
    getProductsByCategory(categoryId),
  ]);

  if (!category) notFound();

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-primary-600 transition">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/categories"
            className="hover:text-primary-600 transition"
          >
            Categories
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{category.name}</span>
        </nav>

        <div className="mb-8 flex items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white border border-gray-100">
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {category.name}
            </h1>
            <p className="text-gray-500 mt-1">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-500 mb-4">
              No products in this category yet
            </p>
            <Link
              href="/"
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}