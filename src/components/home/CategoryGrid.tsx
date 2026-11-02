import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/ui/SectionHeader';
import { CATEGORY_CARDS, CATEGORY_LABELS } from '@/data/site';
import { photo } from '@/lib/images';
import { cn } from '@/lib/cn';

const LAYOUT: Record<string, string> = {
  football: 'lg:col-span-7 lg:row-span-2 min-h-[420px] lg:min-h-0',
  cricket: 'lg:col-span-5 lg:row-span-2 min-h-[280px] lg:min-h-0',
  retro: 'lg:col-span-12 min-h-[240px] lg:min-h-0',
};

export default function CategoryGrid() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          eyebrow="Categories"
          title="SHOP BY YOUR GAME."
          subtitle="Find your colours. Find your collection."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[300px_300px_240px]">
          {CATEGORY_CARDS.map((card) => {
            const label = CATEGORY_LABELS[card.category];
            return (
              <Link
                key={card.category}
                to={card.to}
                className={cn(
                  'group relative block overflow-hidden bg-ink text-white',
                  LAYOUT[card.category],
                  card.category === 'retro' && 'md:col-span-2',
                )}
              >
                <img
                  src={photo(card.photoId, 1400)}
                  alt={`${label} jersey photography`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <p className="eyebrow mb-2 text-lime">{card.description}</p>
                    <h3 className="font-display text-5xl tracking-wide md:text-6xl">{label.toUpperCase()}</h3>
                  </div>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/60 transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
