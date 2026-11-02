import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Heart, ShoppingBag, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/components/layout/Logo';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { PRODUCTS } from '@/data/products';
import { LEAGUE_OPTIONS } from '@/lib/catalog';
import { cn } from '@/lib/cn';

const MAIN_LINKS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'cricket', label: 'Cricket', to: '/jerseys?category=cricket' },
  { id: 'retro', label: 'Retro', to: '/jerseys?category=retro' },
  { id: 'all-jerseys', label: 'All Jerseys', to: '/jerseys' },
];

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname, search } = useLocation();
  const [footballOpen, setFootballOpen] = useState(false);
  const { count: bagCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  const activeTab = useMemo(() => {
    if (pathname === '/') return 'home';

    const searchParams = new URLSearchParams(search);
    const category = searchParams.get('category');
    const hasLeague = searchParams.has('league');

    if (pathname.startsWith('/product/')) {
      const id = pathname.replace('/product/', '');
      const product = PRODUCTS.find((p) => p.id === id);
      if (product?.category === 'football') return 'football';
      if (product?.category === 'cricket') return 'cricket';
      if (product?.category === 'retro') return 'retro';
      return 'all-jerseys';
    }

    if (pathname === '/jerseys') {
      if (category === 'football' || hasLeague) return 'football';
      if (category === 'cricket') return 'cricket';
      if (category === 'retro') return 'retro';
      return 'all-jerseys';
    }

    return null;
  }, [pathname, search]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-ink text-paper transition-[opacity,visibility] duration-300 lg:hidden ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
      aria-hidden={!open}
    >
      <div className="flex h-16 items-center justify-between px-5">
        <Logo compact />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center"
        >
          <X size={24} />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-1 flex-col px-5 pb-10 pt-6">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {MAIN_LINKS.slice(0, 1).map((link) => (
            <li key={link.id}>
              <Link
                to={link.to}
                onClick={onClose}
                className={cn(
                  'block py-4 font-display text-4xl tracking-wide transition-colors',
                  activeTab === link.id ? 'text-lime' : 'hover:text-lime',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setFootballOpen((value) => !value)}
              aria-expanded={footballOpen}
              className={cn(
                'flex w-full items-center justify-between py-4 font-display text-4xl tracking-wide transition-colors',
                activeTab === 'football' ? 'text-lime' : 'hover:text-lime',
              )}
            >
              Football
              <ChevronDown size={24} className={`transition-transform duration-300 ${footballOpen ? 'rotate-180' : ''}`} />
            </button>
            {footballOpen && (
              <ul className="space-y-1 pb-4 pl-2">
                {LEAGUE_OPTIONS.map((league) => (
                  <li key={league.id}>
                    <Link
                      to={`/jerseys?league=${league.id}`}
                      onClick={onClose}
                      className="block py-2 text-base text-white/80 hover:text-lime"
                    >
                      {league.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/jerseys?category=retro"
                    onClick={onClose}
                    className="block py-2 text-base text-white/80 hover:text-lime"
                  >
                    Retro Jerseys
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {MAIN_LINKS.slice(1).map((link) => (
            <li key={link.id}>
              <Link
                to={link.to}
                onClick={onClose}
                className={cn(
                  'block py-4 font-display text-4xl tracking-wide transition-colors',
                  activeTab === link.id ? 'text-lime' : 'hover:text-lime',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Link to="/wishlist" onClick={onClose} className="btn-outline-light px-4 py-3">
            <Heart size={16} />
            Wishlist ({wishlistCount})
          </Link>
          <button
            type="button"
            onClick={() => {
              onClose();
              openCart();
            }}
            className="btn-primary px-4 py-3"
          >
            <ShoppingBag size={16} />
            Bag ({bagCount})
          </button>
        </div>
      </nav>
    </div>
  );
}
