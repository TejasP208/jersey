import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CLUB_TEAMS, LEAGUE_OPTIONS, NATIONAL_TEAMS } from '@/lib/catalog';
import { photo } from '@/lib/images';

const MEGA_PHOTO_ID = '27642303';

export default function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="football-mega-menu"
      className={`absolute inset-x-0 top-full border-t border-line bg-paper text-ink shadow-2xl transition-all duration-300 ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
      }`}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-8 px-10 py-10">
        <div className="col-span-4 lg:col-span-3">
          <p className="eyebrow mb-4 text-smoke">Shop by league</p>
          <ul className="space-y-1">
            {LEAGUE_OPTIONS.map((league) => (
              <li key={league.id}>
                <Link
                  to={`/jerseys?league=${league.id}`}
                  onClick={onClose}
                  className="group flex items-center justify-between px-3 py-2.5 font-display text-2xl tracking-wide transition-colors hover:bg-ink hover:text-paper"
                >
                  {league.label}
                  <ArrowRight size={16} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/jerseys?category=retro"
                onClick={onClose}
                className="group flex items-center justify-between px-3 py-2.5 font-display text-2xl tracking-wide transition-colors hover:bg-ink hover:text-paper"
              >
                Retro Jerseys
                <ArrowRight size={16} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-4 lg:col-span-3">
          <p className="eyebrow mb-4 text-smoke">Popular clubs</p>
          <ul className="grid grid-cols-1 gap-1">
            {CLUB_TEAMS.slice(0, 8).map((team) => (
              <li key={team.slug}>
                <Link
                  to={`/jerseys?team=${team.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
                >
                  {team.logo && <img src={team.logo} alt="" className="h-4 w-4 shrink-0 object-contain" />}
                  <span>{team.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-4 lg:col-span-3">
          <p className="eyebrow mb-4 text-smoke">National teams</p>
          <ul className="grid grid-cols-1 gap-1">
            {NATIONAL_TEAMS.filter((team) => team.league === 'international').map((team) => (
              <li key={team.slug}>
                <Link
                  to={`/jerseys?team=${team.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
                >
                  {team.logo && <img src={team.logo} alt="" className="h-4 w-4 shrink-0 object-contain" />}
                  <span>{team.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/jerseys?category=football"
          onClick={onClose}
          className="group relative col-span-12 flex aspect-[16/7] overflow-hidden lg:col-span-3 lg:aspect-auto"
        >
          <img
            src={photo(MEGA_PHOTO_ID, 800)}
            alt="Football fans wearing club jerseys"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-ink/40" />
          <span className="relative mt-auto flex w-full items-center justify-between p-5 font-display text-3xl tracking-wide text-paper">
            Shop all football
            <ArrowRight size={20} className="text-lime" />
          </span>
        </Link>
      </div>
    </div>
  );
}
