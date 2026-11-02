import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TEAM_MONOGRAMS } from '@/data/site';
import type { Team } from '@/data/types';
import { cn } from '@/lib/cn';

interface TeamBadgeProps {
  team: Team;
  onSelect?: () => void;
  className?: string;
}

export default function TeamBadge({ team, onSelect, className }: TeamBadgeProps) {
  const [hasError, setHasError] = useState(false);
  const logoSrc = team.logo || `/images/teams/${team.slug}.png`;

  return (
    <Link
      to={`/jerseys?team=${team.slug}`}
      onClick={onSelect}
      aria-label={`Shop ${team.name} jerseys`}
      className={cn('group flex flex-col items-center gap-3 text-center', className)}
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-white p-3.5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-ink group-hover:shadow-md group-focus-visible:border-ink md:h-24 md:w-24 md:p-4">
        {!hasError ? (
          <img
            src={logoSrc}
            alt={`${team.name} logo`}
            loading="lazy"
            onError={() => setHasError(true)}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <span className="font-display text-2xl tracking-wide text-ink md:text-3xl">
            {TEAM_MONOGRAMS[team.slug]}
          </span>
        )}
      </span>
      <span className="text-xs font-semibold leading-tight transition-colors group-hover:text-smoke">{team.name}</span>
    </Link>
  );
}
