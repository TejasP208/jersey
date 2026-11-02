import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/ui/SectionHeader';
import { FEATURED_CLUB_SLUGS } from '@/data/site';
import { getTeam } from '@/data/teams';
import { getProductsForTeam } from '@/lib/catalog';
import { photo } from '@/lib/images';

export default function ClubCollection() {
  const clubs = FEATURED_CLUB_SLUGS.flatMap((slug) => {
    const team = getTeam(slug);
    const product = getProductsForTeam(slug)[0];
    return team && product ? [{ team, photoId: product.photos[0] }] : [];
  });

  return (
    <section id="clubs" className="bg-ink py-24 text-paper md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          tone="dark"
          eyebrow="Football clubs"
          title="YOUR CLUB. YOUR COLOURS."
          subtitle="Pick your club and see every jersey we stock for it."
        />

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {clubs.map(({ team, photoId }) => (
            <Link
              key={team.slug}
              to={`/jerseys?team=${team.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-ink-deep"
            >
              <img
                src={photo(photoId, 700)}
                alt={`${team.name} jersey`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
                <span className="font-display text-2xl leading-none tracking-wide md:text-3xl">{team.name}</span>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-lime transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-lime transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
