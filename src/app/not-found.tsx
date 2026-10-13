import Link from "next/link";
import {
  IconCategory,
  IconCompass,
  IconHome,
  IconPackage,
  IconShoppingBag,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import Reveal from "@/components/Animations/Reveal";

export const metadata = { title: "Page not found | FreshCart" };

const quickLinks = [
  { href: "/categories", label: "Categories", icon: IconCategory },
  { href: "/cart", label: "My Cart", icon: IconShoppingCart },
  { href: "/orders", label: "My Orders", icon: IconPackage },
  { href: "/profile", label: "My Account", icon: IconUser },
];

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-10 sm:py-16">
      <Reveal className="w-full max-w-xl text-center">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-8 ring-primary-50/60">
          <IconCompass size={38} />
        </span>

        <p className="mt-6 bg-linear-to-r from-primary-600 to-primary-500 bg-clip-text text-8xl font-extrabold leading-none text-transparent sm:text-9xl">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          Oops! This page is out of stock
        </h1>
        <p className="mx-auto mt-3 max-w-md text-gray-500">
          The page you are looking for doesn&apos;t exist, was moved, or the
          link is incorrect. Let&apos;s get you back to shopping.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-6 font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 active:scale-[0.98] sm:w-auto"
          >
            <IconHome size={18} />
            Back to Home
          </Link>
          <Link
            href="/products"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 font-semibold text-gray-700 transition-colors hover:border-primary-600 hover:text-primary-600 sm:w-auto"
          >
            <IconShoppingBag size={18} />
            Browse Shop
          </Link>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="mb-4 text-sm text-gray-400">Or jump to</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-gray-600">
            {quickLinks.map(({ href, label, icon: LinkIcon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-1.5 transition-colors hover:text-primary-600"
                >
                  <LinkIcon size={16} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </main>
  );
}