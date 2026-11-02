import { Link } from 'react-router-dom';

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" aria-label="THE CLUB JERSEY home" className="group flex items-center gap-3">
      <img
        src="/images/logo.png"
        alt="THE CLUB JERSEY logo"
        className={
          compact
            ? 'h-10 w-10 shrink-0 rounded-full object-contain shadow-sm transition-transform duration-300 group-hover:scale-105'
            : 'h-12 w-12 shrink-0 rounded-full object-contain shadow-sm transition-transform duration-300 group-hover:scale-105'
        }
      />
      <span className={compact ? 'font-display text-xl tracking-[0.08em]' : 'font-display text-2xl tracking-[0.08em]'}>
        THE CLUB JERSEY
      </span>
    </Link>
  );
}
