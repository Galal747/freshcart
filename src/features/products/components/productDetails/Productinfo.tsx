"use client";

import { useState } from "react";
import Link from "next/link";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import {
  IconBolt,
  IconCheck,
  IconChevronRight,
  IconHeart,
  IconHeartFilled,
  IconHome,
  IconMessageCircle,
  IconMinus,
  IconPackage,
  IconPlus,
  IconRotate,
  IconShare,
  IconShieldCheck,
  IconShoppingCart,
  IconStar,
  IconStarFilled,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { ProductDetails } from "../../types/productDetails.types";

type TabId = "details" | "reviews" | "shipping";

const features = [
  { icon: IconTruckDelivery, title: "Free Delivery", text: "Orders over $50" },
  { icon: IconRotate, title: "30 Days Return", text: "Money back" },
  { icon: IconShieldCheck, title: "Secure Payment", text: "100% Protected" },
];

const tabs = [
  { id: "details", label: "Product Details", icon: IconPackage },
  { id: "reviews", label: "Reviews", icon: IconStar },
  { id: "shipping", label: "Shipping & Returns", icon: IconTruckDelivery },
] as const;

const keyFeatures = [
  "Premium Quality Product",
  "100% Authentic Guarantee",
  "Fast & Secure Packaging",
  "Quality Tested",
];

const shippingPoints = [
  "Free shipping on orders over $50",
  "Standard delivery: 3-5 business days",
  "Express delivery available (1-2 business days)",
  "Track your order in real-time",
];

const returnPoints = [
  "30-day hassle-free returns",
  "Full refund or exchange available",
  "Free return shipping on defective items",
  "Easy online return process",
];

const ratingBreakdown = [
  { star: 5, percent: 25 },
  { star: 4, percent: 60 },
  { star: 3, percent: 25 },
  { star: 2, percent: 5 },
  { star: 1, percent: 5 },
];

export default function Productinfo({ productInfo }: { productInfo: ProductDetails }) {
  const {
    title,
    description,
    price,
    priceAfterDiscount,
    quantity,
    sold,
    ratingsAverage,
    ratingsQuantity,
    images,
    imageCover,
    category,
    subcategory,
    brand,
  } = productInfo;

  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("details");

  const gallery = images?.length ? images : [imageCover];
  const galleryItems = gallery.map((img) => ({
    original: img,
    thumbnail: img,
    originalAlt: title,
    thumbnailAlt: title,
  }));

  const hasDiscount = !!priceAfterDiscount && priceAfterDiscount < price;
  const currentPrice = hasDiscount ? priceAfterDiscount : price;
  const discountPercent = hasDiscount ? Math.round(((price - currentPrice) / price) * 100) : 0;
  const inStock = quantity > 0;
  const total = (currentPrice * qty).toFixed(2);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {

    }
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500 sm:gap-2 sm:text-sm">
          <li>
            <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-primary-600">
              <IconHome size={16} />
              Home
            </Link>
          </li>
          {category?.name && (
            <>
              <IconChevronRight size={14} className="text-gray-400" />
              <li>{category.name}</li>
            </>
          )}
          <IconChevronRight size={14} className="text-gray-400" />
          <li className="min-w-0 max-w-55 truncate font-medium text-gray-800 sm:max-w-md">{title}</li>
        </ol>
      </nav>

      <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
        <div className="min-w-0 lg:col-span-5 xl:col-span-4">
          <div className="product-gallery rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5">
            <ImageGallery
              items={galleryItems}
              autoPlay
              slideInterval={3000}
              slideDuration={450}
              showPlayButton={false}
              showFullscreenButton={gallery.length > 0}
              showNav={gallery.length > 1}
              showThumbnails={gallery.length > 1}
              lazyLoad
              useBrowserFullscreen={false}
            />
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7 xl:col-span-8">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <div className="flex flex-wrap gap-2">
              {category?.name && (
                <span className="rounded-full bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 sm:text-sm">
                  {category.name}
                </span>
              )}
              {brand?.name && (
                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 sm:text-sm">
                  {brand.name}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              {title}
            </h1>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-yellow-400" aria-label={`Rated ${ratingsAverage} out of 5`}>
                {[1, 2, 3, 4, 5].map((n) =>
                  n <= Math.round(ratingsAverage) ? (
                    <IconStarFilled key={n} size={20} />
                  ) : (
                    <IconStar key={n} size={20} stroke={1.8} />
                  )
                )}
              </div>
              <span className="text-sm text-gray-600">
                {ratingsAverage} ({ratingsQuantity} reviews)
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-3xl font-bold text-gray-900 sm:text-4xl">{currentPrice} EGP</p>
              {hasDiscount && (
                <>
                  <span className="text-base text-gray-400 line-through sm:text-lg">{price} EGP</span>
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white sm:text-sm">
                    Save {discountPercent}%
                  </span>
                </>
              )}
            </div>

            <div
              className={`mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                inStock ? "bg-primary-50 text-primary-700" : "bg-red-50 text-red-600"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${inStock ? "bg-primary-600" : "bg-red-500"}`} />
              {inStock ? "In Stock" : "Out of Stock"}
            </div>

            <hr className="my-6 border-gray-100" />

            <p className="text-sm leading-7 text-gray-600 sm:text-base">{description}</p>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-gray-700">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex h-12 items-center rounded-xl border border-gray-200 sm:h-14">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="flex h-full w-11 items-center justify-center text-gray-500 transition-colors hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 sm:w-12"
                  >
                    <IconMinus size={18} />
                  </button>
                  <span className="w-10 text-center font-semibold text-gray-900" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(quantity, q + 1))}
                    disabled={qty >= quantity}
                    className="flex h-full w-11 items-center justify-center text-gray-500 transition-colors hover:text-primary-600 disabled:cursor-not-allowed disabled:opacity-40 sm:w-12"
                  >
                    <IconPlus size={18} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">{quantity} available</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-4 sm:px-5 sm:py-5">
              <span className="text-gray-700">Total Price:</span>
              <span className="text-xl font-bold text-primary-600 sm:text-2xl">{total} EGP</span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
              <button
                type="button"
                disabled={!inStock}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary-600 font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 hover:bg-primary-700 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:h-14"
              >
                <IconShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                type="button"
                disabled={!inStock}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gray-900 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-black active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:h-14"
              >
                <IconBolt size={20} />
                Buy Now
              </button>
            </div>

            <div className="mt-3 flex gap-3 sm:mt-4">
              <button
                type="button"
                aria-pressed={wished}
                onClick={() => setWished((w) => !w)}
                className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border font-medium transition-all active:scale-[0.98] sm:h-14 ${
                  wished
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                {wished ? <IconHeartFilled size={20} /> : <IconHeart size={20} stroke={1.8} />}
                {wished ? "Added to Wishlist" : "Add to Wishlist"}
              </button>
              <button
                type="button"
                aria-label="Share product"
                onClick={handleShare}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition-all hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 active:scale-95 sm:h-14 sm:w-14"
              >
                <IconShare size={20} stroke={1.8} />
              </button>
            </div>

            <hr className="my-6 border-gray-100" />

            <ul className="grid gap-4 sm:grid-cols-3">
              {features.map(({ icon: Icon, title: featureTitle, text }) => (
                <li key={featureTitle} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                    <Icon size={22} stroke={1.8} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{featureTitle}</p>
                    <p className="text-xs text-gray-500">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:mt-8">
        {/* Tab buttons */}
        <div
          role="tablist"
          className="flex overflow-x-auto border-b border-gray-100 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(id)}
                className={`-mb-px flex shrink-0 items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition-colors sm:px-8 sm:text-base ${
                  active
                    ? "border-primary-600 bg-primary-50/60 text-primary-600"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} />
                {label}
                {id === "reviews" && ` (${ratingsQuantity})`}
              </button>
            );
          })}
        </div>

        <div role="tabpanel" className="p-4 sm:p-6 lg:p-8">
          {activeTab === "details" && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">About this Product</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">{description}</p>

              <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
                  <h4 className="mb-4 font-semibold text-gray-900">Product Information</h4>
                  <dl className="space-y-3 text-sm">
                    {[
                      ["Category", category?.name],
                      ["Subcategory", subcategory?.[0]?.name],
                      ["Brand", brand?.name],
                      ["Items Sold", sold ? `${sold}+ sold` : undefined],
                    ]
                      .filter(([, value]) => value)
                      .map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4">
                          <dt className="text-gray-500">{label}</dt>
                          <dd className="text-right font-medium text-gray-900">{value}</dd>
                        </div>
                      ))}
                  </dl>
                </div>

                <div className="rounded-xl bg-gray-50 p-4 sm:p-5">
                  <h4 className="mb-4 font-semibold text-gray-900">Key Features</h4>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {keyFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <IconCheck size={18} className="shrink-0 text-primary-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
                <div className="flex shrink-0 flex-col items-center text-center">
                  <p className="text-5xl font-bold text-gray-900">{ratingsAverage}</p>
                  <div className="mt-2 flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((n) =>
                      n <= Math.round(ratingsAverage) ? (
                        <IconStarFilled key={n} size={20} />
                      ) : (
                        <IconStar key={n} size={20} stroke={1.8} />
                      )
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Based on {ratingsQuantity} reviews</p>
                </div>

                <div className="w-full flex-1 space-y-2.5">
                  {ratingBreakdown.map(({ star, percent }) => (
                    <div key={star} className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="w-12 shrink-0 whitespace-nowrap">{star} star</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div className="h-full rounded-full bg-yellow-400" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="w-10 shrink-0 text-right">{percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="my-6 border-gray-100" />

              <div className="flex flex-col items-center py-6 text-center text-gray-500">
                <IconMessageCircle size={40} stroke={1.5} className="text-gray-300" />
                <p className="mt-3 font-medium text-gray-700">No written reviews yet</p>
                <p className="text-sm">Be the first to share your thoughts about this product.</p>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {[
                  { icon: IconTruckDelivery, title: "Shipping Information", points: shippingPoints },
                  { icon: IconRotate, title: "Returns & Refunds", points: returnPoints },
                ].map(({ icon: Icon, title: boxTitle, points }) => (
                  <div key={boxTitle} className="rounded-xl bg-primary-50 p-4 sm:p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white sm:h-14 sm:w-14">
                        <Icon size={24} />
                      </span>
                      <h4 className="font-semibold text-gray-900 sm:text-lg">{boxTitle}</h4>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                      {points.map((p) => (
                        <li key={p} className="flex items-center gap-3">
                          <IconCheck size={18} className="shrink-0 text-primary-600" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4 sm:items-center sm:p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-700 sm:h-14 sm:w-14">
                  <IconShieldCheck size={24} />
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900">Buyer Protection Guarantee</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Get a full refund if your order doesn&apos;t arrive or isn&apos;t as described. We ensure
                    your shopping experience is safe and secure.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}