"use client";

import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  IconCheck,
  IconMinus,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import {
  CartErrorResponse,
  CartProductItem,
  CartResponse,
} from "../types/cart.types";
import { removeCartItem, updateCartItemCount } from "../server/cart.action";
import { setCartSummary } from "../slices/cart.slice";

export default function CartItem({
  productInfo,
}: {
  productInfo: CartProductItem;
}) {
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const { count, price, product } = productInfo;
  const { id, category, imageCover, quantity, title } = product;

  const inStock = quantity > 0;
  const canDecrease = count > 1 && !isPending;
  const canIncrease = count < quantity && !isPending;
  const productHref = `/products/${id}`;

  const closeConfirm = () => setShowConfirm(false);

  useEffect(() => {
    if (!showConfirm) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowConfirm(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [showConfirm]);

  const syncCart = (result: CartResponse | CartErrorResponse) => {
    if (result.status === "success") {
      dispatch(
        setCartSummary({
          numOfCartItems: result.numOfCartItems,
          totalCartPrice: result.data.totalCartPrice,
        }),
      );
      return true;
    }
    toast.error(result.message);
    return false;
  };

  const handleUpdate = (newCount: number) =>
    startTransition(async () => {
      syncCart(await updateCartItemCount(id, newCount));
    });

  const handleRemove = () => {
    closeConfirm();
    startTransition(async () => {
      const ok = syncCart(await removeCartItem(id));
      if (ok) toast.success("Item removed from your cart");
    });
  };

  return (
    <>
      <div
        className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex gap-4 sm:gap-6 hover:shadow-md transition-all ${
          isPending ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        <div className="relative shrink-0 h-fit pb-3">
          <Link
            href={productHref}
            className="relative block w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden"
          >
            <Image
              src={imageCover}
              alt={title}
              fill
              sizes="128px"
              className="object-contain p-2"
            />
          </Link>

          <span
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              inStock ? "bg-primary-600" : "bg-red-600"
            }`}
          >
            {inStock ? (
              <IconCheck size={11} stroke={3} />
            ) : (
              <IconX size={11} stroke={3} />
            )}
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <Link href={productHref}>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 hover:text-primary-600 transition-colors">
              {title}
            </h3>
          </Link>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="bg-primary-50 text-primary-700 font-medium px-3 py-1 rounded-full sm:text-sm">
              {category.name}
            </span>
            <span>· SKU: {id.slice(-6)}</span>
          </div>

          <p className="mt-2 text-primary-600 font-bold sm:text-lg">
            {price.toLocaleString()} EGP
            <span className="ml-1.5 text-xs font-normal text-gray-500">
              per unit
            </span>
          </p>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={!canDecrease}
                onClick={() => handleUpdate(count - 1)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <IconMinus size={16} />
              </button>

              <span className="w-10 text-center font-semibold text-gray-900">
                {count}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                disabled={!canIncrease}
                onClick={() => handleUpdate(count + 1)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-600 text-white hover:bg-primary-700 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <IconPlus size={16} />
              </button>
            </div>

            <div className="ml-auto flex items-center gap-3 sm:gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {(count * price).toLocaleString()}{" "}
                  <span className="text-sm font-normal text-gray-500">EGP</span>
                </p>
              </div>

              <button
                type="button"
                aria-label="Remove item"
                disabled={isPending}
                onClick={() => setShowConfirm(true)}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-red-50 text-red-500 ring-1 ring-red-100 hover:bg-red-500 hover:text-white active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <IconTrash size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showConfirm &&
        createPortal(
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={`remove-title-${id}`}
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
          >
            <div
              onClick={closeConfirm}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
              <button
                type="button"
                aria-label="Close"
                onClick={closeConfirm}
                className="absolute right-3 top-3 flex size-8 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <IconX size={18} />
              </button>

              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 text-red-500 ring-8 ring-red-50/60">
                <IconTrash size={28} />
              </span>

              <h3
                id={`remove-title-${id}`}
                className="mt-5 text-xl font-bold text-gray-900"
              >
                Remove this item?
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                It will be removed from your cart.
              </p>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-gray-50 p-3 text-left">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-white">
                  <Image
                    src={imageCover}
                    alt={title}
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {count} × {price.toLocaleString()} EGP
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  autoFocus
                  onClick={closeConfirm}
                  className="h-12 cursor-pointer rounded-xl border border-gray-200 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500 font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:bg-red-600 active:scale-[0.97]"
                >
                  <IconTrash size={18} />
                  Remove
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}