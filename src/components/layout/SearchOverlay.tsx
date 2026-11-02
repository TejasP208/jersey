import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SUGGESTIONS = ['Real Madrid', 'Argentina', 'Retro', 'Cricket', 'Player Version'];

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const search = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/jerseys?q=${encodeURIComponent(trimmed)}`);
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search(value);
  };

  return (
    <div className="border-t border-white/10 bg-ink text-paper animate-fade-up">
      <div className="mx-auto max-w-[1440px] px-5 py-6 md:px-10">
        <form onSubmit={handleSubmit} role="search" className="flex items-center gap-3">
          <Search size={20} className="shrink-0 text-mist" aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">
            Search jerseys
          </label>
          <input
            id="site-search"
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search clubs, national teams, retro, cricket..."
            className="min-w-0 flex-1 bg-transparent py-2 text-lg text-paper placeholder:text-mist focus:outline-none md:text-2xl"
          />
          <button type="submit" className="btn-primary px-5 py-3">
            Search
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-11 w-11 shrink-0 items-center justify-center transition-colors hover:bg-white hover:text-ink"
          >
            <X size={20} />
          </button>
        </form>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="eyebrow mr-2 self-center text-mist">Popular</span>
          {SUGGESTIONS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => search(item)}
              className="border border-white/20 px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors hover:border-lime hover:text-lime"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
