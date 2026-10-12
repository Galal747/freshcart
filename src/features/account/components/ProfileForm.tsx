"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { IconDeviceFloppy, IconUser } from "@tabler/icons-react";
import { AppState } from "@/store/store";
import { authAction } from "@/features/auth/slices/auth.slice";
import { updateProfile } from "../server/account.action";
import { profileSchema } from "../schemas/profile.schema";

type Props = { userId?: string; role?: string };

type Edits = { name?: string; email?: string; phone?: string };

const inputCls =
  "h-14 w-full rounded-xl border bg-white px-4 outline-none transition-colors placeholder:text-gray-400 focus:border-primary-600";

export default function ProfileForm({ userId, role }: Props) {
  const { isAuthenticated, userInfo } = useSelector(
    (state: AppState) => state.authReducer,
  );
  const dispatch = useDispatch();
  const user = userInfo;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [edits, setEdits] = useState<Edits>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const name = edits.name ?? user?.name ?? "";
  const email = edits.email ?? user?.email ?? "";
  const phone = edits.phone ?? "";

  const handleChange =
    (field: keyof Edits) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setEdits((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = profileSchema.safeParse({ name, email, phone });
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
    const changes: Edits = {};
    if (parsed.data.name && parsed.data.name !== (user?.name ?? ""))
      changes.name = parsed.data.name;
    if (parsed.data.email && parsed.data.email !== (user?.email ?? ""))
      changes.email = parsed.data.email;
    if (parsed.data.phone) changes.phone = parsed.data.phone;

    if (Object.keys(changes).length === 0) {
      toast.info("No changes to save");
      return;
    }

    startTransition(async () => {
      const res = await updateProfile(changes);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      dispatch(
        authAction.setAuthStates({
          isAuthenticated,
          userInfo: {
            id: user?.id ?? userId,
            role: user?.role ?? role ?? "user",
            name: res.data.name ?? user?.name ?? "",
            email: res.data.email ?? user?.email,
          },
        }),
      );
      toast.success("Profile updated successfully");
      router.refresh();
    });
  };

  const borderFor = (field: string) =>
    errors[field] ? "border-red-400" : "border-gray-200";

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-9" noValidate>
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
            <IconUser size={26} />
          </span>
          <div>
            <h3 className="font-bold text-gray-900">Profile Information</h3>
            <p className="text-sm text-gray-500">Update your personal details</p>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-800">
            Full Name
          </label>
          <input
            value={name}
            onChange={handleChange("name")}
            placeholder="Enter your name"
            className={`${inputCls} ${borderFor("name")}`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-800">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={handleChange("email")}
            placeholder="Enter your email"
            className={`${inputCls} ${borderFor("email")}`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-800">
            Phone Number
          </label>
          <input
            value={phone}
            onChange={handleChange("phone")}
            inputMode="tel"
            placeholder="01xxxxxxxxx"
            className={`${inputCls} ${borderFor("phone")}`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <IconDeviceFloppy size={18} />
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <div className="border-t border-gray-100 bg-gray-50 px-6 py-6 sm:px-9">
        <h4 className="mb-4 font-bold text-gray-900">Account Information</h4>
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-gray-500">User ID</dt>
            <dd className="break-all text-right font-medium text-gray-700">
              {userId ?? "–"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-gray-500">Role</dt>
            <dd className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium capitalize text-primary-700">
              {role ?? "user"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}