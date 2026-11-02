import { Instagram } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { GALLERY_PHOTO_IDS, SOCIAL } from '@/data/site';
import { photo } from '@/lib/images';

export default function InstagramGallery() {
  return (
    <section id="instagram" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          eyebrow="Instagram"
          title="INSIDE THE CLUB CULTURE."
          subtitle="Follow us for new arrivals, jersey drops and sports culture."
          action={
            <div className="flex flex-wrap gap-3">
              {SOCIAL.instagram.map((profile) => (
                <a
                  key={profile.url}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-dark px-5 py-3"
                >
                  <Instagram size={16} />
                  {profile.handle}
                </a>
              ))}
            </div>
          }
        />

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {GALLERY_PHOTO_IDS.map((id, index) => (
            <a
              key={id}
              href={SOCIAL.instagram[0].url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open our Instagram, photo ${index + 1}`}
              className="group relative aspect-square overflow-hidden bg-ink"
            >
              <img
                src={photo(id, 700)}
                alt="Football fans and jersey culture moment"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/50">
                <Instagram
                  size={28}
                  className="scale-75 text-paper opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
