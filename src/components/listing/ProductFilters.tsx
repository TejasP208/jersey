import type { ReactNode } from 'react';
import { CATEGORIES, SIZES, SLEEVES, VERSIONS } from '@/data/types';
import type { Category, League, Sleeve, Size, Version } from '@/data/types';
import { CATEGORY_LABELS } from '@/data/site';
import { CLUB_TEAMS, LEAGUE_OPTIONS, NATIONAL_TEAMS, PRICE_BUCKETS, SLEEVE_LABELS, VERSION_LABELS } from '@/lib/catalog';
import type { CatalogFilters, PriceBucketId } from '@/lib/catalog';
import { cn } from '@/lib/cn';

interface ProductFiltersProps {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
}

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-b border-line py-6 first:pt-0">
      <legend className="eyebrow mb-4 text-ink">{title}</legend>
      {children}
    </fieldset>
  );
}

function CheckboxItem({
  label,
  checked,
  onToggle,
  icon,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
  icon?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm transition-colors hover:text-smoke">
      <input type="checkbox" checked={checked} onChange={onToggle} className="h-4 w-4 cursor-pointer accent-ink" />
      {icon && <img src={icon} alt="" className="h-4 w-4 shrink-0 object-contain" />}
      <span>{label}</span>
    </label>
  );
}

export default function ProductFilters({ filters, onChange }: ProductFiltersProps) {
  return (
    <div className="flex flex-col">
      <FilterGroup title="Category">
        {CATEGORIES.map((category: Category) => (
          <CheckboxItem
            key={category}
            label={CATEGORY_LABELS[category]}
            checked={filters.categories.includes(category)}
            onToggle={() => onChange({ categories: toggleValue(filters.categories, category) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="League">
        {LEAGUE_OPTIONS.map((league) => (
          <CheckboxItem
            key={league.id}
            label={league.label}
            checked={filters.leagues.includes(league.id as League)}
            onToggle={() => onChange({ leagues: toggleValue(filters.leagues, league.id as League) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Club">
        {CLUB_TEAMS.map((team) => (
          <CheckboxItem
            key={team.slug}
            label={team.name}
            icon={team.logo}
            checked={filters.teams.includes(team.slug)}
            onToggle={() => onChange({ teams: toggleValue(filters.teams, team.slug) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="National team">
        {NATIONAL_TEAMS.map((team) => (
          <CheckboxItem
            key={team.slug}
            label={team.name}
            icon={team.logo}
            checked={filters.teams.includes(team.slug)}
            onToggle={() => onChange({ teams: toggleValue(filters.teams, team.slug) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
          <input
            type="radio"
            name="price"
            checked={filters.price === null}
            onChange={() => onChange({ price: null })}
            className="h-4 w-4 cursor-pointer accent-ink"
          />
          <span>Any price</span>
        </label>
        {PRICE_BUCKETS.map((bucket) => (
          <label key={bucket.id} className="flex cursor-pointer items-center gap-3 py-1.5 text-sm">
            <input
              type="radio"
              name="price"
              checked={filters.price === bucket.id}
              onChange={() => onChange({ price: bucket.id as PriceBucketId })}
              className="h-4 w-4 cursor-pointer accent-ink"
            />
            <span>{bucket.label}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Version">
        {VERSIONS.map((version: Version) => (
          <CheckboxItem
            key={version}
            label={VERSION_LABELS[version]}
            checked={filters.versions.includes(version)}
            onToggle={() => onChange({ versions: toggleValue(filters.versions, version) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Sleeve">
        {SLEEVES.map((sleeve: Sleeve) => (
          <CheckboxItem
            key={sleeve}
            label={SLEEVE_LABELS[sleeve]}
            checked={filters.sleeves.includes(sleeve)}
            onToggle={() => onChange({ sleeves: toggleValue(filters.sleeves, sleeve) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Available size">
        <div className="grid grid-cols-5 gap-2">
          {SIZES.map((size: Size) => {
            const active = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ sizes: toggleValue(filters.sizes, size) })}
                className={cn(
                  'h-10 border text-sm font-semibold transition-colors',
                  active ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink',
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterGroup>
    </div>
  );
}
