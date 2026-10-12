import lightLogo from "../../assets/images/freshcart-logo.svg";
import miniLogo from "../../assets/images/mini-logo.png";
import Link from "next/link";
import Image from "next/image";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandTwitter,
} from "@tabler/icons-react";

type FooterLink = {
  label: string;
  href?: string;
};

const linkCls =
  "inline-block text-sm sm:text-base text-gray-600 hover:text-primary-600 transition-colors duration-200";

const categories: FooterLink[] = [
  { label: "Men's Fashion", href: "/category/6439d5b90049ad0b52b90048" },
  { label: "Women's Fashion", href: "/category/6439d58a0049ad0b52b9003f" },
  { label: "Baby & Toys", href: "/category/6439d40367d9aa4ca97064cc" },
  { label: "Beauty & Health", href: "/category/6439d30b67d9aa4ca97064b1" },
  { label: "Electronics", href: "/category/6439d2d167d9aa4ca970649f" },
];

const quickLinks: FooterLink[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "mailto:support@freshcart.com" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  {
    label: "Shipping Policy",
    href: "/terms-of-service#shipping-and-delivery",
  },
];

const customerService: FooterLink[] = [
  { label: "My Account", href: "/profile" },
  { label: "My Orders", href: "/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Returns & Refunds", href: "/return-policy" },
  { label: "Help Center", href: "mailto:support@freshcart.com" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    Icon: IconBrandFacebook,
  },
  {
    label: "Twitter",
    href: "https://x.com/",
    Icon: IconBrandTwitter,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: IconBrandInstagram,
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/",
    Icon: IconBrandPinterest,
  },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">
        {title}
      </h3>

      <ul className="space-y-2.5 sm:space-y-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            {href ? (
              href.startsWith("mailto:") ? (
                <a href={href} className={linkCls}>
                  {label}
                </a>
              ) : (
                <Link href={href} className={linkCls}>
                  {label}
                </Link>
              )
            ) : (
              <span className="text-sm text-gray-600 sm:text-base">
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      id="footer"
      className="mt-auto border-t border-gray-200 bg-white pt-8 sm:pt-10 lg:pt-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-5 lg:gap-x-8">
          {/* Brand */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-2">
            <Link href="/" className="mb-4 inline-block sm:mb-5">
              <Image
                src={lightLogo}
                alt="FreshCart Logo"
                priority={false}
                className="h-auto w-32 sm:w-36 lg:w-40"
                sizes="(max-width: 640px) 128px, 160px"
              />
            </Link>

            <p className="mb-5 max-w-lg text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              FreshCart is a versatile e-commerce platform offering a wide
              range of products, from clothing to electronics. It provides a
              user-friendly experience for seamless shopping across diverse
              categories.
            </p>

            {/* Social Media */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-primary-600"
                >
                  <Icon size={21} stroke={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Columns */}
          <FooterColumn title="Categories" links={categories} />
          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn
            title="Customer Service"
            links={customerService}
          />
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 py-5 sm:mt-10 sm:py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-start">
            <p className="text-xs leading-5 text-gray-600 sm:text-sm">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 md:justify-end">
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-primary-600"
              >
                Privacy
              </Link>

              <Link
                href="/terms-of-service"
                className="transition-colors hover:text-primary-600"
              >
                Terms
              </Link>

              <Image
                src={miniLogo}
                alt="FreshCart Mini Logo"
                className="size-6 shrink-0 object-contain"
                sizes="24px"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}