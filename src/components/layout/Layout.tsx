import { Outlet, useLocation } from 'react-router-dom';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ScrollToTop from '@/components/layout/ScrollToTop';
import CartDrawer from '@/components/cart/CartDrawer';
import { cn } from '@/lib/cn';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />
      <main className={cn('flex-1', !isHome && 'pt-[100px] md:pt-[108px]')}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
