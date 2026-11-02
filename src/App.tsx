import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CheckoutPage from '@/pages/CheckoutPage';
import HomePage from '@/pages/HomePage';
import JerseysPage from '@/pages/JerseysPage';
import LegalPage from '@/pages/LegalPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProductPage from '@/pages/ProductPage';
import SizeGuidePage from '@/pages/SizeGuidePage';
import WishlistPage from '@/pages/WishlistPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="jerseys" element={<JerseysPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="size-guide" element={<SizeGuidePage />} />
        <Route path="privacy" element={<LegalPage id="privacy" />} />
        <Route path="terms" element={<LegalPage id="terms" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
