import { PET_TYPES } from '../../utils/constants';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'adoption', label: 'Adoption' },
  { value: 'sale', label: 'For sale' },
];

export default function Filters({ filters, onChange, onReset }) {
  return (
    <div className="card-surface space-y-6 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-bold">Filters</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-primary-600 dark:text-primary-300"
        >
          Reset
        </button>
      </div>

      <div>
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-text-muted dark:text-text-muted-dark">
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ status: opt.value })}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                filters.status === opt.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-white/5 dark:text-primary-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="filter-type" className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-text-muted dark:text-text-muted-dark">
          Pet type
        </label>
        <select
          id="filter-type"
          value={filters.type}
          onChange={(e) => onChange({ type: e.target.value })}
          className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-primary-400 dark:border-white/10 dark:bg-white/[0.03]"
        >
          <option value="all">All types</option>
          {PET_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-location" className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-text-muted dark:text-text-muted-dark">
          Location
        </label>
        <input
          id="filter-location"
          type="text"
          placeholder="City or state"
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
          className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-primary-400 dark:border-white/10 dark:bg-white/[0.03]"
        />
      </div>

      <div>
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-text-muted dark:text-text-muted-dark">
          Price range
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-primary-400 dark:border-white/10 dark:bg-white/[0.03]"
          />
          <span className="text-text-muted">–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-primary-400 dark:border-white/10 dark:bg-white/[0.03]"
          />
        </div>
      </div>
    </div>
  );
}
