import { IconGardenCart } from "@tabler/icons-react";
import Link from "next/link";
import CartItem from "../components/CartItem";
import CartMobileBar from "../components/CartMobileBar";
import CartSummary from "../components/CartSummary";
import ClearCartButton from "../components/ClearCartButton";
import Reveal from "@/components/Animations/Reveal";
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
    <div className="bg-gray-50 min-h-screen py-5 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="mb-5 sm:mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-3 sm:mb-4">
            <Link href="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>

          <Reveal from="left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="bg-linear-to-r from-primary-600 to-primary-700 text-white size-10 sm:size-12 rounded-xl flex items-center justify-center">
                <IconGardenCart stroke={2} />
              </span>
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              You have{" "}
              <span className="font-semibold text-primary-600">
                {numOfCartItems}
              </span>{" "}
              {numOfCartItems === 1 ? "item" : "items"} in your cart
            </p>
          </Reveal>
        </div>

        {numOfCartItems === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="text-primary-600 font-medium hover:text-primary-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
              
              <div className="lg:col-span-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((item, i) => (
                    <Reveal key={item._id} delay={Math.min(i, 6) * 0.06} className="h-full">
                      <div className="h-full">
                        <CartItem productInfo={item} />
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-5 pt-5 sm:mt-6 sm:pt-6 border-t border-gray-200 flex items-center justify-between">
                  <Link
                    href="/"
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2 transition-colors"
                  >
                    <span>←</span> Continue Shopping
                  </Link>
                  <ClearCartButton />
                </div>
              </div>

              <div className="lg:col-span-4">
                <Reveal from="right" className="lg:sticky lg:top-28">
                  <CartSummary products={products} />
                </Reveal>
              </div>
            </div>

            <CartMobileBar products={products} />
          </>
        )}
      </div>
    </div>
  );
}