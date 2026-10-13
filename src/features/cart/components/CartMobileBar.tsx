import Link from "next/link";
import { IconLock } from "@tabler/icons-react";
import { calcTotals, formatEGP } from "../utils/pricing";

export default function CartMobileBar({
  products,
}: {
  products: { price: number; count: number }[];
}) {
  const { total, itemsCount } = calcTotals(products);

  return (
    <div className="sticky bottom-0 z-30 -mx-4 mt-6 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-6px_20px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <p className="text-xs text-gray-500">
            {itemsCount} {itemsCount === 1 ? "item" : "items"}
          </p>
          <p className="text-xl font-bold text-gray-900">
            {formatEGP(total)}{" "}
            <span className="text-xs font-normal text-gray-500">EGP</span>
          </p>
        </div>
        <Link
          href="/checkout"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 font-semibold text-white shadow-lg shadow-primary-600/25 transition-transform active:scale-[0.98]"
        >
          <IconLock size={18} />
          Checkout
        </Link>
      </div>
    </div>
  );
}