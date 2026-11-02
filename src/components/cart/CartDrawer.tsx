import { useEffect } from 'react';
import { ArrowRight, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuantityStepper from '@/components/ui/QuantityStepper';
import { useCart } from '@/context/CartContext';
import type { CartLine } from '@/context/CartContext';
import { SLEEVE_LABELS } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { photo } from '@/lib/images';
import { cn } from '@/lib/cn';

function CartLineRow({ line }: { line: CartLine }) {
  const { product, item } = line;
  const { updateQuantity, removeItem, closeCart } = useCart();

  return (
    <li className="flex gap-4 border-b border-line py-5">
      <Link to={`/product/${product.id}`} onClick={closeCart} className="h-28 w-24 shrink-0 overflow-hidden bg-white">
        <img
          src={photo(product.photos[0], 300)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-snug">{product.name}</p>
            <p className="mt-1 text-xs text-smoke">
              Size {item.size} · {SLEEVE_LABELS[item.sleeve]}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            aria-label={`Remove ${product.name} from bag`}
            className="flex h-8 w-8 shrink-0 items-center justify-center transition-colors hover:bg-ink hover:text-paper"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
          <QuantityStepper
            label={`Quantity for ${product.name}`}
            value={item.quantity}
            onChange={(quantity) => updateQuantity(item.key, quantity)}
          />
          <div className="text-right">
            <p className="text-sm font-semibold">{formatPrice(product.price * item.quantity)}</p>
            <p className="text-xs text-smoke">{formatPrice(product.price)} each</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, count } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, closeCart]);

  return (
    <div className={cn('fixed inset-0 z-[60]', !isOpen && 'pointer-events-none invisible')} aria-hidden={!isOpen}>
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close bag"
        onClick={closeCart}
        className={cn(
          'absolute inset-0 bg-ink/60 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper text-ink shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-3xl tracking-wide">
            Your Bag <span className="text-smoke">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-ink hover:text-paper"
          >
            <X size={20} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <ShoppingBag size={44} strokeWidth={1.5} className="text-mist" />
            <p className="font-display text-3xl tracking-wide">Your bag is empty</p>
            <p className="text-sm text-smoke">Find the jersey that represents your club and add it here.</p>
            <Link to="/jerseys" onClick={closeCart} className="btn-dark">
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {lines.map((line) => (
                <CartLineRow key={line.item.key} line={line} />
              ))}
            </ul>
            <div className="border-t border-line bg-white px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-smoke">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-display text-2xl tracking-wide">Total</span>
                <span className="text-xl font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-smoke">Delivery details are confirmed with our team on WhatsApp.</p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button type="button" onClick={closeCart} className="btn-outline-dark px-4 py-4">
                  Continue shopping
                </button>
                <Link to="/checkout" onClick={closeCart} className="btn-primary px-4 py-4">
                  Proceed to checkout
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
