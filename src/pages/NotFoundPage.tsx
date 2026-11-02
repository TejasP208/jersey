import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

export default function NotFoundPage() {
  useDocumentMeta('Page not found | THE CLUB JERSEY', 'The page you are looking for could not be found.');

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center gap-6 px-5 py-20 md:px-10">
      <p className="eyebrow text-smoke">Error 404</p>
      <h1 className="display-xl">Off the pitch</h1>
      <p className="text-base leading-[1.5] text-smoke">
        We could not find that page. It may have moved, or the jersey may have sold out.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn-dark">
          Back to home
        </Link>
        <Link to="/jerseys" className="btn-outline-dark">
          Shop all jerseys
        </Link>
      </div>
    </section>
  );
}
