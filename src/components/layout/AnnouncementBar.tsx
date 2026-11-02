import { BRAND } from '@/data/site';

export default function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-9 items-center justify-center bg-ink-deep px-4 text-[11px] font-medium uppercase tracking-[0.28em] text-paper">
      {BRAND.announcement}
    </div>
  );
}
