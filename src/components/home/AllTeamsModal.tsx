import { useCallback } from 'react';
import TeamBadge from '@/components/home/TeamBadge';
import Modal from '@/components/ui/Modal';
import { TEAMS } from '@/data/teams';

interface AllTeamsModalProps {
  open: boolean;
  onClose: () => void;
}

const GROUPS = [
  { title: 'Favourite clubs', teams: TEAMS.filter((team) => team.kind === 'club') },
  { title: 'International teams', teams: TEAMS.filter((team) => team.kind === 'national') },
];

export default function AllTeamsModal({ open, onClose }: AllTeamsModalProps) {
  const handleSelect = useCallback(() => onClose(), [onClose]);

  return (
    <Modal open={open} onClose={onClose} title="Shop by your favourite teams" maxWidthClass="max-w-5xl">
      <div className="space-y-12">
        {GROUPS.map((group) => (
          <section key={group.title} aria-label={group.title}>
            <h3 className="eyebrow mb-6 text-smoke">{group.title}</h3>
            <ul className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6">
              {group.teams.map((team) => (
                <li key={team.slug} className="flex justify-center">
                  <TeamBadge team={team} onSelect={handleSelect} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Modal>
  );
}
