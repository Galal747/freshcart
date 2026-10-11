export const FREE_SHIPPING_LIMIT = 500;
export const SHIPPING_FEE = 50;

type PricedItem = { price: number; count: number };

export function calcTotals(products: PricedItem[]) {
  const itemsCount = products.reduce((sum, item) => sum + item.count, 0);
  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );
  const isFreeShipping = subtotal >= FREE_SHIPPING_LIMIT;
  const shipping = isFreeShipping ? 0 : SHIPPING_FEE;
  const remaining = Math.max(FREE_SHIPPING_LIMIT - subtotal, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);

  return {
    itemsCount,
    subtotal,
    isFreeShipping,
    shipping,
    remaining,
    progress,
    total: subtotal + shipping,
  };
}

export const formatEGP = (n: number) => n.toLocaleString("en-US");