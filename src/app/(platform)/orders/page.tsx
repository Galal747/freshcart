import OrdersScreen from "@/features/orders/screens/orders.screen";

export default function OrdersPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">My Orders</h1>
      <OrdersScreen />
    </main>
  );
}