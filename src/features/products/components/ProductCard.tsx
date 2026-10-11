"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  IconEye,
  IconHeart,
  IconHeartFilled,
  IconPlus,
  IconRefresh,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { addProductToCart } from "@/features/cart/server/cart.action";
import { setCartSummary } from "@/features/cart/slices/cart.slice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/server/wishlist.action";
import { setWishlistIds } from "@/features/wishlist/slices/wishlist.slice";
import { AppState } from "@/store/store";
import { toast } from "sonner";

export interface Product {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: { name: string };
}

const EMPTY_IDS: string[] = [];

const actionBase =
  "flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-gray-100 transition-all duration-300 hover:scale-110 active:scale-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-9 sm:w-9";

const reveal =
  "lg:translate-x-2 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 lg:focus-visible:translate-x-0 lg:focus-visible:opacity-100";

export default function ProductCard({ product }: { product: Product }) {
  const {
    id,
    title,
    imageCover,
    price,
    ratingsAverage,
    ratingsQuantity,
    category,
  } = product;

  const wishlistIds = useSelector(
    (state: AppState) => state.wishlistReducer?.ids ?? EMPTY_IDS,
  );
  const wished = wishlistIds.includes(id);

  const [isAdding, setIsAdding] = useState(false);
  const [isWishing, setIsWishing] = useState(false);
  const dispatch = useDispatch();

  async function handleAddToCart() {
    setIsAdding(true);
    const response = await addProductToCart(id);
    setIsAdding(false);

    if (response.status !== "success") {
      toast.error(response.message);
      return;
    }

    dispatch(setCartSummary({ numOfCartItems: response.numOfCartItems }));
    toast.success(response.message);
  }

  async function handleToggleWishlist() {
    setIsWishing(true);
    const response = wished
      ? await removeFromWishlist(id)
      : await addToWishlist(id);
    setIsWishing(false);

    if (response.status !== "success") {
      toast.error(response.message);
      return;
    }

    dispatch(setWishlistIds(response.data));
    toast.success(response.message);
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-white p-4">
        <Link href={`/products/${id}`} className="block h-full w-full">
          <Image
            src={imageCover}
            alt={title}
            fill
            sizes="(min-width:1280px) 20vw, (min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            aria-label={
              wished
                ? `Remove ${title} from wishlist`
                : `Add ${title} to wishlist`
            }
            aria-pressed={wished}
            onClick={handleToggleWishlist}
            disabled={isWishing}
            className={`${actionBase} ${
              wished
                ? "text-red-500 ring-red-200 lg:translate-x-0 lg:opacity-100"
                : `text-gray-600 hover:bg-red-50 hover:text-red-500 ${reveal}`
            }`}
          >
            {wished ? (
              <IconHeartFilled size={16} />
            ) : (
              <IconHeart size={16} stroke={1.8} />
            )}
          </button>

          <button
            type="button"
            aria-label={`Compare ${title}`}
            className={`${actionBase} ${reveal} delay-75 text-gray-600 hover:bg-primary-600 hover:text-white`}
          >
            <IconRefresh size={16} stroke={1.8} />
          </button>

          <Link
            href={`/products/${id}`}
            aria-label={`View ${title}`}
            className={`${actionBase} ${reveal} delay-150 text-gray-600 hover:bg-primary-600 hover:text-white`}
          >
            <IconEye size={16} stroke={1.8} />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
        <span className="text-xs text-gray-500">{category?.name}</span>

        <Link href={`/products/${id}`}>
          <h3 className="line-clamp-1 text-sm font-medium text-gray-800 transition-colors group-hover:text-primary-600 sm:text-base">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5">
          <div
            className="flex text-yellow-400"
            aria-label={`Rated ${ratingsAverage} out of 5`}
          >
            {[1, 2, 3, 4, 5].map((n) =>
              n <= Math.round(ratingsAverage) ? (
                <IconStarFilled key={n} size={16} />
              ) : (
                <IconStar key={n} size={16} stroke={1.8} />
              ),
            )}
          </div>
          <span className="text-xs text-gray-500">
            {ratingsAverage} ({ratingsQuantity})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-base font-bold text-gray-900 sm:text-lg">
            {price} EGP
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            aria-label={`Add ${title} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white transition-all duration-200 hover:scale-110 hover:bg-primary-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed sm:h-10 sm:w-10"
          >
            <IconPlus size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}