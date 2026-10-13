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
import Reveal from "@/components/Animations/Reveal";

type FooterLink = { label: string; href?: string };

const linkCls = "text-gray-600 hover:text-primary-600 transition-colors";

const categories: FooterLink[] = [
  { label: "Men's Fashion", href: "/categories/6439d5b90049ad0b52b90048" },
  { label: "Women's Fashion", href: "/categories/6439d58a0049ad0b52b9003f" },
  { label: "Baby & Toys", href: "/categories/6439d40367d9aa4ca97064cc" },
  { label: "Beauty & Health", href: "/categories/6439d30b67d9aa4ca97064b1" },
  { label: "Electronics", href: "/categories/6439d2d167d9aa4ca970649f" },
];

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
      <h3 className="mb-3 text-base font-bold sm:text-lg md:mb-4">{title}</h3>
      <ul className="space-y-2.5 text-sm sm:space-y-3 sm:text-base">
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
        className="bg-white border-t border-gray-200 pt-6 md:pt-10"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5">
            <Reveal className="col-span-2 sm:col-span-3 lg:col-span-2">
              <Link href="/" className="mb-4 inline-block sm:mb-6">
                <Image
                  src={lightLogo}
                  alt="FreshCart Logo"
                  className="w-32 sm:w-40 lg:w-auto h-auto"
                />
              </Link>

              <p className="mb-4 max-w-xl text-sm text-gray-600 sm:text-base">
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
            </Reveal>

            {/* التعديلات هنا لإخفاء هذه الأقسام على الموبايل */}
            <Reveal delay={0.05} className="hidden sm:block">
              <FooterColumn title="Categories" links={categories} />
            </Reveal>
            <Reveal delay={0.12} className="hidden sm:block">
              <FooterColumn title="Quick Links" links={quickLinks} />
            </Reveal>
            <Reveal delay={0.19} className="hidden sm:block sm:col-span-1">
              <FooterColumn title="Customer Service" links={customerService} />
            </Reveal>
          </div>

          <div className="mt-6 border-t border-gray-200 py-4 sm:mt-8 sm:py-6 md:mt-10">
            <div className="flex flex-col items-center justify-between gap-3 text-center text-sm sm:text-base md:flex-row md:gap-4 md:text-start">
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