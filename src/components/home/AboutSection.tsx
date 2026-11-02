import { Link } from 'react-router-dom';
import SectionHeader from '@/components/ui/SectionHeader';
import { photo } from '@/lib/images';

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper lg:aspect-[3/4]">
          <img
            src={photo('20688402', 1200)}
            alt="Store display of football jerseys on racks"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <SectionHeader eyebrow="Our story" title="MORE THAN JUST A JERSEY." />
          <div className="mt-8 space-y-6 text-base leading-[1.5] text-smoke md:text-lg">
            <p>
              At The Club Jersey, we believe a jersey is more than something you wear. It's a connection to your
              favourite club, your favourite player and the moments that make football unforgettable.
            </p>
            <p>
              From modern club collections to retro-inspired classics, we bring sports merchandise closer to fans.
            </p>
          </div>
          <Link to="/#visit" className="btn-dark mt-10">
            Discover our store
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
