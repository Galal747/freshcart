import Link from "next/link";
import { IconArrowLeft, IconReceipt2 } from "@tabler/icons-react";
import { getCartItems } from "@/features/cart/server/cart.action";
import CheckoutForm from "../components/CheckoutForm";

export default async function CheckoutScreen() {
  const cartResponse = await getCartItems();

  if (
    cartResponse.status !== "success" ||
    cartResponse.data.products.length === 0
  ) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="mb-4 text-gray-600">
          Your cart is empty (or you are not logged in).
        </p>
        <Link href="/" className="font-medium text-primary-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const { products } = cartResponse.data;
const cartId = String(cartResponse.data._id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-primary-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/cart" className="transition hover:text-primary-600">
            Cart
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Checkout</span>
        </nav>

        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
              <span className="flex size-12 items-center justify-center rounded-xl bg-linear-to-r from-primary-600 to-primary-700 text-white">
                <IconReceipt2 stroke={2} />
              </span>
              Complete Your Order
            </h1>
            <p className="mt-2 text-gray-500">
              Review your items and complete your purchase
            </p>
          </div>

          <Link
            href="/cart"
            className="flex items-center gap-2 font-medium text-primary-600 hover:underline"
          >
            <IconArrowLeft size={18} />
            Back to Cart
          </Link>
        </div>

        <CheckoutForm cartId={cartId} products={products} />
      </div>
    </div>
  );
}