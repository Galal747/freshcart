"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconMail, IconShieldCheck } from "@tabler/icons-react";
import AuthCard from "./AuthCard";
import { forgotPassword, verifyResetCode } from "../server/account.action";
import {
  RESET_EMAIL_KEY,
  codeSchema,
  emailSchema,
} from "../schemas/reset.schema";

const buttonCls =
  "flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-linear-to-r from-primary-600 to-primary-700 font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

export default function ForgotPasswordFlow() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = emailSchema.safeParse({ email });
    if (!parsed.success) return setError(parsed.error.issues[0].message);

    startTransition(async () => {
      const res = await forgotPassword(parsed.data.email);
      if (!res.success) return setError(res.message);
      setEmail(parsed.data.email);
      setStep("code");
      toast.success("Reset code sent to your email");
    });
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = codeSchema.safeParse({ code });
    if (!parsed.success) return setError(parsed.error.issues[0].message);

    startTransition(async () => {
      const res = await verifyResetCode(parsed.data.code);
      if (!res.success) return setError(res.message);

      try {
        sessionStorage.setItem(RESET_EMAIL_KEY, email);
      } catch {
        // لو التخزين مقفول هنطلب الإيميل تاني في الصفحة الجاية
      }
      toast.success("Code verified");
      router.push("/reset-password");
    });
  };

  const handleResend = () => {
    setError("");
    startTransition(async () => {
      const res = await forgotPassword(email);
      if (!res.success) return setError(res.message);
      toast.success("A new code was sent to your email");
    });
  };

  /* ------------------------------ Step 1: email ------------------------------ */
  if (step === "email") {
    return (
      <AuthCard
        icon={IconMail}
        step={1}
        title="Forgot your password?"
        subtitle="Enter your email and we'll send you a 6-digit reset code."
      >
        <form onSubmit={handleEmailSubmit} className="space-y-4" noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-800">
              Email Address
            </label>
            <div className="relative">
              <IconMail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={`h-14 w-full rounded-xl border bg-white ps-12 pe-4 outline-none transition-colors placeholder:text-gray-400 focus:border-primary-600 ${
                  error ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <button type="submit" disabled={isPending} className={buttonCls}>
            {isPending ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      </AuthCard>
    );
  }

  /* ------------------------------ Step 2: code ------------------------------ */
  return (
    <AuthCard
      icon={IconShieldCheck}
      step={2}
      title="Check your email"
      subtitle={`We sent a 6-digit code to ${email}`}
    >
      <form onSubmit={handleCodeSubmit} className="space-y-4" noValidate>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-800">
            Verification Code
          </label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="000000"
            className={`h-14 w-full rounded-xl border bg-white px-4 text-center text-2xl font-semibold tracking-[0.5em] outline-none transition-colors placeholder:text-gray-300 focus:border-primary-600 ${
              error ? "border-red-400" : "border-gray-200"
            }`}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <button type="submit" disabled={isPending} className={buttonCls}>
          {isPending ? "Verifying..." : "Verify Code"}
        </button>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setError("");
            }}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          >
            Change email
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={isPending}
            className="cursor-pointer font-medium text-primary-600 hover:underline disabled:opacity-60"
          >
            Resend code
          </button>
        </div>
      </form>
    </AuthCard>
  );
}