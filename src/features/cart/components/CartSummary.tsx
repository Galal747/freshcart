import Link from "next/link";
import {
  IconArrowLeft,
  IconLock,
  IconShieldCheck,
  IconShoppingBag,
  IconTag,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { calcTotals, formatEGP } from "../utils/pricing";

type CartSummaryProps = {
  products: { price: number; count: number }[];
};

export default function CartSummary({ products }: CartSummaryProps) {
  const {
    itemsCount,
    subtotal,
    isFreeShipping,
    shipping,
    remaining,
    progress,
    total,
  } = calcTotals(products);

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-28">
      <div className="bg-linear-to-r from-primary-600 to-primary-700 text-white px-6 py-5">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <IconShoppingBag size={20} />
          Order Summary
        </h2>
        <p className="text-sm text-white/90 mt-1">
          {itemsCount} {itemsCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="p-6">
        <div
          className={`rounded-xl p-4 ${
            isFreeShipping ? "bg-primary-50" : "bg-orange-50"
          }`}
        >
          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              isFreeShipping ? "text-primary-700" : "text-gray-700"
            }`}
          >
            <IconTruckDelivery
              size={20}
              className={isFreeShipping ? "text-primary-600" : "text-orange-500"}
            />
            {isFreeShipping ? (
              <span>You qualify for free shipping!</span>
            ) : (
              <span>Add {formatEGP(remaining)} EGP for free shipping</span>
            )}
          </div>
          <div
            className={`mt-3 h-2 w-full overflow-hidden rounded-full ${
              isFreeShipping ? "bg-primary-100" : "bg-orange-100"
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFreeShipping
                  ? "bg-primary-600"
                  : "bg-linear-to-r from-orange-500 to-amber-400"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <dl className="mt-5 space-y-3 text-gray-600">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-medium text-gray-900">
              {formatEGP(subtotal)} EGP
            </dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd
              className={`font-medium ${
                isFreeShipping ? "text-primary-600" : "text-gray-900"
              }`}
            >
              {isFreeShipping ? "FREE" : `${formatEGP(shipping)} EGP`}
            </dd>
          </div>
        </dl>

        <hr className="my-4 border-dashed border-gray-200" />

        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatEGP(total)}{" "}
            <span className="text-sm font-normal text-gray-500">EGP</span>
          </span>
        </div>

        <button
          type="button"
          className="mt-5 w-full h-12 flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary-600/50 bg-primary-50/50 text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors cursor-pointer"
        >
          <IconTag size={18} />
          Apply Promo Code
        </button>

        <Link
          href="/checkout"
          className="mt-4 h-14 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 text-white font-semibold shadow-lg shadow-primary-600/25 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
        >
          <IconLock size={20} />
          Secure Checkout
        </Link>

        <div className="mt-5 flex items-center justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <IconShieldCheck size={15} className="text-primary-600" />
            Secure Payment
          </span>
          <span className="w-px h-4 bg-gray-200" />
          <span className="flex items-center gap-1.5">
            <IconTruckDelivery size={15} className="text-blue-500" />
            Fast Delivery
          </span>
        </div>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-primary-600 hover:underline"
        >
          <IconArrowLeft size={16} />
          Continue Shopping
        </Link>
      </div>
    </aside>
  );
}