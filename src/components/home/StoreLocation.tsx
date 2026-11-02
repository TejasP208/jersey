import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { STORE } from '@/data/site';

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.mapsQuery)}`;
const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(STORE.mapsQuery)}&output=embed`;

export default function StoreLocation() {
  return (
    <section id="visit" className="bg-ink py-24 text-paper md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader tone="dark" eyebrow="Visit the store" title="YOUR NEXT FAVOURITE JERSEY IS WAITING." />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="border border-white/10 bg-ink-deep p-8 md:p-10 lg:col-span-5">
            <p className="eyebrow text-lime">Flagship store</p>
            <h3 className="mt-3 font-display text-4xl tracking-wide md:text-5xl">{STORE.name}</h3>

            <ul className="mt-8 space-y-6 text-[15px] leading-[1.5] text-white/80">
              <li className="flex gap-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-lime" />
                <span>{STORE.address}</span>
              </li>
              <li className="flex gap-4">
                <Navigation size={20} className="mt-0.5 shrink-0 text-lime" />
                <span>
                  {STORE.landmarks.map((landmark) => (
                    <span key={landmark} className="block">
                      {landmark}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-4">
                <Phone size={20} className="mt-0.5 shrink-0 text-lime" />
                <span className="flex flex-wrap gap-x-5 gap-y-1">
                  {STORE.phones.map((phone) => (
                    <a key={phone} href={`tel:+91${phone}`} className="underline-grow hover:text-white">
                      {phone}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-4">
                <Clock size={20} className="mt-0.5 shrink-0 text-lime" />
                <span>{STORE.timings}</span>
              </li>
            </ul>

            <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-4">
                Get directions
              </a>
              <a href="tel:+919326786457" className="btn-outline-light px-4 py-4">
                Call store
              </a>
              <a
                href={`https://wa.me/${STORE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light px-4 py-4"
              >
                <MessageCircle size={16} />
                WhatsApp us
              </a>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-ink-deep lg:col-span-7">
            <iframe
              title="Map showing THE CLUB JERSEY store in Prabhadevi, Mumbai"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border border-white/10 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="eyebrow text-lime">Second branch</p>
            <h3 className="mt-3 font-display text-3xl tracking-wide md:text-4xl">{STORE.branches.name}</h3>
            <p className="mt-2 max-w-xl text-[15px] leading-[1.5] text-white/75">{STORE.branches.note}</p>
          </div>
          <a href={`tel:+91${STORE.phones[0]}`} className="btn-outline-light shrink-0">
            Call for updates
          </a>
        </div>
      </div>
    </section>
  );
}
