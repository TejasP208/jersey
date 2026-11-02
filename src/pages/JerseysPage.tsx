import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters from '@/components/listing/ProductFilters';
import { PRODUCTS } from '@/data/products';
import { CATEGORY_LABELS } from '@/data/site';
import { getTeam } from '@/data/teams';
import {
  SORT_OPTIONS,
  filterProducts,
  hasActiveFilters,
  parseFilters,
  serializeFilters,
  sortProducts,
} from '@/lib/catalog';
import type { CatalogFilters, SortId } from '@/lib/catalog';
import { useDocumentMeta } from '@/lib/useDocumentMeta';

const PAGE_SIZE = 12;

function getHeading(filters: CatalogFilters) {
  if (filters.query) return `Results for "${filters.query}"`;
  if (filters.categories.length === 1) return `${CATEGORY_LABELS[filters.categories[0]]} Jerseys`;
  if (filters.teams.length === 1) return getTeam(filters.teams[0])?.name ?? 'All Jerseys';
  return 'All Jerseys';
}

export default function JerseysPage() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const heading = getHeading(filters);
  useDocumentMeta(
    `${heading} | THE CLUB JERSEY`,
    'Browse football, national team, cricket and retro jerseys in fan and player versions. Filter by club, size and price.',
  );

  const results = useMemo(
    () => sortProducts(filterProducts(PRODUCTS, filters), filters.sort),
    [filters],
  );
  const visible = results.slice(0, visibleCount);
  const remaining = results.length - visible.length;

  const update = useCallback(
    (patch: Partial<CatalogFilters>, replace = false) => {
      setParams(serializeFilters({ ...filters, ...patch }), { replace });
      setVisibleCount(PAGE_SIZE);
    },
    [filters, setParams],
  );

  const clearAll = () => {
    setParams(new URLSearchParams());
    setVisibleCount(PAGE_SIZE);
  };

  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [drawerOpen]);

  const filterCount =
    filters.categories.length +
    filters.leagues.length +
    filters.teams.length +
    filters.versions.length +
    filters.sleeves.length +
    filters.sizes.length +
    (filters.price ? 1 : 0);

  return (
    <div>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
          <p className="eyebrow text-smoke">Shop the collection</p>
          <h1 className="display-lg mt-3">{heading}</h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-14">
        <div className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="btn-outline-dark px-4 py-3 lg:hidden"
            >
              <SlidersHorizontal size={16} />
              Filters {filterCount > 0 && `(${filterCount})`}
            </button>
            <div className="relative flex-1 md:max-w-sm">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-smoke" />
              <label htmlFor="jersey-search" className="sr-only">
                Search jerseys
              </label>
              <input
                id="jersey-search"
                type="search"
                value={filters.query}
                onChange={(event) => update({ query: event.target.value }, true)}
                placeholder="Search jerseys"
                className="w-full border border-line bg-white py-3 pl-11 pr-4 text-sm placeholder:text-smoke focus:border-ink focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 md:justify-end">
            <p className="text-sm text-smoke" aria-live="polite">
              <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? 'jersey' : 'jerseys'}
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-smoke">Sort</span>
              <select
                value={filters.sort}
                onChange={(event) => update({ sort: event.target.value as SortId })}
                className="cursor-pointer border border-line bg-white py-3 pl-4 pr-8 text-sm focus:border-ink focus:outline-none"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {hasActiveFilters(filters) && (
          <div className="mt-5 flex items-center justify-between text-sm">
            <p className="text-smoke">Filters applied</p>
            <button type="button" onClick={clearAll} className="underline-grow font-semibold">
              Clear all filters
            </button>
          </div>
        )}

        <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          <aside className="hidden self-start lg:sticky lg:top-32 lg:block">
            <ProductFilters filters={filters} onChange={update} />
          </aside>

          <div>
            {results.length === 0 ? (
              <div className="flex flex-col items-start gap-5 border border-dashed border-line bg-white p-10">
                <p className="font-display text-4xl tracking-wide">No jerseys match these filters</p>
                <p className="max-w-md text-sm leading-[1.5] text-smoke">
                  Try removing a filter or searching for a different club, national team or style.
                </p>
                <button type="button" onClick={clearAll} className="btn-dark">
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-4 gap-y-12 xl:grid-cols-3">
                  {visible.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="mt-14 flex flex-col items-center gap-4">
                  <p className="text-sm text-smoke">
                    Showing {visible.length} of {results.length}
                  </p>
                  {remaining > 0 && (
                    <button
                      type="button"
                      onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                      className="btn-outline-dark"
                    >
                      Load more ({remaining} left)
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-[65] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-ink/60"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-paper text-ink shadow-2xl animate-slide-in-right"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-3xl tracking-wide">Filters</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="flex h-10 w-10 items-center justify-center hover:bg-ink hover:text-paper"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <ProductFilters filters={filters} onChange={update} />
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-line bg-white p-6">
              <button type="button" onClick={clearAll} className="btn-outline-dark px-4 py-4">
                Clear
              </button>
              <button type="button" onClick={() => setDrawerOpen(false)} className="btn-dark px-4 py-4">
                Show {results.length}
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
