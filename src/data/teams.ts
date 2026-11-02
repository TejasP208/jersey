import type { League, Team } from '@/data/types';

export const LEAGUE_LABELS: Record<League, string> = {
  'premier-league': 'Premier League',
  'la-liga': 'La Liga',
  bundesliga: 'Bundesliga',
  'serie-a': 'Serie A',
  'ligue-1': 'Ligue 1',
  international: 'International Teams',
};

const RAW_TEAMS: Omit<Team, 'logo'>[] = [
  { slug: 'real-madrid', name: 'Real Madrid', kind: 'club', league: 'la-liga' },
  { slug: 'barcelona', name: 'FC Barcelona', kind: 'club', league: 'la-liga' },
  { slug: 'manchester-united', name: 'Manchester United', kind: 'club', league: 'premier-league' },
  { slug: 'arsenal', name: 'Arsenal', kind: 'club', league: 'premier-league' },
  { slug: 'liverpool', name: 'Liverpool', kind: 'club', league: 'premier-league' },
  { slug: 'chelsea', name: 'Chelsea', kind: 'club', league: 'premier-league' },
  { slug: 'psg', name: 'Paris Saint-Germain', kind: 'club', league: 'ligue-1' },
  { slug: 'bayern-munich', name: 'Bayern Munich', kind: 'club', league: 'bundesliga' },
  { slug: 'ac-milan', name: 'AC Milan', kind: 'club', league: 'serie-a' },
  { slug: 'inter-milan', name: 'Inter Milan', kind: 'club', league: 'serie-a' },
  { slug: 'manchester-city', name: 'Manchester City', kind: 'club', league: 'premier-league' },
  { slug: 'tottenham', name: 'Tottenham Hotspur', kind: 'club', league: 'premier-league' },
  { slug: 'borussia-dortmund', name: 'Borussia Dortmund', kind: 'club', league: 'bundesliga' },
  { slug: 'atletico-madrid', name: 'Atletico Madrid', kind: 'club', league: 'la-liga' },
  { slug: 'juventus', name: 'Juventus', kind: 'club', league: 'serie-a' },
  { slug: 'inter-miami', name: 'Inter Miami', kind: 'club', league: null },
  { slug: 'al-hilal', name: 'Al Hilal', kind: 'club', league: null },
  { slug: 'argentina', name: 'Argentina', kind: 'national', league: 'international' },
  { slug: 'brazil', name: 'Brazil', kind: 'national', league: 'international' },
  { slug: 'india', name: 'India Cricket', kind: 'national', league: 'international' },
  { slug: 'india-football', name: 'India Football', kind: 'national', league: 'international' },
  { slug: 'england', name: 'England', kind: 'national', league: 'international' },
  { slug: 'france', name: 'France', kind: 'national', league: 'international' },
  { slug: 'spain', name: 'Spain', kind: 'national', league: 'international' },
  { slug: 'portugal', name: 'Portugal', kind: 'national', league: 'international' },
  { slug: 'netherlands', name: 'Netherlands', kind: 'national', league: 'international' },
  { slug: 'belgium', name: 'Belgium', kind: 'national', league: 'international' },
  { slug: 'germany', name: 'Germany', kind: 'national', league: 'international' },
  { slug: 'mexico', name: 'Mexico', kind: 'national', league: 'international' },
  { slug: 'japan', name: 'Japan', kind: 'national', league: 'international' },
  { slug: 'italy', name: 'Italy', kind: 'national', league: 'international' },
];

export const TEAMS: Team[] = RAW_TEAMS.map((team) => ({
  ...team,
  logo: `/images/teams/${team.slug}.png`,
}));

export function getTeam(slug: string) {
  return TEAMS.find((team) => team.slug === slug);
}
