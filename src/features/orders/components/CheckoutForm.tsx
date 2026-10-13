"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IconBuilding,
  IconCash,
  IconCheck,
  IconCreditCard,
  IconHome,
  IconInfoCircle,
  IconMapPin,
  IconPackage,
  IconPhone,
  IconShieldCheck,
  IconShoppingBag,
  IconTruckDelivery,
  type Icon,
} from "@tabler/icons-react";
import {
  createCashOrder,
  createCheckoutSession,
} from "../server/orders.action";
import {
  shippingSchema,
  type ShippingFormValues,
} from "../schemas/shipping.schema";
import { calcTotals, formatEGP } from "@/features/cart/utils/pricing";
import Reveal from "@/components/Animations/Reveal";

type PaymentMethod = "cash" | "card";

export type CheckoutProduct = {
  _id: string;
  count: number;
  price: number;
  product: { title: string; imageCover: string };
};

type Props = { cartId: string; products: CheckoutProduct[] };

const iconBox =
  "absolute left-3 size-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center";
const inputBase =
  "w-full rounded-xl border-2 bg-white ps-16 pe-4 outline-none transition-colors placeholder:text-gray-400 focus:border-primary-600";

function CardHeader({
  icon: HeaderIcon,
  title,
  subtitle,
}: {
  icon: Icon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-linear-to-r from-primary-600 to-primary-700 px-4 py-4 text-white sm:px-6 sm:py-5">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        <HeaderIcon size={20} />
        {title}
      </h2>
      <p className="mt-1 text-sm text-white/90">{subtitle}</p>
    </div>
  );
}

export default function CheckoutForm({ cartId, products }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [values, setValues] = useState<ShippingFormValues>({
    city: "",
    details: "",
    phone: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingFormValues, string>>
  >({});
  const [method, setMethod] = useState<PaymentMethod>("cash");
  const [serverError, setServerError] = useState("");

  const { itemsCount, subtotal, isFreeShipping, shipping, total } =
    calcTotals(products);

  const handleChange =
    (field: keyof ShippingFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const parsed = shippingSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        city: fieldErrors.city?.[0],
        details: fieldErrors.details?.[0],
        phone: fieldErrors.phone?.[0],
      });
      return;
    }
    setErrors({});

    startTransition(async () => {
      if (method === "cash") {
        const res = await createCashOrder(cartId, parsed.data);
        if (!res.success) return setServerError(res.message);
        router.refresh();
        router.push("/orders");
      } else {
        const res = await createCheckoutSession(cartId, parsed.data);
        if (!res.success) return setServerError(res.message);
        window.location.href = res.data.url;
      }
    });
  };

  const borderFor = (field: keyof ShippingFormValues) =>
    errors[field] ? "border-red-400" : "border-gray-200";

  return (
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3 lg:gap-8">
      <form
        id="checkout-form"
        onSubmit={handleSubmit}
        className="space-y-4 lg:col-span-2 lg:space-y-6"
      >
        <Reveal from="left">
<section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <CardHeader
            icon={IconHome}
            title="Shipping Address"
            subtitle="Where should we deliver your order?"
          />

          <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
            <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <IconInfoCircle size={18} />
              </span>
              <div>
                <p className="font-medium text-blue-700">
                  Delivery Information
                </p>
                <p className="text-sm text-blue-600">
                  Please ensure your address is accurate for smooth delivery
                </p>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className={iconBox}>
                  <IconBuilding size={18} />
                </span>
                <input
                  value={values.city}
                  onChange={handleChange("city")}
                  placeholder="e.g. Cairo, Alexandria, Giza"
                  className={`${inputBase} h-12 sm:h-14 ${borderFor("city")}`}
                />
              </div>
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Street Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className={`${iconBox} top-3`}>
                  <IconMapPin size={18} />
                </span>
                <textarea
                  value={values.details}
                  onChange={handleChange("details")}
                  rows={3}
                  placeholder="Street name, building number, floor, apartment..."
                  className={`${inputBase} resize-none py-4 ${borderFor("details")}`}
                />
              </div>
              {errors.details && (
                <p className="mt-1 text-sm text-red-600">{errors.details}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className={iconBox}>
                  <IconPhone size={18} />
                </span>
                <input
                  value={values.phone}
                  onChange={handleChange("phone")}
                  placeholder="01xxxxxxxxx"
                  inputMode="tel"
                  className={`${inputBase} h-12 sm:h-14 pe-4 sm:pe-40 ${borderFor("phone")}`}
                />
                <span className="pointer-events-none absolute right-4 hidden text-xs text-gray-400 sm:block">
                  Egyptian numbers only
                </span>
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>
        </section>
</Reveal>

        <Reveal from="left" delay={0.1}>
<section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <CardHeader
            icon={IconCreditCard}
            title="Payment Method"
            subtitle="Choose how you'd like to pay"
          />

          <div className="space-y-3 p-4 sm:space-y-4 sm:p-6">
            <button
              type="button"
              onClick={() => setMethod("cash")}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 p-4 text-left sm:gap-4 sm:p-5 transition-colors ${
                method === "cash"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                  method === "cash"
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <IconCash size={24} />
              </span>
              <span className="flex-1">
                <span
                  className={`block font-semibold ${
                    method === "cash" ? "text-primary-700" : "text-gray-900"
                  }`}
                >
                  Cash on Delivery
                </span>
                <span className="text-sm text-gray-600">
                  Pay when your order arrives at your doorstep
                </span>
              </span>
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full border-2 ${
                  method === "cash"
                    ? "border-primary-600 bg-primary-600 text-white"
                    : "border-gray-300"
                }`}
              >
                {method === "cash" && <IconCheck size={16} stroke={3} />}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMethod("card")}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 p-4 text-left sm:gap-4 sm:p-5 transition-colors ${
                method === "card"
                  ? "border-primary-600 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
                  method === "card"
                    ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <IconCreditCard size={24} />
              </span>
              <span className="flex-1">
                <span
                  className={`block font-semibold ${
                    method === "card" ? "text-primary-700" : "text-gray-900"
                  }`}
                >
                  Pay Online
                </span>
                <span className="block text-sm text-gray-600">
                  Secure payment with Credit/Debit Card via Stripe
                </span>
                <span className="mt-2 flex gap-2">
                  <span className="rounded bg-blue-700 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    VISA
                  </span>
                  <span className="rounded bg-orange-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    MC
                  </span>
                  <span className="rounded bg-sky-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                    AMEX
                  </span>
                </span>
              </span>
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full border-2 ${
                  method === "card"
                    ? "border-primary-600 bg-primary-600 text-white"
                    : "border-gray-300"
                }`}
              >
                {method === "card" && <IconCheck size={16} stroke={3} />}
              </span>
            </button>

            <div className="flex items-center gap-3 rounded-xl border border-primary-100 bg-primary-50 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <IconShieldCheck size={18} />
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Secure &amp; Encrypted
                </p>
                <p className="text-sm text-primary-700">
                  Your payment info is protected with 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </section>
</Reveal>
      </form>

      <Reveal from="right" className="lg:sticky lg:top-28">
<aside className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <CardHeader
          icon={IconShoppingBag}
          title="Order Summary"
          subtitle={`${itemsCount} ${itemsCount === 1 ? "item" : "items"}`}
        />

        <div className="p-4 sm:p-6">
          <ul className="max-h-56 sm:max-h-72 space-y-3 overflow-y-auto">
            {products.map((item) => (
              <li
                key={item._id}
                className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
              >
                <div className="shrink-0 rounded-lg border border-gray-100 bg-white p-1">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={48}
                    height={48}
                    className="size-12 object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {item.product.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.count} × {formatEGP(item.price)} EGP
                  </p>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {formatEGP(item.price * item.count)}
                </span>
              </li>
            ))}
          </ul>

          <hr className="my-5 border-gray-100" />

          <dl className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="text-gray-900">{formatEGP(subtotal)} EGP</dd>
            </div>
            <div className="flex justify-between">
              <dt className="flex items-center gap-2">
                <IconTruckDelivery size={18} className="text-gray-400" />
                Shipping
              </dt>
              <dd
                className={isFreeShipping ? "text-primary-600" : "text-gray-900"}
              >
                {isFreeShipping ? "FREE" : `${formatEGP(shipping)} EGP`}
              </dd>
            </div>
          </dl>

          <hr className="my-4 border-gray-100" />

          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-3xl font-bold text-primary-600">
              {formatEGP(total)}{" "}
              <span className="text-sm font-normal text-gray-500">EGP</span>
            </span>
          </div>

          {serverError && (
            <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            form="checkout-form"
            disabled={isPending}
            className="mt-5 hidden h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl lg:flex bg-linear-to-r from-primary-600 to-primary-700 font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IconShoppingBag size={20} />
            {isPending
              ? "Processing..."
              : method === "cash"
                ? "Place Order"
                : "Continue to Payment"}
          </button>

          <div className="mt-5 flex items-center justify-center gap-4 border-t border-gray-100 pt-5 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <IconShieldCheck size={15} className="text-primary-600" />
              Secure
            </span>
            <span className="h-4 w-px bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <IconTruckDelivery size={15} className="text-blue-500" />
              Fast Delivery
            </span>
            <span className="h-4 w-px bg-gray-200" />
            <span className="flex items-center gap-1.5">
              <IconPackage size={15} className="text-orange-500" />
              Easy Returns
            </span>
          </div>
        </div>
      </aside>
</Reveal>

      <div className="sticky bottom-0 z-30 -mx-4 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-6px_20px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
        <button
          type="submit"
          form="checkout-form"
          disabled={isPending}
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 font-semibold text-white shadow-lg shadow-primary-600/25 transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <IconShoppingBag size={20} />
          {isPending
            ? "Processing..."
            : `${method === "cash" ? "Place Order" : "Continue to Payment"} · ${formatEGP(total)} EGP`}
        </button>
      </div>
    </div>
  );
}