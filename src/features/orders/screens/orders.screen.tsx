import Image from "next/image";
import { getUserOrders } from "../server/orders.action";
import type { Order, OrderItem } from "../types/orders.types";

export default async function OrdersScreen() {
  const res = await getUserOrders();

  if (!res.success) {
    return <p className="py-10 text-center text-red-600">{res.message}</p>;
  }

  if (res.data.length === 0) {
    return <p className="py-10 text-center text-gray-500">No orders yet.</p>;
  }

  return (
    <div className="space-y-6">
      {res.data.map((order: Order) => (
        <article
          key={order._id}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">Order #{order.id}</h2>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="flex gap-2 text-xs font-medium">
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

          <ul className="divide-y divide-gray-100">
            {order.cartItems.map((item: OrderItem) => (
              <li key={item._id} className="flex items-center gap-4 py-3">
                <Image
                  src={item.product.imageCover}
                  alt={item.product.title}
                  width={56}
                  height={56}
                  className="size-14 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-500">
                    {item.count} × {item.price} EGP
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <footer className="mt-4 flex justify-between border-t border-gray-100 pt-4 font-semibold">
            <span>Total</span>
            <span>{order.totalOrderPrice} EGP</span>
          </footer>
        </article>
      ))}
    </div>
  );
}