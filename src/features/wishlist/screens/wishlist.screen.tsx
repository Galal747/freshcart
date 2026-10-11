import Link from "next/link";
import ProductCard from "@/features/products/components/ProductCard"; 
import { getWishlist } from "../server/wishlist.action";

export default async function WishlistScreen() {
  const response = await getWishlist();

  if (response.status !== "success") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {response.message}
        </h2>
        <Link
          href="/login"
          className="mt-4 inline-block font-medium text-primary-600 hover:text-primary-700"
        >
          Login
        </Link>
      </div>
    );
  }

  const products = response.data;

  return (
    <section className="bg-gray-50 py-8 sm:py-10">
      <div className="container mx-auto px-4">
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-primary-600">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Wishlist</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="mb-8 mt-2 text-gray-500">
          {response.count} {response.count === 1 ? "item" : "items"} saved
        </p>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
            <p className="mb-4 text-gray-500">Your wishlist is empty</p>
            <Link
              href="/"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Continue Shopping
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