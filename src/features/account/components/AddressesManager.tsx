"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  IconMapPin,
  IconPhone,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import Modal from "./Modal";
import { addAddress, removeAddress } from "../server/account.action";
import { addressSchema, type AddressValues } from "../schemas/address.schema";
import type { Address } from "../types/account.types";

const emptyForm: AddressValues = { name: "", city: "", details: "", phone: "" };

const inputCls =
  "w-full rounded-xl border-2 border-gray-200 bg-white px-4 outline-none transition-colors placeholder:text-gray-400 focus:border-primary-600";

export default function AddressesManager({
  addresses,
}: {
  addresses: Address[];
}) {
  const [isPending, startTransition] = useTransition();
  const [formOpen, setFormOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Address | null>(null);
  const [values, setValues] = useState<AddressValues>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const closeForm = () => {
    setFormOpen(false);
    setErrors({});
  };

  const handleChange =
    (field: keyof AddressValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = addressSchema.safeParse(values);
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
      const res = await addAddress(parsed.data);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success("Address added");
      setValues(emptyForm);
      setFormOpen(false);
    });
  };

  const handleDelete = () => {
    if (!toDelete) return;
    const id = toDelete._id;
    setToDelete(null);

    startTransition(async () => {
      const res = await removeAddress(id);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success("Address removed");
    });
  };

  const addButtonCls =
    "flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-primary-600 to-primary-700 px-5 py-3 font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:-translate-y-0.5 active:scale-[0.98]";

  return (
    <section className={isPending ? "opacity-70" : ""}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
          <p className="mt-1 text-gray-500">
            Manage your saved delivery addresses
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen(true)}
          className={addButtonCls}
        >
          <IconPlus size={18} />
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
          <span className="flex size-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <IconMapPin size={32} />
          </span>
          <h3 className="mt-6 text-lg font-bold text-gray-900">
            No Addresses Yet
          </h3>
          <p className="mt-2 max-w-sm text-gray-500">
            Add your first delivery address to make checkout faster and easier.
          </p>
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className={`${addButtonCls} mt-6`}
          >
            <IconPlus size={18} />
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <article
              key={address._id}
              className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <IconMapPin size={20} />
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">{address.name}</h3>
                <p className="text-sm font-medium text-primary-600">
                  {address.city}
                </p>
                <p className="mt-2 text-sm text-gray-600">{address.details}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                  <IconPhone size={15} />
                  {address.phone}
                </p>
              </div>

              <button
                type="button"
                aria-label="Delete address"
                onClick={() => setToDelete(address)}
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-red-50 text-red-500 ring-1 ring-red-100 transition-all hover:bg-red-500 hover:text-white active:scale-95"
              >
                <IconTrash size={18} />
              </button>
            </article>
          ))}
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={closeForm}
        title="Add New Address"
        subtitle="Where should we deliver your orders?"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-800">
              Address Name
            </label>
            <input
              value={values.name}
              onChange={handleChange("name")}
              placeholder="e.g. Home, Work"
              className={`${inputCls} h-12`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-800">
              City
            </label>
            <input
              value={values.city}
              onChange={handleChange("city")}
              placeholder="e.g. Cairo, Alexandria, Giza"
              className={`${inputCls} h-12`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-800">
              Street Address
            </label>
            <textarea
              value={values.details}
              onChange={handleChange("details")}
              rows={3}
              placeholder="Street name, building number, floor, apartment..."
              className={`${inputCls} resize-none py-3`}
            />
            {errors.details && (
              <p className="mt-1 text-sm text-red-600">{errors.details}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-800">
              Phone Number
            </label>
            <input
              value={values.phone}
              onChange={handleChange("phone")}
              placeholder="01xxxxxxxxx"
              inputMode="tel"
              className={`${inputCls} h-12`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={closeForm}
              className="h-12 cursor-pointer rounded-xl border border-gray-200 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="h-12 cursor-pointer rounded-xl bg-linear-to-r from-primary-600 to-primary-700 font-semibold text-white shadow-lg shadow-primary-600/25 transition-all active:scale-[0.97] disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Save Address"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={toDelete !== null}
        onClose={() => setToDelete(null)}
        title="Remove this address?"
        subtitle="This address will be deleted from your account."
      >
        {toDelete && (
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="font-semibold text-gray-900">{toDelete.name}</p>
            <p className="text-sm text-gray-600">
              {toDelete.details}, {toDelete.city}
            </p>
          </div>
        )}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            autoFocus
            onClick={() => setToDelete(null)}
            className="h-12 cursor-pointer rounded-xl border border-gray-200 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500 font-semibold text-white shadow-lg shadow-red-500/25 transition-all hover:bg-red-600 active:scale-[0.97]"
          >
            <IconTrash size={18} />
            Remove
          </button>
        </div>
      </Modal>
    </section>
  );
}