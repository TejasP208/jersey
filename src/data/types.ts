export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const;
export type Size = (typeof SIZES)[number];

export const CATEGORIES = ['football', 'cricket', 'retro'] as const;
export type Category = (typeof CATEGORIES)[number];

export const VERSIONS = ['fan', 'player'] as const;
export type Version = (typeof VERSIONS)[number];

export const SLEEVES = ['full', 'half'] as const;
export type Sleeve = (typeof SLEEVES)[number];

export type League =
  | 'premier-league'
  | 'la-liga'
  | 'bundesliga'
  | 'serie-a'
  | 'ligue-1'
  | 'international';

export type TeamKind = 'club' | 'national';

export interface Team {
  slug: string;
  name: string;
  kind: TeamKind;
  league: League | null;
  logo?: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  teamSlug: string;
  version: Version;
  sleeves: Sleeve[];
  price: number;
  mrp: number | null;
  sizes: Size[];
  photos: string[];
  description: string;
  addedAt: string;
}
