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

type FooterLink = { label: string; href?: string };

const linkCls = "text-gray-600 hover:text-primary-600 transition-colors";

// نفس الـ ids المستخدمة في الـ Navbar
const categories: FooterLink[] = [
  { label: "Men's Fashion", href: "/category/6439d5b90049ad0b52b90048" },
  { label: "Women's Fashion", href: "/category/6439d58a0049ad0b52b9003f" },
  { label: "Baby & Toys", href: "/category/6439d40367d9aa4ca97064cc" },
  { label: "Beauty & Health", href: "/category/6439d30b67d9aa4ca97064b1" },
  { label: "Electronics", href: "/category/6439d2d167d9aa4ca970649f" },
];

// من غير href = لسه مفيش صفحة ليها (بتظهر كنص عادي)
const quickLinks: FooterLink[] = [
  { label: "About Us" },
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

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="font-bold text-lg mb-3 md:mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            {!href ? (
              <span className="text-gray-600">{label}</span>
            ) : href.startsWith("mailto:") ? (
              <a href={href} className={linkCls}>
                {label}
              </a>
            ) : (
              <Link href={href} className={linkCls}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <footer
        id="footer"
        className="bg-white border-t border-gray-200 pt-8 md:pt-10"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/" className="mb-6 inline-block">
                <Image
                  src={lightLogo}
                  alt="FreshCart Logo"
                  className="w-36 sm:w-40 lg:w-auto h-auto"
                />
              </Link>

              <p className="text-gray-600 mb-4 max-w-xl">
                FreshCart is a versatile e-commerce platform offering a wide
                range of products, from clothing to electronics. It provides a
                user-friendly experience for seamless shopping across diverse
                categories.
              </p>
              <div className="flex flex-wrap gap-4">
                <span
                  aria-label="Facebook"
                  className="text-gray-500 hover:text-primary-600 cursor-pointer"
                >
                  <IconBrandFacebook stroke={2} />
                </span>
                <span
                  aria-label="Twitter"
                  className="text-gray-500 hover:text-primary-600 cursor-pointer"
                >
                  <IconBrandTwitter stroke={2} />
                </span>
                <span
                  aria-label="Instagram"
                  className="text-gray-500 hover:text-primary-600 cursor-pointer"
                >
                  <IconBrandInstagram stroke={2} />
                </span>
                <span
                  aria-label="Pinterest"
                  className="text-gray-500 hover:text-primary-600 cursor-pointer"
                >
                  <IconBrandPinterest stroke={2} />
                </span>
              </div>
            </div>

            <FooterColumn title="Categories" links={categories} />
            <FooterColumn title="Quick Links" links={quickLinks} />
            <FooterColumn title="Customer Service" links={customerService} />
          </div>

          <div className="border-t border-gray-200 mt-8 md:mt-10 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-start">
              <p className="text-gray-600">
                © {new Date().getFullYear()} FreshCart. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary-600 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="hover:text-primary-600 transition-colors"
                >
                  Terms
                </Link>
                <Image
                  src={miniLogo}
                  alt="FreshCart Mini Logo"
                  className="size-6"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}