import Link from "next/link";
import { IconUser } from "@tabler/icons-react";
import AccountSidebar from "@/features/account/components/AccountSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-linear-to-r from-primary-600 to-primary-500 text-white">
        <div className="container mx-auto px-4 py-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/80">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-white">My Account</span>
          </nav>

          <div className="flex items-center gap-5">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur">
              <IconUser size={32} />
            </span>
            <div>
              <h1 className="text-3xl font-bold">My Account</h1>
              <p className="mt-1 text-white/90">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto grid items-start gap-8 px-4 py-10 lg:grid-cols-[18rem_1fr]">
        <AccountSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}