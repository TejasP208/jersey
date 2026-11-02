import { useState } from 'react';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuickViewModal from '@/components/product/QuickViewModal';
import { getTeam } from '@/data/teams';
import type { Product } from '@/data/types';
import { useWishlist } from '@/context/WishlistContext';
import { VERSION_LABELS } from '@/lib/catalog';
import { discountPercent, formatPrice } from '@/lib/format';
import { photo } from '@/lib/images';

export default function ProductCard({ product }: { product: Product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { has, toggle } = useWishlist();
  const wishlisted = has(product.id);
  const discount = discountPercent(product.price, product.mrp);
  const teamName = getTeam(product.teamSlug)?.name ?? '';
  const [primaryPhoto, secondaryPhoto] = product.photos;
  const detailPath = `/product/${product.id}`;

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        <Link to={detailPath} aria-label={`View ${product.name}`} className="absolute inset-0">
          <img
            src={photo(primaryPhoto, 800)}
            alt={`${product.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {secondaryPhoto && (
            <img
              src={photo(secondaryPhoto, 800)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
            />
          )}
        </Link>

        {discount > 0 && (
          <span className="pointer-events-none absolute left-0 top-0 bg-lime px-2.5 py-1 text-xs font-semibold text-ink">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center bg-paper/95 text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="eyebrow text-[10px] text-smoke">
          {teamName} · {VERSION_LABELS[product.version]}
        </p>
        <Link
          to={detailPath}
          className="mt-1.5 text-base font-semibold leading-snug underline-offset-4 hover:underline"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-semibold">{formatPrice(product.price)}</span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-sm text-smoke line-through">{formatPrice(product.mrp)}</span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-[auto_1fr] gap-2">
          <button
            type="button"
            onClick={() => setQuickViewOpen(true)}
            aria-label={`Quick view ${product.name}`}
            className="flex h-11 items-center gap-2 border border-line bg-white px-3 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-ink"
          >
            <Eye size={15} />
            <span className="hidden sm:inline">Quick view</span>
          </button>
          <button
            type="button"
            onClick={() => setQuickViewOpen(true)}
            className="flex h-11 items-center justify-center gap-2 border border-ink bg-transparent text-xs font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:bg-ink hover:text-paper group-hover:bg-ink group-hover:text-paper"
          >
            <ShoppingBag size={15} />
            Add to bag
          </button>
        </div>
      </div>

      {quickViewOpen && <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />}
    </article>
  );
}
