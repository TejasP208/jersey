import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage';
import ProductCard from '@/components/product/ProductCard';
import ProductDetails from '@/components/product/ProductDetails';
import ProductGallery from '@/components/product/ProductGallery';
import { PRODUCTS } from '@/data/products';
import { getTeam } from '@/data/teams';
import { getProductById } from '@/lib/catalog';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

const RELATED_LIMIT = 4;

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;

  useDocumentMeta(
    product ? `${product.name} | THE CLUB JERSEY` : 'Jersey not found | THE CLUB JERSEY',
    product?.description ?? 'This jersey could not be found.',
  );

  if (!product) return <NotFoundPage />;

  const team = getTeam(product.teamSlug);
  const related = PRODUCTS.filter(
    (candidate) => candidate.id !== product.id && (candidate.teamSlug === product.teamSlug || candidate.category === product.category),
  )
    .sort((a, b) => Number(b.teamSlug === product.teamSlug) - Number(a.teamSlug === product.teamSlug))
    .slice(0, RELATED_LIMIT);

  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-10">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-wider text-smoke">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-ink hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/jerseys" className="hover:text-ink hover:underline">
                Jerseys
              </Link>
            </li>
            {team && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to={`/jerseys?team=${team.slug}`} className="hover:text-ink hover:underline">
                    {team.name}
                  </Link>
                </li>
              </>
            )}
          </ol>
        </nav>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-10 md:px-10 md:py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <ProductGallery product={product} />
        <ProductDetails product={product} />
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
            <p className="eyebrow text-smoke">Keep browsing</p>
            <h2 className="display-lg mt-3">You may also like</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
