import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  tone = 'light',
  align = 'left',
  action,
  className,
}: SectionHeaderProps) {
  const isDark = tone === 'dark';
  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'items-center text-center md:flex-col md:items-center',
        className,
      )}
    >
      <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <p className={cn('eyebrow mb-4', isDark ? 'text-lime' : 'text-smoke')}>{eyebrow}</p>}
        <h2 className="display-lg">{title}</h2>
        {subtitle && (
          <p className={cn('mt-4 text-base leading-[1.5] md:text-lg', isDark ? 'text-white/75' : 'text-smoke')}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
