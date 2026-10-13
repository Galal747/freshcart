import Image from "next/image";
import { getUserOrders } from "../server/orders.action";
import type { Order, OrderItem } from "../types/orders.types";
import Reveal from "@/components/Animations/Reveal";

export default async function OrdersScreen() {
  const res = await getUserOrders();

  if (!res.success) {
    return <p className="py-10 text-center text-red-600">{res.message}</p>;
  }

  if (res.data.length === 0) {
    return <p className="py-10 text-center text-gray-500">No orders yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {res.data.map((order: Order, i: number) => (
        <Reveal key={order._id} delay={Math.min(i, 5) * 0.06} className="h-full">
          <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <header className="mb-3 flex flex-col gap-3 sm:mb-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="font-semibold">Order #{order.id}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                <span className="rounded-full bg-gray-100 px-3 py-1 capitalize">
                  {order.paymentMethodType}
                </span>
                <span
                  className={`rounded-full px-3 py-1 ${
                    order.isPaid
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not paid"}
                </span>
                <span
                  className={`rounded-full px-3 py-1 ${
                    order.isDelivered
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Processing"}
                </span>
              </div>
            </header>

            <ul className="mb-auto divide-y divide-gray-100">
              {order.cartItems.map((item: OrderItem) => (
                <li
                  key={item._id}
                  className="flex items-center gap-3 py-3 sm:gap-4"
                >
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={56}
                    height={56}
                    className="size-12 shrink-0 rounded-lg object-cover sm:size-14"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium sm:text-base">
                      {item.product.title}
                    </p>
                    <p className="text-xs text-gray-500 sm:text-sm">
                      {item.count} × {item.price} EGP
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="mt-4 flex justify-between border-t border-gray-100 pt-4 font-semibold">
              <span>Total</span>
              <span className="text-primary-600">{order.totalOrderPrice} EGP</span>
            </footer>
          </article>
        </Reveal>
      ))}
    </div>
  );
}