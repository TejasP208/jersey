import { useState } from 'react';
import { photo } from '@/lib/images';
import { cn } from '@/lib/cn';
import type { Product } from '@/data/types';

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const activeId = product.photos[active];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        <img
          key={activeId}
          src={photo(activeId, 1200)}
          alt={`${product.name}, photo ${active + 1} of ${product.photos.length}`}
          className="h-full w-full object-cover animate-fade-up"
        />
      </div>
      <div className="flex gap-3" role="group" aria-label="Product photos">
        {product.photos.map((id, index) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show photo ${index + 1}`}
            aria-current={index === active}
            className={cn(
              'h-24 w-20 overflow-hidden border-2 transition-all duration-300 md:h-28 md:w-24',
              index === active ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100',
            )}
          >
            <img src={photo(id, 300)} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
