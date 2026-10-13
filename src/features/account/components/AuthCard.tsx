import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowLeft, IconCheck, type Icon } from "@tabler/icons-react";
import Reveal from "@/components/Animations/Reveal";

const steps = ["Email", "Verify", "Reset"];

type AuthCardProps = {
  icon: Icon;
  title: string;
  subtitle: string;
  step: 1 | 2 | 3;
  children: ReactNode;
};

export default function AuthCard({
  icon: CardIcon,
  title,
  subtitle,
  step,
  children,
}: AuthCardProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-8 sm:py-12">
      <Reveal className="w-full max-w-md">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-lg sm:p-8">
        <ol className="mb-6 flex items-center justify-center sm:mb-8">
          {steps.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            const current = n === step;
            return (
              <li key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold ${
                      done || current
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {done ? <IconCheck size={16} stroke={3} /> : n}
                  </span>
                  <span
                    className={`text-xs ${
                      current ? "font-medium text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {n < steps.length && (
                  <span
                    className={`mx-3 mb-5 h-0.5 w-10 sm:w-14 ${
                      done ? "bg-primary-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>

        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 ring-8 ring-primary-50/60">
          <CardIcon size={30} />
        </span>
        <h1 className="mt-5 text-center text-2xl font-bold text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">{subtitle}</p>

        <div className="mt-6">{children}</div>

        <Link
          href="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-primary-600 hover:underline"
        >
          <IconArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
      </Reveal>
    </div>
  );
}