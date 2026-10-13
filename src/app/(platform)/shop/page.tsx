import Link from "next/link";
import { IconShoppingBag } from "@tabler/icons-react";
import ProductCard from "@/features/products/components/ProductCard";
import getAllProducts from "@/features/products/services/getAllProducts";
import Reveal from "@/components/Animations/Reveal";

export const metadata = {
  title: "Shop - FreshCart",
  description: "Browse all our products in one place.",
};

export default async function ShopPage() {
  const productsResponse = await getAllProducts();
  const products = productsResponse?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        <Reveal from="bottom">
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">Shop</span>
          </nav>
        </Reveal>

        <Reveal delay={0.1} from="bottom">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
                <span className="flex size-12 items-center justify-center rounded-xl bg-linear-to-r from-primary-600 to-primary-700 text-white">
                  <IconShoppingBag stroke={2} />
                </span>
                All Products
              </h1>
              <p className="mt-2 text-gray-500">
                Browse our complete collection of products and find exactly what you need.
              </p>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              Showing {products.length} products
            </div>
          </div>
        </Reveal>

        {products.length === 0 ? (
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
              <p className="text-gray-500 text-lg">No products found at the moment.</p>
              <Link href="/" className="mt-4 inline-block font-medium text-primary-600 hover:underline">
                Back to Home
              </Link>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((product: any, index: number) => (
              <Reveal key={product.id} delay={Math.min(index, 12) * 0.05}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}