import { BRAND, SOCIAL, STORE } from '@/data/site';
import { Instagram, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '@/components/layout/Logo';

const SHOP_LINKS = [
  { label: 'Football Jerseys', to: '/jerseys?category=football' },
  { label: 'Cricket Jerseys', to: '/jerseys?category=cricket' },
  { label: 'Retro Collection', to: '/jerseys?category=retro' },
  { label: 'All Products', to: '/jerseys' },
];

const INFO_LINKS = [
  { label: 'About Us', to: '/#about' },
  { label: 'Contact Us', to: '/#visit' },
  { label: 'Size Guide', to: '/size-guide' },
  { label: 'FAQs', to: '/#faq' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms and Conditions', to: '/terms' },
];

const linkClass = 'text-sm text-white/70 underline-grow after:bg-lime hover:text-white';
const columnTitle = 'eyebrow mb-5 text-lime';

export default function Footer() {
  return (
    <footer className="bg-ink-deep text-paper">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 py-20 md:grid-cols-2 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 font-display text-2xl tracking-wide text-white/90">{BRAND.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-[1.5] text-white/60">
            Premium football and cricket jerseys for fans, players and collectors in Mumbai.
          </p>
        </div>

        <div className="lg:col-span-2">
          <p className={columnTitle}>Shop</p>
          <ul className="space-y-3">
            {SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className={columnTitle}>Information</p>
          <ul className="space-y-3">
            {INFO_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className={columnTitle}>Contact</p>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-lime" />
              <span>Prabhadevi, Mumbai – 400013</span>
            </li>
            {STORE.phones.map((phone) => (
              <li key={phone} className="flex gap-3">
                <Phone size={18} className="shrink-0 text-lime" />
                <a href={`tel:+91${phone}`} className="hover:text-white">
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <p className={columnTitle}>Social</p>
          <ul className="space-y-4">
            {SOCIAL.instagram.map((profile) => (
              <li key={profile.url}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-lime"
                >
                  <Instagram size={18} className="shrink-0 text-lime" />
                  {profile.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-xs uppercase tracking-[0.15em] text-white/50 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© 2026 THE CLUB JERSEY. ALL RIGHTS RESERVED.</p>
          <p>Prabhadevi · Mumbai</p>
        </div>
      </div>
    </footer>
  );
}
