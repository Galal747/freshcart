"use client";

import { IconTrash } from "@tabler/icons-react";
import { useTransition } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { clearCart } from "../server/cart.action";
import { clearCartState } from "../slices/cart.slice";

export default function ClearCartButton() {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();

  const handleClear = () =>
    startTransition(async () => {
      const result = await clearCart();
      if (result.status === "fail" || result.status === "error") {
        toast.error(result.message);
        return;
      }
      dispatch(clearCartState());
      toast.success("Your cart is now empty");
    });

  const confirmClear = () => {
    toast("Remove all items from your cart?", {
      duration: 8000,
      action: {
        label: "Clear all",
        onClick: handleClear,
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={confirmClear}
      className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
    >
      <IconTrash
        stroke={2}
        className="text-xs group-hover:scale-110 transition-transform"
      />
      <span>Clear all items</span>
    </button>
  );
}