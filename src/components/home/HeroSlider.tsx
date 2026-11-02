import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HERO_SLIDES } from '@/data/site';
import { cn } from '@/lib/cn';

const AUTOPLAY_MS = 6500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;
  const slide = HERO_SLIDES[index];

  const goTo = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, index, count]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Campaigns"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {HERO_SLIDES.map((item, position) => (
        <div
          key={item.id}
          aria-hidden={position !== index}
          className={cn(
            'absolute inset-0 transition-opacity duration-[1200ms] ease-out',
            position === index ? 'opacity-100' : 'opacity-0',
          )}
        >
          <img
            src={item.image}
            alt={position === index ? item.alt : ''}
            fetchPriority={position === 0 ? 'high' : 'low'}
            className={cn(
              'h-full w-full object-cover transition-transform duration-[9000ms] ease-out',
              position === index ? 'scale-105' : 'scale-100',
            )}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/80 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pb-36 pt-36 md:px-10 md:pt-44">
        <div key={slide.id} className="max-w-3xl animate-fade-up">
          <h1 className="display-xl">
            {slide.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-base leading-[1.5] text-white/85 md:text-lg">{slide.description}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to={slide.primary.to} className="btn-primary">
              {slide.primary.label}
              <ArrowRight size={16} />
            </Link>
            {slide.secondary && (
              <Link to={slide.secondary.to} className="btn-outline-light">
                {slide.secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-5 pb-8 md:px-10">
        <div className="flex items-center gap-3" role="group" aria-label="Choose campaign">
          {HERO_SLIDES.map((item, position) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(position)}
              aria-label={`Show campaign ${position + 1}`}
              aria-current={position === index}
              className="group flex h-8 items-center"
            >
              <span
                className={cn(
                  'h-[3px] transition-all duration-500',
                  position === index ? 'w-14 bg-lime' : 'w-8 bg-white/35 group-hover:bg-white/70',
                )}
              />
            </button>
          ))}
          <span className="ml-3 font-display text-xl tracking-wider text-white/80">
            0{index + 1} / 0{count}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous campaign"
            className="flex h-12 w-12 items-center justify-center border border-white/40 transition-colors hover:bg-white hover:text-ink"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next campaign"
            className="flex h-12 w-12 items-center justify-center border border-white/40 transition-colors hover:bg-white hover:text-ink"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
