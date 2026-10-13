"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { changePassword } from "../server/account.action";
import Reveal from "@/components/Animations/Reveal";
import {
  passwordSchema,
  type PasswordValues,
} from "../schemas/password.schema";

const emptyValues: PasswordValues = {
  currentPassword: "",
  password: "",
  rePassword: "",
};

function PasswordField({
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-800">
        {label}
      </label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border bg-white px-4 pe-12 sm:h-14 outline-none transition-colors placeholder:text-gray-400 focus:border-primary-600 ${
            error ? "border-red-400" : "border-gray-200"
          }`}
        />
        <button
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
        >
          {visible ? <IconEyeOff size={20} /> : <IconEye size={20} />}
        </button>
      </div>
      {error ? (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      ) : (
        hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}

export default function PasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<PasswordValues>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: keyof PasswordValues) => (value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = passwordSchema.safeParse(values);
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

    startTransition(async () => {
      const res = await changePassword(parsed.data);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success("Password changed successfully");
      setValues(emptyValues);
    });
  };

  return (
    <Reveal delay={0.08}>
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:space-y-5 sm:p-9">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
            <IconLock size={26} />
          </span>
          <div>
            <h3 className="font-bold text-gray-900">Change Password</h3>
            <p className="text-sm text-gray-500">Update your account password</p>
          </div>
        </div>

        <PasswordField
          label="Current Password"
          placeholder="Enter your current password"
          value={values.currentPassword}
          onChange={set("currentPassword")}
          error={errors.currentPassword}
        />
        <PasswordField
          label="New Password"
          placeholder="Enter your new password"
          value={values.password}
          onChange={set("password")}
          error={errors.password}
          hint="Must be at least 6 characters"
        />
        <PasswordField
          label="Confirm New Password"
          placeholder="Confirm your new password"
          value={values.rePassword}
          onChange={set("rePassword")}
          error={errors.rePassword}
        />

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-600 sm:w-auto px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-600/25 transition-all hover:bg-orange-700 active:scale-[0.97] disabled:opacity-60"
        >
          <IconLock size={18} />
          {isPending ? "Updating..." : "Change Password"}
        </button>
      </form>
    </section>
    </Reveal>
  );
}