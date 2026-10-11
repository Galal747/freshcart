export type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
};

export type OrderItem = {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    id: string;
    title: string;
    imageCover: string;
  };
};

export type Order = {
  _id: string;
  id: number;
  cartItems: OrderItem[];
  shippingAddress?: ShippingAddress;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
};

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string };