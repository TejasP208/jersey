import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { PRODUCTS } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export default function WishlistPage() {
  useDocumentMeta('Wishlist | THE CLUB JERSEY', 'Your saved jerseys from The Club Jersey.');
  const { ids } = useWishlist();
  const saved = ids
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-16">
      <p className="eyebrow text-smoke">Saved for later</p>
      <h1 className="display-lg mt-3">Your wishlist</h1>

      {saved.length === 0 ? (
        <div className="mt-12 flex flex-col items-start gap-5 border border-dashed border-line bg-white p-10">
          <Heart size={36} aria-hidden="true" />
          <p className="font-display text-4xl tracking-wide">Nothing saved yet</p>
          <p className="max-w-md text-sm leading-[1.5] text-smoke">
            Tap the heart on any jersey to save it here for later.
          </p>
          <Link to="/jerseys" className="btn-dark">
            Browse jerseys
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
          {saved.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
