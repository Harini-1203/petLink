import { useEffect, useMemo, useState } from 'react';
import { HiOutlineAdjustmentsHorizontal, HiOutlineXMark } from 'react-icons/hi2';
import { AnimatePresence, motion } from 'framer-motion';
import { usePets } from '../hooks/usePets';
import { useDebounce } from '../hooks/useDebounce';
import SearchBar from '../components/pets/SearchBar';
import Filters from '../components/pets/Filters';
import PetGrid from '../components/pets/PetGrid';
import Pagination from '../components/common/Pagination';

const PAGE_SIZE = 9;

export default function Browse() {
  const { pets, fetchPets, filters, updateFilters, resetFilters } = usePets();
  const [search, setSearch] = useState(filters.search);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 350);

  const loadPets = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await fetchPets();
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters.status, filters.type, filters.location, filters.minPrice, filters.maxPrice]);

  const filteredPets = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return pets.filter((pet) => {
      if (term) {
        const haystack = `${pet.name ?? ''} ${pet.breed ?? ''}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      if (filters.status !== 'all' && pet.status !== filters.status) return false;
      if (filters.type !== 'all' && pet.type !== filters.type) return false;
      if (filters.location && !`${pet.location ?? ''}`.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.minPrice && Number(pet.price ?? 0) < Number(filters.minPrice)) return false;
      if (filters.maxPrice && Number(pet.price ?? 0) > Number(filters.maxPrice)) return false;
      return true;
    });
  }, [pets, debouncedSearch, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredPets.length / PAGE_SIZE));
  const paginatedPets = filteredPets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterCount =
    (filters.status !== 'all' ? 1 : 0) +
    (filters.type !== 'all' ? 1 : 0) +
    (filters.location ? 1 : 0) +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Browse pets</h1>
        <p className="mt-2 text-sm text-text-muted dark:text-text-muted-dark">
          {isLoading ? 'Loading listings…' : `${filteredPets.length} pet${filteredPets.length === 1 ? '' : 's'} found`}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <SearchBar value={search} onChange={setSearch} />
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3.5 text-sm font-semibold lg:hidden dark:border-white/10"
        >
          <HiOutlineAdjustmentsHorizontal className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Filters filters={filters} onChange={updateFilters} onReset={resetFilters} />
          </div>
        </aside>

        <div>
          <PetGrid pets={paginatedPets} isLoading={isLoading} error={error} onRetry={loadPets} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-bg p-5 dark:bg-bg-dark"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold">Filters</h3>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-primary-50 dark:hover:bg-white/5"
                >
                  <HiOutlineXMark className="h-5 w-5" />
                </button>
              </div>
              <Filters filters={filters} onChange={updateFilters} onReset={resetFilters} />
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-4 w-full rounded-full bg-primary-500 py-3 text-sm font-semibold text-white"
              >
                Show {filteredPets.length} results
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
