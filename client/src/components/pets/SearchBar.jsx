import { useEffect, useRef, useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineClock, HiOutlineXMark } from 'react-icons/hi2';
import { STORAGE_KEYS } from '../../utils/constants';

function readRecent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES)) ?? [];
  } catch {
    return [];
  }
}

export default function SearchBar({ value, onChange, placeholder = 'Search by name or breed…' }) {
  const [focused, setFocused] = useState(false);
  const [recent, setRecent] = useState(readRecent);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const commitSearch = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const next = [trimmed, ...recent.filter((r) => r.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
    setRecent(next);
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(next));
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={value}
          onFocus={() => setFocused(true)}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && commitSearch(value)}
          placeholder={placeholder}
          className="w-full rounded-full border border-black/10 bg-white py-3.5 pl-11 pr-11 text-sm outline-none transition-colors focus:border-primary-400 dark:border-white/10 dark:bg-white/[0.03]"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text dark:hover:text-text-dark"
          >
            <HiOutlineXMark className="h-4 w-4" />
          </button>
        )}
      </div>

      {focused && recent.length > 0 && (
        <div className="card-surface absolute z-20 mt-2 w-full overflow-hidden p-1.5">
          <p className="px-3 pb-1 pt-1.5 text-xs font-semibold uppercase tracking-wide text-text-muted dark:text-text-muted-dark">
            Recent
          </p>
          {recent.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                onChange(term);
                commitSearch(term);
                setFocused(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm hover:bg-primary-50 dark:hover:bg-white/5"
            >
              <HiOutlineClock className="h-4 w-4 text-text-muted" />
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
