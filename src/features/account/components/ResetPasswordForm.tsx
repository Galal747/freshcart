"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconLockPassword } from "@tabler/icons-react";
import AuthCard from "./AuthCard";
import PasswordInput from "./PasswordInput";
import { resetPassword } from "../server/account.action";
import { RESET_EMAIL_KEY, newPasswordSchema } from "../schemas/reset.schema";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [expired, setExpired] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const parsed = newPasswordSchema.safeParse({ password, rePassword });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    let email: string | null = null;
    try {
      email = sessionStorage.getItem(RESET_EMAIL_KEY);
    } catch {
      email = null;
    }
    if (!email) return setExpired(true);

    startTransition(async () => {
      const res = await resetPassword(email, parsed.data.password);
      if (!res.success) return setServerError(res.message);

      try {
        sessionStorage.removeItem(RESET_EMAIL_KEY);
      } catch {}
      toast.success("Password reset successfully. Please sign in.");
      router.push("/login");
    });
  };

  return (
    <AuthCard
      icon={IconLockPassword}
      step={3}
      title="Create a new password"
      subtitle="Choose a strong password you haven't used before."
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          hint="Must be at least 6 characters"
        />
        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm your new password"
          value={rePassword}
          onChange={setRePassword}
          error={errors.rePassword}
        />

        {serverError && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {serverError}
          </p>
        )}

        {expired && (
          <p className="rounded-lg bg-orange-50 p-3 text-sm text-orange-700">
            Your reset session expired.{" "}
            <Link
              href="/forgot-password"
              className="font-semibold underline underline-offset-2"
            >
              Start again
            </Link>
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-linear-to-r from-primary-600 to-primary-700 font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </AuthCard>
  );
}