"use client";

import { useSelector } from "react-redux";
import { AppState } from "@/store/store";

export default function CartBadge() {
  const numOfCartItems = useSelector(
    (state: AppState) => state.cartReducer.numOfCartItems,
  );

  return (
    <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-primary-600 text-white text-[11px] font-semibold">
      {numOfCartItems}
    </span>
  );
}