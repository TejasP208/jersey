import { Link } from 'react-router-dom';
import Modal from '@/components/ui/Modal';
import PriceTag from '@/components/product/PriceTag';
import PurchaseControls from '@/components/product/PurchaseControls';
import { getTeam } from '@/data/teams';
import type { Product } from '@/data/types';
import { VERSION_LABELS } from '@/lib/catalog';
import { photo } from '@/lib/images';

export default function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const teamName = getTeam(product.teamSlug)?.name ?? '';

  return (
    <Modal open onClose={onClose} title={product.name} maxWidthClass="max-w-4xl">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-[4/5] overflow-hidden bg-white">
          <img src={photo(product.photos[0], 900)} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <p className="eyebrow text-smoke">
            {teamName} · {VERSION_LABELS[product.version]}
          </p>
          <div className="mt-4">
            <PriceTag product={product} size="md" />
          </div>
          <p className="mt-5 text-[15px] leading-[1.5] text-smoke">{product.description}</p>
          <div className="mt-8">
            <PurchaseControls product={product} variant="compact" onAdded={onClose} />
          </div>
          <Link
            to={`/product/${product.id}`}
            onClick={onClose}
            className="underline-grow mt-8 self-start text-sm font-semibold uppercase tracking-wider"
          >
            View full details
          </Link>
        </div>
      </div>
    </Modal>
  );
}
