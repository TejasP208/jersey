import { BRAND, STORE } from '@/data/site';
import { formatPrice } from '@/lib/format';
import type { Product, Size, Sleeve } from '@/data/types';

export interface OrderCustomer {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

export interface OrderLine {
  product: Product;
  size: Size;
  sleeve: Sleeve;
  quantity: number;
}

const SLEEVE_TEXT: Record<Sleeve, string> = { full: 'Full sleeve', half: 'Half sleeve' };

export function buildOrderMessage(
  customer: OrderCustomer,
  lines: OrderLine[],
  deliveryRange?: string,
  orderId?: string,
) {
  const itemBlocks = lines.map((line, index) => {
    const lineTotal = line.product.price * line.quantity;
    return [
      `${index + 1}. ${line.product.name}`,
      `   Size: ${line.size} | ${SLEEVE_TEXT[line.sleeve]} | Qty: ${line.quantity}`,
      `   ${formatPrice(line.product.price)} each | Line total: ${formatPrice(lineTotal)}`,
    ].join('\n');
  });

  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  return [
    `*Order Placed - ${BRAND.name}*`,
    orderId ? `*Order ID: #${orderId}*` : '',
    '',
    '*Customer & Delivery details*',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address}`,
    `City: ${customer.city}`,
    `Pincode: ${customer.pincode}`,
    deliveryRange ? `Estimated Delivery: ${deliveryRange} (5–10 days)` : '',
    '',
    '*Order items*',
    ...itemBlocks,
    '',
    `*Total amount: ${formatPrice(total)}*`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function whatsappOrderUrl(message: string) {
  return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
