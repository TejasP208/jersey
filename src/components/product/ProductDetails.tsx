import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import PriceTag from '@/components/product/PriceTag';
import PurchaseControls from '@/components/product/PurchaseControls';
import { getTeam } from '@/data/teams';
import type { Product } from '@/data/types';
import { STORE } from '@/data/site';
import { useWishlist } from '@/context/WishlistContext';
import { VERSION_LABELS } from '@/lib/catalog';

export default function ProductDetails({ product }: { product: Product }) {
  const team = getTeam(product.teamSlug);
  const { has, toggle } = useWishlist();
  const wishlisted = has(product.id);

  return (
    <div className="flex flex-col">
      {team && (
        <Link
          to={`/jerseys?team=${team.slug}`}
          className="eyebrow inline-flex items-center gap-2 self-start text-smoke underline-offset-4 hover:text-ink hover:underline"
        >
          {team.logo && <img src={team.logo} alt="" className="h-5 w-5 object-contain" />}
          <span>{team.name}</span>
        </Link>
      )}
      <div className="mt-3 flex items-start justify-between gap-4">
        <h1 className="display-lg">{product.name}</h1>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-line bg-white transition-colors hover:border-ink"
        >
          <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mt-5">
        <PriceTag product={product} size="lg" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="border border-ink px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
          {VERSION_LABELS[product.version]}
        </span>
        <span className="text-sm text-smoke">Sizes {product.sizes.join(', ')}</span>
      </div>

      <p className="mt-6 text-base leading-[1.5] text-smoke">{product.description}</p>

      <div className="mt-8 border-t border-line pt-8">
        <PurchaseControls product={product} variant="full" />
      </div>

      <ul className="mt-10 space-y-3 border-t border-line pt-8 text-sm leading-[1.5] text-smoke">
        <li>Order on WhatsApp and our team confirms your size, delivery and total before dispatch.</li>
        <li>Prefer to try it on? Visit us at {STORE.address}.</li>
        <li>Need help choosing? Call {STORE.phones[0]} or WhatsApp us.</li>
      </ul>
    </div>
  );
}
