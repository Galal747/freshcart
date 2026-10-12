import Link from "next/link";
import type { ReactNode } from "react";
import { IconMail, type Icon } from "@tabler/icons-react";

export type LegalSection = { id: string; title: string; body: ReactNode };

const legalPages = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/return-policy", label: "Return Policy" },
];

type LegalLayoutProps = {
  icon: Icon;
  title: string;
  subtitle: string;
  updated: string;
  current: string;
  sections: LegalSection[];
};

export default function LegalLayout({
  icon: PageIcon,
  title,
  subtitle,
  updated,
  current,
  sections,
}: LegalLayoutProps) {
  return (
    <>
      {/* Banner */}
      <section className="bg-linear-to-r from-primary-600 to-primary-500 text-white">
        <div className="container mx-auto px-4 py-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/80">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-white">{title}</span>
          </nav>

          <div className="flex items-center gap-5">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur">
              <PageIcon size={32} />
            </span>
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="mt-1 text-white/90">{subtitle}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        <div className="container mx-auto grid items-start gap-8 px-4 py-10 lg:grid-cols-[16rem_1fr]">
          {/* Table of contents */}
          <aside className="hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:block">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              On this page
            </h2>
            <ol className="space-y-1">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
                  >
                    <span className="text-gray-400">{i + 1}.</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Content */}
          <div className="min-w-0 space-y-6">
            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
              <p className="mb-8 text-sm text-gray-400">
                Last updated: {updated}
              </p>

              <div className="space-y-10">
                {sections.map((section, i) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-gray-900">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-sm text-primary-700">
                        {i + 1}
                      </span>
                      {section.title}
                    </h2>
                    <div className="space-y-3 text-gray-600 [&_li]:leading-7 [&_p]:leading-7 [&_strong]:font-semibold [&_strong]:text-gray-800 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:ps-6">
                      {section.body}
                    </div>
                  </section>
                ))}
              </div>
            </article>

            {/* Contact */}
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-primary-100 bg-primary-50 p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-bold text-gray-900">
                  Have a question about this page?
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Our support team is available 24/7 to help you.
                </p>
              </div>
              <a
                href="mailto:support@freshcart.com"
                className="flex shrink-0 items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
              >
                <IconMail size={18} />
                Contact Support
              </a>
            </div>

            {/* Other legal pages */}
            <nav className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-gray-400">Also read:</span>
              {legalPages
                .filter((page) => page.href !== current)
                .map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-full border border-gray-200 bg-white px-4 py-1.5 font-medium text-gray-700 transition-colors hover:border-primary-600 hover:text-primary-600"
                  >
                    {page.label}
                  </Link>
                ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}