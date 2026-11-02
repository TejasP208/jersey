import { formatPrice, discountPercent } from '@/lib/format';
import type { Product } from '@/data/types';
import { cn } from '@/lib/cn';

interface PriceTagProps {
  product: Product;
  size?: 'md' | 'lg';
}

export default function PriceTag({ product, size = 'md' }: PriceTagProps) {
  const discount = discountPercent(product.price, product.mrp);
  const hasDiscount = product.mrp !== null && product.mrp > product.price;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={cn('font-semibold', size === 'lg' ? 'text-3xl' : 'text-2xl')}>
        {formatPrice(product.price)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-base text-smoke line-through">{formatPrice(product.mrp ?? 0)}</span>
          <span className="bg-lime px-2 py-1 text-xs font-semibold uppercase tracking-wider text-ink">
            Save {discount}%
          </span>
        </>
      )}
    </div>
  );
}
