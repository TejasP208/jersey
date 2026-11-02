import { LEAGUE_LABELS, TEAMS, getTeam } from '@/data/teams';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES, SIZES, SLEEVES, VERSIONS } from '@/data/types';
import type { Category, League, Product, Size, Sleeve, Version } from '@/data/types';
import { CATEGORY_LABELS } from '@/data/site';

export const PRICE_BUCKETS = [
  { id: 'under-800', label: 'Under ₹800', min: 0, max: 799 },
  { id: '800-1199', label: '₹800 – ₹1,199', min: 800, max: 1199 },
  { id: '1200-plus', label: '₹1,200 & above', min: 1200, max: Infinity },
] as const;
export type PriceBucketId = (typeof PRICE_BUCKETS)[number]['id'];

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New Arrivals' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
] as const;
export type SortId = (typeof SORT_OPTIONS)[number]['id'];

export const VERSION_LABELS: Record<Version, string> = {
  fan: 'Fan Version',
  player: 'Player Version',
};

export const SLEEVE_LABELS: Record<Sleeve, string> = {
  full: 'Full Sleeve',
  half: 'Half Sleeve',
};

export interface CatalogFilters {
  categories: Category[];
  leagues: League[];
  teams: string[];
  versions: Version[];
  sleeves: Sleeve[];
  sizes: Size[];
  price: PriceBucketId | null;
  query: string;
  sort: SortId;
}

export const EMPTY_FILTERS: CatalogFilters = {
  categories: [],
  leagues: [],
  teams: [],
  versions: [],
  sleeves: [],
  sizes: [],
  price: null,
  query: '',
  sort: 'featured',
};

export function getProductById(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}

export function getTeamName(product: Product) {
  return getTeam(product.teamSlug)?.name ?? '';
}

function pickAll<T extends readonly string[]>(values: T, input: string[]): T[number][] {
  return input.filter((value): value is T[number] => values.includes(value));
}

export function parseFilters(params: URLSearchParams): CatalogFilters {
  const teamSlugs = TEAMS.map((team) => team.slug);
  const leagueIds = Object.keys(LEAGUE_LABELS) as League[];
  const priceId = PRICE_BUCKETS.find((bucket) => bucket.id === params.get('price'))?.id ?? null;
  const sort = SORT_OPTIONS.find((option) => option.id === params.get('sort'))?.id ?? 'featured';

  return {
    categories: pickAll(CATEGORIES, params.getAll('category')),
    leagues: pickAll(leagueIds, params.getAll('league')),
    teams: pickAll(teamSlugs, params.getAll('team')),
    versions: pickAll(VERSIONS, params.getAll('version')),
    sleeves: pickAll(SLEEVES, params.getAll('sleeve')),
    sizes: pickAll(SIZES, params.getAll('size')),
    price: priceId,
    query: params.get('q')?.trim() ?? '',
    sort,
  };
}

export function serializeFilters(filters: CatalogFilters): URLSearchParams {
  const params = new URLSearchParams();
  filters.categories.forEach((value) => params.append('category', value));
  filters.leagues.forEach((value) => params.append('league', value));
  filters.teams.forEach((value) => params.append('team', value));
  filters.versions.forEach((value) => params.append('version', value));
  filters.sleeves.forEach((value) => params.append('sleeve', value));
  filters.sizes.forEach((value) => params.append('size', value));
  if (filters.price) params.set('price', filters.price);
  if (filters.query) params.set('q', filters.query);
  if (filters.sort !== 'featured') params.set('sort', filters.sort);
  return params;
}

export function hasActiveFilters(filters: CatalogFilters) {
  return (
    filters.categories.length > 0 ||
    filters.leagues.length > 0 ||
    filters.teams.length > 0 ||
    filters.versions.length > 0 ||
    filters.sleeves.length > 0 ||
    filters.sizes.length > 0 ||
    filters.price !== null ||
    filters.query !== ''
  );
}

export function filterProducts(products: Product[], filters: CatalogFilters) {
  const bucket = PRICE_BUCKETS.find((item) => item.id === filters.price);
  const query = filters.query.toLowerCase();

  return products.filter((product) => {
    const team = getTeam(product.teamSlug);
    if (filters.categories.length && !filters.categories.includes(product.category)) return false;
    if (filters.leagues.length && (!team?.league || !filters.leagues.includes(team.league))) return false;
    if (filters.teams.length && !filters.teams.includes(product.teamSlug)) return false;
    if (filters.versions.length && !filters.versions.includes(product.version)) return false;
    if (filters.sleeves.length && !filters.sleeves.some((sleeve) => product.sleeves.includes(sleeve))) return false;
    if (filters.sizes.length && !filters.sizes.some((size) => product.sizes.includes(size))) return false;
    if (bucket && (product.price < bucket.min || product.price > bucket.max)) return false;
    if (query) {
      const haystack = [
        product.name,
        getTeamName(product),
        CATEGORY_LABELS[product.category],
        VERSION_LABELS[product.version],
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortId) {
  const sorted = [...products];
  switch (sort) {
    case 'new':
      return sorted.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}

export function getProductsForTeam(teamSlug: string) {
  return PRODUCTS.filter((product) => product.teamSlug === teamSlug);
}

export const CLUB_TEAMS = TEAMS.filter((team) => team.kind === 'club');
export const NATIONAL_TEAMS = TEAMS.filter((team) => team.kind === 'national');
export const LEAGUE_OPTIONS = (Object.keys(LEAGUE_LABELS) as League[]).map((id) => ({ id, label: LEAGUE_LABELS[id] }));
