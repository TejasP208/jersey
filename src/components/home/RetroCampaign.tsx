import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { photo } from '@/lib/images';

const RETRO_PHOTO_ID = '10821308';

export default function RetroCampaign() {
  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-ink text-paper md:min-h-[720px]">
      <img
        src={photo(RETRO_PHOTO_ID, 1920)}
        alt="Close-up of a worn vintage football"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover [filter:sepia(0.45)_contrast(1.05)_brightness(0.8)]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/30" />

      <div className="mx-auto w-full max-w-[1440px] px-5 py-24 md:px-10">
        <div className="max-w-2xl border-l-2 border-lime pl-6 md:pl-10">
          <p className="eyebrow text-lime">The retro edit</p>
          <h2 className="display-xl mt-6">SOME JERSEYS NEVER GET OLD.</h2>
          <p className="mt-6 max-w-lg text-base leading-[1.5] text-white/85 md:text-lg">
            Relive iconic eras, legendary teams and unforgettable football moments.
          </p>
          <Link to="/jerseys?category=retro" className="btn-primary mt-10">
            Explore retro collection
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
