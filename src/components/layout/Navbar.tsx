import { useCallback, useEffect, useMemo, useState } from 'react';
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/components/layout/Logo';
import MegaMenu from '@/components/layout/MegaMenu';
import MobileMenu from '@/components/layout/MobileMenu';
import SearchOverlay from '@/components/layout/SearchOverlay';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { PRODUCTS } from '@/data/products';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'cricket', label: 'Cricket', to: '/jerseys?category=cricket' },
  { id: 'retro', label: 'Retro', to: '/jerseys?category=retro' },
  { id: 'all-jerseys', label: 'All Jerseys', to: '/jerseys' },
];

function Badge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-lime px-1 text-[10px] font-semibold leading-none text-ink">
      {count}
    </span>
  );
}

const iconButtonClass =
  'relative flex h-11 w-11 items-center justify-center transition-colors duration-300 hover:bg-white/10';

export default function Navbar() {
  const { pathname, search } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count: bagCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  const activeTab = useMemo(() => {
    if (isHome) return 'home';

    const searchParams = new URLSearchParams(search);
    const category = searchParams.get('category');
    const hasLeague = searchParams.has('league');

    // If viewing a single product, resolve its category
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
  }, [isHome, pathname, search]);

  const isFootballActive = activeTab === 'football' || megaOpen;

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const solid = !isHome || scrolled || megaOpen;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-9 z-40 transition-colors duration-500',
        solid ? 'bg-ink text-paper shadow-[0_1px_0_rgba(255,255,255,0.08)]' : 'bg-transparent text-white',
      )}
      onMouseLeave={() => setMegaOpen(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setMegaOpen(false);
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:h-[72px] md:px-10">
        <Logo compact />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[13px] font-medium uppercase tracking-[0.18em]">
            <li>
              <Link
                to="/"
                className={cn('underline-grow after:bg-lime', activeTab === 'home' && 'active')}
                onMouseEnter={() => setMegaOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <button
                type="button"
                aria-expanded={megaOpen}
                aria-controls="football-mega-menu"
                onMouseEnter={() => setMegaOpen(true)}
                onFocus={() => setMegaOpen(true)}
                onClick={() => setMegaOpen((value) => !value)}
                className={cn(
                  'underline-grow flex items-center gap-1 uppercase after:bg-lime',
                  isFootballActive && 'active',
                )}
              >
                Football
              </button>
            </li>
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.id}>
                <Link
                  to={link.to}
                  className={cn('underline-grow after:bg-lime', activeTab === link.id && 'active')}
                  onMouseEnter={() => setMegaOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setSearchOpen((value) => !value)} aria-label="Search" className={iconButtonClass}>
            <Search size={20} />
          </button>
          <Link to="/wishlist" aria-label={`Wishlist, ${wishlistCount} items`} className={cn(iconButtonClass, 'hidden sm:flex')}>
            <Heart size={20} />
            <Badge count={wishlistCount} />
          </Link>
          <button type="button" onClick={openCart} aria-label={`Shopping bag, ${bagCount} items`} className={iconButtonClass}>
            <ShoppingBag size={20} />
            <Badge count={bagCount} />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={cn(iconButtonClass, 'lg:hidden')}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {searchOpen && <SearchOverlay onClose={closeSearch} />}

      <div className="hidden lg:block">
        <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
      </div>

      <MobileMenu open={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
