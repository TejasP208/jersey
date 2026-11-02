import { Link } from 'react-router-dom';
import ProductCard from '@/components/product/ProductCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { FEATURED_PRODUCT_IDS } from '@/data/site';
import { getProductById } from '@/lib/catalog';

export default function FeaturedProducts() {
  const products = FEATURED_PRODUCT_IDS.flatMap((id) => {
    const product = getProductById(id);
    return product ? [product] : [];
  });

  return (
    <section className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeader
          eyebrow="Best sellers"
          title="THE FAN FAVOURITES."
          subtitle="The jerseys every fan wants in their collection."
          action={
            <Link to="/jerseys" className="btn-outline-dark">
              View all
            </Link>
          }
        />

        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
