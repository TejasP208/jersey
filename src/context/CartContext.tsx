import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { PRODUCTS } from '@/data/products';
import { SIZES, SLEEVES } from '@/data/types';
import type { Product, Size, Sleeve } from '@/data/types';

const STORAGE_KEY = 'tcj-cart';
export const MAX_QUANTITY_PER_LINE = 10;

export interface CartItem {
  key: string;
  productId: string;
  size: Size;
  sleeve: Sleeve;
  quantity: number;
}

export interface CartLine {
  item: CartItem;
  product: Product;
}

interface AddItemInput {
  productId: string;
  size: Size;
  sleeve: Sleeve;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddItemInput) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

export function makeCartKey(productId: string, size: Size, sleeve: Sleeve) {
  return `${productId}|${size}|${sleeve}`;
}

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.productId === 'string' &&
    PRODUCTS.some((product) => product.id === item.productId) &&
    SIZES.includes(item.size as Size) &&
    SLEEVES.includes(item.sleeve as Sleeve) &&
    typeof item.quantity === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 1 &&
    item.quantity <= MAX_QUANTITY_PER_LINE &&
    item.key === makeCartKey(item.productId, item.size as Size, item.sleeve as Sleeve)
  );
}

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const lines = useMemo<CartLine[]>(
    () =>
      items.flatMap((item) => {
        const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
        return product ? [{ item, product }] : [];
      }),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((sum, line) => sum + line.item.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.item.quantity * line.product.price, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: ({ productId, size, sleeve, quantity }) => {
        const key = makeCartKey(productId, size, sleeve);
        setItems((current) => {
          const existing = current.find((item) => item.key === key);
          if (!existing) {
            return [...current, { key, productId, size, sleeve, quantity: Math.min(quantity, MAX_QUANTITY_PER_LINE) }];
          }
          return current.map((item) =>
            item.key === key
              ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY_PER_LINE) }
              : item,
          );
        });
      },
      updateQuantity: (key, quantity) => {
        const next = Math.min(Math.max(1, Math.round(quantity)), MAX_QUANTITY_PER_LINE);
        setItems((current) => current.map((item) => (item.key === key ? { ...item, quantity: next } : item)));
      },
      removeItem: (key) => setItems((current) => current.filter((item) => item.key !== key)),
      clearCart: () => setItems([]),
    }),
    [lines, isOpen],
  );

  return createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
