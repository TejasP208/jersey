import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, ExternalLink, MapPin, Package, ShoppingBag, Truck } from 'lucide-react';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart } from '@/context/CartContext';
import type { CartLine } from '@/context/CartContext';
import { CATEGORY_LABELS } from '@/data/site';
import { SLEEVE_LABELS } from '@/lib/catalog';
import { getDeliveryEstimate } from '@/lib/delivery';
import type { DeliveryEstimate } from '@/lib/delivery';
import { formatPrice } from '@/lib/format';
import { photo } from '@/lib/images';
import { useDocumentMeta } from '@/lib/useDocumentMeta';
import { buildOrderMessage, whatsappOrderUrl } from '@/lib/whatsapp';
import type { OrderCustomer } from '@/lib/whatsapp';

interface PlacedOrder {
  orderId: string;
  customer: OrderCustomer;
  lines: CartLine[];
  subtotal: number;
  estimate: DeliveryEstimate;
  whatsappUrl: string;
}

export default function CheckoutPage() {
  useDocumentMeta(
    'Checkout | THE CLUB JERSEY',
    'Enter your delivery details and place your jersey order with The Club Jersey.',
  );
  const { lines, subtotal, clearCart } = useCart();
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const handleSubmit = (customer: OrderCustomer) => {
    const estimate = getDeliveryEstimate(new Date());
    const orderId = `TCJ-${Math.floor(100000 + Math.random() * 900000)}`;

    const message = buildOrderMessage(
      customer,
      lines.map((line) => ({
        product: line.product,
        size: line.item.size,
        sleeve: line.item.sleeve,
        quantity: line.item.quantity,
      })),
      estimate.shortRange,
      orderId,
    );
    const url = whatsappOrderUrl(message);

    setPlacedOrder({
      orderId,
      customer,
      lines: [...lines],
      subtotal,
      estimate,
      whatsappUrl: url,
    });

    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (placedOrder) {
    const { orderId, customer, lines: orderLines, subtotal: orderSubtotal, estimate, whatsappUrl } = placedOrder;

    return (
      <section className="mx-auto max-w-3xl px-5 py-12 md:px-10 md:py-20">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-lime text-ink shadow-sm">
            <CheckCircle2 size={44} strokeWidth={2.5} />
          </div>
          <span className="eyebrow mt-5 text-smoke">Order #{orderId}</span>
          <h1 className="font-display text-4xl uppercase tracking-wide md:text-5xl mt-2">
            Order Placed Successfully!
          </h1>
          <p className="mt-3 max-w-xl text-base text-smoke">
            Thank you, <strong className="text-ink">{customer.name}</strong>! Your jersey order has been confirmed.
          </p>
        </div>

        {/* PROMINENT ESTIMATED DELIVERY DATE CARD */}
        <div className="mt-10 overflow-hidden border-2 border-ink bg-white shadow-sm">
          <div className="bg-ink p-5 text-paper">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Truck size={24} className="text-lime" />
                <span className="font-display text-xl tracking-wider uppercase">Expected Delivery</span>
              </div>
              <span className="rounded bg-lime px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                5–10 Days
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-smoke">Possible Delivery Date Window</p>
            <p className="mt-1 font-display text-3xl tracking-wide text-ink md:text-4xl">
              {estimate.rangeFormatted}
            </p>
            <p className="mt-2 text-sm text-smoke">
              Your jersey will be packed, quality-inspected, and shipped via express delivery within {estimate.daysLabel}.
            </p>

            {/* Delivery Progress Steps */}
            <div className="mt-8 border-t border-line pt-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper text-xs font-bold">
                    ✓
                  </div>
                  <span className="mt-2 text-xs font-semibold text-ink">Order Placed</span>
                  <span className="text-[11px] text-smoke">Today</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-ink text-xs font-bold ring-4 ring-lime/20">
                    2
                  </div>
                  <span className="mt-2 text-xs font-semibold text-ink">Processing & QC</span>
                  <span className="text-[11px] text-smoke">1–2 days</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-smoke bg-paper text-smoke text-xs font-bold">
                    3
                  </div>
                  <span className="mt-2 text-xs font-semibold text-ink">Delivered</span>
                  <span className="text-[11px] font-semibold text-ink">Within 5–10 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address & Details */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="border border-line bg-white p-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-smoke" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-smoke">Shipping Address</h2>
            </div>
            <p className="font-semibold text-ink">{customer.name}</p>
            <p className="mt-1 text-sm text-smoke">{customer.address}</p>
            <p className="text-sm text-smoke">{customer.city} — {customer.pincode}</p>
            <p className="mt-2 text-sm font-medium text-ink">Phone: {customer.phone}</p>
          </div>

          <div className="border border-line bg-white p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package size={18} className="text-smoke" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-smoke">Order Details</h2>
              </div>
              <p className="text-sm text-smoke">Order Reference: <strong className="text-ink">#{orderId}</strong></p>
              <p className="text-sm text-smoke mt-1">Payment: <strong className="text-ink">Pay on Delivery / WhatsApp UPI</strong></p>
              <p className="text-sm text-smoke mt-1">Delivery Time: <strong className="text-ink">5 to 10 days</strong></p>
            </div>
            <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
              <span className="font-semibold text-sm">Total Amount:</span>
              <span className="font-display text-2xl tracking-wide text-ink">{formatPrice(orderSubtotal)}</span>
            </div>
          </div>
        </div>

        {/* Ordered items list */}
        <div className="mt-6 border border-line bg-white p-6">
          <h2 className="font-display text-2xl tracking-wide mb-4">Items Ordered ({orderLines.length})</h2>
          <ul className="divide-y divide-line">
            {orderLines.map(({ item, product }) => (
              <li key={item.key} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className="h-16 w-14 shrink-0 overflow-hidden bg-paper">
                  <img src={photo(product.photos[0], 200)} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col text-sm">
                  <span className="font-semibold text-ink">{product.name}</span>
                  <span className="mt-1 text-xs text-smoke">
                    {CATEGORY_LABELS[product.category]} · Size {item.size} · {SLEEVE_LABELS[item.sleeve]}
                  </span>
                  <span className="text-xs text-smoke">Quantity: {item.quantity}</span>
                </div>
                <span className="text-sm font-semibold tabular-nums text-ink">
                  {formatPrice(product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 py-4 text-center justify-center"
          >
            Open Order on WhatsApp
            <ExternalLink size={16} />
          </a>
          <Link to="/jerseys" className="btn-outline-dark flex-1 py-4 text-center justify-center">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-start gap-6 px-5 py-20 md:px-10 md:py-28">
        <ShoppingBag size={44} aria-hidden="true" />
        <h1 className="display-lg">Your bag is empty</h1>
        <p className="text-base leading-[1.5] text-smoke">Add a jersey to your bag before checking out.</p>
        <Link to="/jerseys" className="btn-dark">
          Shop jerseys
        </Link>
      </section>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-10 md:py-16">
      <p className="eyebrow text-smoke">Checkout</p>
      <h1 className="display-lg mt-3">Delivery details</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
        <CheckoutForm onSubmit={handleSubmit} />

        <aside className="h-fit border border-line bg-white p-6 md:p-8 lg:sticky lg:top-32">
          <h2 className="font-display text-3xl tracking-wide">Order summary</h2>
          <ul className="mt-6 divide-y divide-line">
            {lines.map(({ item, product }) => (
              <li key={item.key} className="flex gap-4 py-4">
                <div className="h-20 w-16 shrink-0 overflow-hidden bg-paper">
                  <img src={photo(product.photos[0], 200)} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col text-sm">
                  <span className="font-semibold">{product.name}</span>
                  <span className="mt-1 text-smoke">
                    {CATEGORY_LABELS[product.category]} · Size {item.size} · {SLEEVE_LABELS[item.sleeve]}
                  </span>
                  <span className="mt-1 text-smoke">Qty {item.quantity}</span>
                </div>
                <span className="text-sm font-semibold tabular-nums">
                  {formatPrice(product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-ink pt-5">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-semibold tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-4 text-xs leading-[1.5] text-smoke">
            Delivery charges, if any, are confirmed on WhatsApp.
          </p>
        </aside>
      </div>
    </div>
  );
}
