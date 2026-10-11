"use client";

import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

type PasswordInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
};

export default function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
}: PasswordInputProps) {
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
          className={`h-14 w-full rounded-xl border bg-white px-4 pe-12 outline-none transition-colors placeholder:text-gray-400 focus:border-primary-600 ${
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