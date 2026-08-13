import { createContext, useCallback, useMemo, useState } from 'react';

export const LoadingContext = createContext(null);

/**
 * Tracks a count rather than a boolean so overlapping async calls
 * (e.g. two fetches in parallel) don't hide the loader too early.
 */
export function LoadingProvider({ children }) {
  const [count, setCount] = useState(0);

  const startLoading = useCallback(() => setCount((c) => c + 1), []);
  const stopLoading = useCallback(() => setCount((c) => Math.max(0, c - 1)), []);

  const withLoading = useCallback(
    async (fn) => {
      startLoading();
      try {
        return await fn();
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  const value = useMemo(
    () => ({ isLoading: count > 0, startLoading, stopLoading, withLoading }),
    [count, startLoading, stopLoading, withLoading]
  );

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}
