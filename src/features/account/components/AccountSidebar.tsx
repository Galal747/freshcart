"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconChevronRight,
  IconMapPin,
  IconSettings,
  type Icon,
} from "@tabler/icons-react";

const items: { href: string; label: string; icon: Icon }[] = [
  { href: "/profile/addresses", label: "My Addresses", icon: IconMapPin },
  { href: "/profile/settings", label: "Settings", icon: IconSettings },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:sticky lg:top-28">
      <h2 className="border-b border-gray-100 px-5 py-4 font-bold text-gray-900">
        My Account
      </h2>

      <nav className="space-y-1 p-2">
        {items.map(({ href, label, icon: ItemIcon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                active
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span
                className={`flex size-10 items-center justify-center rounded-lg ${
                  active
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <ItemIcon size={18} />
              </span>
              <span className="flex-1">{label}</span>
              <IconChevronRight size={16} className="text-gray-400" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}