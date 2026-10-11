import { IconGardenCart } from "@tabler/icons-react";
import Link from "next/link";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import ClearCartButton from "../components/ClearCartButton";
import { getCartItems } from "../server/cart.action";

export default async function CartScreen() {
  const cartResponse = await getCartItems();

  if (cartResponse.status !== "success") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          حصل مشكلة، حاول تاني
        </h2>
      </div>
    );
  }

  const products = cartResponse.data.products;
  const numOfCartItems = cartResponse.numOfCartItems;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>

          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="bg-linear-to-r from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
              <IconGardenCart stroke={2} />
            </span>
            Shopping Cart
          </h1>
          <p className="text-gray-500 mt-2">
            You have{" "}
            <span className="font-semibold text-primary-600">
              {numOfCartItems}
            </span>{" "}
            {numOfCartItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {numOfCartItems === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {products.map((item) => (
                  <CartItem key={item._id} productInfo={item} />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <Link
                  href="/"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2 transition-colors"
                >
                  <span>←</span> Continue Shopping
                </Link>
                <ClearCartButton />
              </div>
            </div>

            <div className="lg:col-span-1">
              <CartSummary products={products} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}