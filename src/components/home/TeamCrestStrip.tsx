import { useState } from 'react';
import AllTeamsModal from '@/components/home/AllTeamsModal';
import TeamBadge from '@/components/home/TeamBadge';
import { FEATURED_CLUB_SLUGS, FEATURED_INTERNATIONAL_SLUGS } from '@/data/site';
import { getTeam } from '@/data/teams';

export default function TeamCrestStrip() {
  const [allTeamsOpen, setAllTeamsOpen] = useState(false);

  // Display only first 6 clubs
  const clubs = FEATURED_CLUB_SLUGS.slice(0, 6).flatMap((slug) => {
    const team = getTeam(slug);
    return team ? [team] : [];
  });

  // Display 5 international teams below
  const internationalTeams = FEATURED_INTERNATIONAL_SLUGS.slice(0, 5).flatMap((slug) => {
    const team = getTeam(slug);
    return team ? [team] : [];
  });

  const viewAllButton = (
    <button type="button" onClick={() => setAllTeamsOpen(true)} className="btn-outline-dark">
      View all
    </button>
  );

  return (
    <section aria-labelledby="team-strip-title" className="border-b border-line bg-paper py-14 md:py-16">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3 text-smoke">Teams</p>
            <h2 id="team-strip-title" className="font-display text-4xl leading-[1.2] tracking-wide md:text-5xl">
              SHOP BY YOUR FAVOURITE TEAMS
            </h2>
          </div>
          <div className="hidden sm:block">{viewAllButton}</div>
        </div>

        {/* First 6 Clubs */}
        <div className="mt-10">
          <p className="eyebrow mb-4 text-smoke">Clubs</p>
          <ul className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-6 md:gap-x-6">
            {clubs.map((team) => (
              <li key={team.slug} className="flex justify-center">
                <TeamBadge team={team} className="w-full" />
              </li>
            ))}
          </ul>
        </div>

        {/* 5 International Teams */}
        <div className="mt-10 border-t border-line/60 pt-8">
          <p className="eyebrow mb-4 text-smoke">International Teams</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-5 md:gap-x-6">
            {internationalTeams.map((team) => (
              <li key={team.slug} className="flex justify-center">
                <TeamBadge team={team} className="w-full" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 sm:hidden">
          <button type="button" onClick={() => setAllTeamsOpen(true)} className="btn-outline-dark w-full">
            View all
          </button>
        </div>
      </div>

      <AllTeamsModal open={allTeamsOpen} onClose={() => setAllTeamsOpen(false)} />
    </section>
  );
}
