"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import logo from "../../assets/images/freshcart-logo.svg";
import Image from "next/image";
import {
  IconAddressBook,
  IconBabyCarriage,
  IconChevronDown,
  IconDotsVertical,
  IconGift,
  IconHeadset,
  IconHeart,
  IconId,
  IconLogout,
  IconMail,
  IconMenu2,
  IconPackage,
  IconPhone,
  IconProgressBolt,
  IconReportMedical,
  IconSearch,
  IconSettings,
  IconShirtSport,
  IconShoppingCart,
  IconTruckDelivery,
  IconUser,
  IconUserCircle,
  IconUserPlus,
  IconX,
  type Icon,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { authAction } from "@/features/auth/slices/auth.slice";
import { deleteToken } from "@/features/auth/server/auth.actions";
import { usePathname, useRouter } from "next/navigation";
import CartBadge from "@/features/cart/components/CartBadge";

type NavItem = { href: string; label: string; icon: Icon };

const categories: NavItem[] = [
  {
    href: "/categories/6439d5b90049ad0b52b90048",
    label: "Men's Fashion",
    icon: IconUser,
  },
  {
    href: "/categories/6439d58a0049ad0b52b9003f",
    label: "Women's Fashion",
    icon: IconShirtSport,
  },
  {
    href: "/categories/6439d40367d9aa4ca97064cc",
    label: "Baby & Toys",
    icon: IconBabyCarriage,
  },
  {
    href: "/categories/6439d30b67d9aa4ca97064b1",
    label: "Beauty & Health",
    icon: IconReportMedical,
  },
  {
    href: "/categories/6439d2d167d9aa4ca970649f",
    label: "Electronics",
    icon: IconProgressBolt,
  },
  {
    href: "/categories",
    label: "View All Categories",
    icon: IconDotsVertical,
  },
];
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/brands", label: "Brands" },
];
const accountLinks: NavItem[] = [
  { href: "/profile", label: "My Profile", icon: IconUser },
  { href: "/orders", label: "My Orders", icon: IconPackage },
  { href: "/wishlist", label: "My Wishlist", icon: IconHeart },
  { href: "/profile/addresses", label: "Addresses", icon: IconAddressBook },
  { href: "/profile/settings", label: "Settings", icon: IconSettings },
];

export default function Navbar() {
  const { isAuthenticated, userInfo } = useSelector(
    (state: AppState) => state.authReducer,
  );
  const userName = userInfo?.name || "My Account";
  const userEmail = userInfo?.email || "";

  const { logout } = authAction;
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [userMenuOpen, setUserMenuOpen] = useState(false); // desktop dropdown
  const userMenuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false);
  const closeUserMenu = () => setUserMenuOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const desktopLinkCls = (href: string) =>
    `transition-colors duration-200 ${
      isActive(href) ? "text-primary-600" : "hover:text-primary-600"
    }`;
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  useEffect(() => {
    if (!userMenuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [userMenuOpen]);

  const handleLogout = async () => {
    closeMenu();
    closeUserMenu();
    dispatch(logout());
    await deleteToken();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="hidden lg:block border-b border-gray-200 text-sm text-gray-600">
        <div className="container mx-auto px-4 xl:px-0 flex items-center justify-between py-2.5">
          <ul className="flex items-center gap-6">
            <li className="flex items-center gap-2">
              <IconTruckDelivery
                stroke={2}
                size={18}
                className="text-primary-600"
              />
              <span>Free Shipping on Orders 500 EGP</span>
            </li>
            <li className="hidden xl:flex items-center gap-2">
              <IconGift stroke={2} size={18} className="text-primary-600" />
              <span>New Arrivals Daily</span>
            </li>
          </ul>

          <ul className="flex items-center gap-5">
            <li className="flex items-center gap-2">
              <IconPhone stroke={2} size={16} />
              <a href="tel:+18001234567" className="hover:text-primary-600">
                +1 (800) 123-4567
              </a>
            </li>
            <li className="hidden xl:flex items-center gap-2">
              <IconMail stroke={2} size={16} />
              <a
                href="mailto:support@freshcart.com"
                className="hover:text-primary-600"
              >
                support@freshcart.com
              </a>
            </li>

            <li className="h-5 w-px bg-gray-300" aria-hidden="true" />

            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 max-w-40 hover:text-primary-600 transition-colors"
                  >
                    <IconUser stroke={2} size={16} className="shrink-0" />
                    <span className="truncate">{userName}</span>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 hover:text-primary-600 transition-colors cursor-pointer"
                  >
                    <IconLogout stroke={2} size={16} />
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
                  >
                    <IconUser stroke={2} size={16} />
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
                  >
                    <IconUserPlus stroke={2} size={16} />
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 xl:px-0">
        <nav className="py-3 lg:py-4 flex items-center justify-between gap-4 xl:gap-6">
          <h1 className="shrink-0">
            <Link href="/">
              <Image
                src={logo}
                alt="FreshCart"
                className="w-32 sm:w-36 lg:w-auto h-auto"
              />
            </Link>
          </h1>

          <search className="relative hidden lg:block flex-1 min-w-0 max-w-xl">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 ps-5 pe-14 text-sm outline-none transition-colors focus:border-primary-600 focus:bg-white"
            />
            <button
              type="button"
              aria-label="Search"
              className="absolute top-1/2 right-1.5 -translate-y-1/2 size-9 flex items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors cursor-pointer"
            >
              <IconSearch stroke={2} size={18} />
            </button>
          </search>

          <menu className="hidden lg:flex items-center gap-4 xl:gap-8 font-medium text-gray-800">
            {navLinks.slice(0, 2).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={desktopLinkCls(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="group/categories relative">
              <button
                type="button"
                className="flex items-center gap-1 hover:text-primary-600 transition-colors duration-200 cursor-pointer"
              >
                Categories
                <IconChevronDown
                  stroke={2}
                  size={16}
                  className="transition-transform duration-200 group-hover/categories:rotate-180"
                />
              </button>

              <ul className="hidden group-hover/categories:flex group-focus-within/categories:flex flex-col absolute z-50 top-full left-0 pt-3 w-60">
                <div className="divide-y divide-gray-100 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden">
                  {categories.map(({ href, label, icon: CategoryIcon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="p-3 flex gap-3 items-center text-sm hover:bg-gray-50 hover:text-primary-600 transition-colors"
                      >
                        <CategoryIcon stroke={2} size={20} />
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </div>
              </ul>
            </li>

            {navLinks.slice(2).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={desktopLinkCls(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </menu>

          <div className="hidden lg:flex shrink-0 items-center gap-3 xl:gap-5">
            <div className="hidden xl:flex items-center gap-3 pe-5 border-e border-gray-200">
              <span className="size-10 flex items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <IconHeadset stroke={2} size={20} />
              </span>
              <div className="leading-tight">
                <p className="text-xs text-gray-500">Support</p>
                <p className="text-sm font-semibold">24/7 Help</p>
              </div>
            </div>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className={`size-10 flex items-center justify-center transition-colors hover:text-primary-600 ${
                isActive("/wishlist") ? "text-primary-600" : "text-gray-700"
              }`}
            >
              <IconHeart stroke={2} />
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className={`size-10 flex items-center justify-center transition-colors hover:text-primary-600 ${
                isActive("/cart") ? "text-primary-600" : "text-gray-700"
              }`}
            >
              <div className="relative">
                <IconShoppingCart stroke={2} />
                <CartBadge />
              </div>
            </Link>

            {isAuthenticated ? (
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  aria-label="Account menu"
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  onClick={() => setUserMenuOpen((open) => !open)}
                  className={`size-10 flex items-center justify-center rounded-full text-primary-600 transition-colors cursor-pointer ${
                    userMenuOpen ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <IconUserCircle stroke={2} size={24} />
                </button>

                {userMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                  >
                    <div className="flex items-center gap-3 border-b border-gray-100 p-4">
                      <span className="size-11 shrink-0 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                        <IconUserCircle stroke={2} size={26} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">
                          {userName}
                        </p>
                        {userEmail && (
                          <p className="truncate text-xs text-gray-400">
                            {userEmail}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-2">
                      {accountLinks.map(({ href, label, icon: ItemIcon }) => (
                        <Link
                          key={href}
                          href={href}
                          role="menuitem"
                          onClick={closeUserMenu}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-600 transition-colors hover:bg-gray-50 hover:text-primary-600"
                        >
                          <ItemIcon stroke={2} size={18} />
                          {label}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 p-2">
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleLogout}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-red-500 transition-colors hover:bg-red-50"
                      >
                        <IconLogout stroke={2} size={18} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-full border border-primary-600 px-5 py-2.5 font-semibold text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 font-semibold text-white hover:bg-primary-700 transition-colors"
                >
                  <IconUserPlus stroke={2} size={18} />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            {!isAuthenticated && (
              <Link
                href="/login"
                aria-label="Sign in"
                className="size-10 flex justify-center items-center hover:text-primary-600 transition-colors"
              >
                <IconUser stroke={2} />
              </Link>
            )}
            <Link
              href="/cart"
              aria-label="Cart"
              className="size-10 flex justify-center items-center hover:text-primary-600 transition-colors"
            >
              <div className="relative">
                <IconShoppingCart stroke={2} />
                <CartBadge />
              </div>
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(true)}
              className="btn p-0 shrink-0 size-10 flex justify-center items-center bg-primary-600 text-white"
            >
              <IconMenu2 stroke={2} />
            </button>
          </div>
        </nav>
      </div>

      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="mobile-menu"
        inert={!isOpen}
        className={`fixed top-0 right-0 z-50 flex h-dvh w-80 max-w-[85%] flex-col bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <Link href="/" onClick={closeMenu}>
            <Image src={logo} alt="FreshCart" className="w-32 h-auto" />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="size-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <IconX stroke={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {isAuthenticated && (
            <Link
              href="/profile"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl bg-primary-50 p-3"
            >
              <span className="size-11 shrink-0 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <IconUserCircle stroke={2} size={26} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900">
                  {userName}
                </p>
                {userEmail && (
                  <p className="truncate text-xs text-gray-500">{userEmail}</p>
                )}
              </div>
            </Link>
          )}

          <search className="relative">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 ps-4 pe-12 text-sm outline-none focus:border-primary-600 focus:bg-white"
            />
            <button
              type="button"
              aria-label="Search"
              className="absolute top-1/2 right-1 -translate-y-1/2 size-8 flex items-center justify-center rounded-full bg-primary-600 text-white"
            >
              <IconSearch stroke={2} size={16} />
            </button>
          </search>

          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Menu
            </h2>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className={`block rounded-lg px-3 py-2.5 font-medium transition-colors hover:bg-gray-100 hover:text-primary-600 ${
                      isActive(link.href)
                        ? "bg-primary-50 text-primary-600"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/wishlist"
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors hover:bg-gray-100 hover:text-primary-600 ${
                    isActive("/wishlist") ? "bg-primary-50 text-primary-600" : ""
                  }`}
                >
                  <IconHeart stroke={2} size={20} />
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {isAuthenticated && (
            <div>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                My Account
              </h2>
              <ul className="space-y-1">
                {accountLinks
                  .filter((item) => item.href !== "/wishlist")
                  .map(({ href, label, icon: ItemIcon }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={closeMenu}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100 hover:text-primary-600"
                      >
                        <ItemIcon stroke={2} size={20} />
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-400 [&::-webkit-details-marker]:hidden">
              Categories
              <IconChevronDown
                stroke={2}
                size={16}
                className="transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <ul className="mt-2 space-y-1">
              {categories.map(({ href, label, icon: CategoryIcon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-100 hover:text-primary-600 transition-colors"
                  >
                    <CategoryIcon stroke={2} size={20} />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <span className="size-10 flex items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <IconHeadset stroke={2} size={20} />
            </span>
            <div className="leading-tight">
              <p className="text-xs text-gray-500">Support</p>
              <p className="text-sm font-semibold">24/7 Help</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 font-medium text-red-500 transition-colors hover:bg-red-100"
            >
              <IconLogout stroke={2} size={18} />
              Sign Out
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={closeMenu}
                className="btn flex items-center justify-center gap-2 bg-primary-600 text-white"
              >
                <IconId stroke={2} size={18} />
                Login
              </Link>
              <Link
                href="/signup"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <IconUserPlus stroke={2} size={18} />
                Signup
              </Link>
            </div>
          )}
        </div>
      </aside>
    </header>
  );
}