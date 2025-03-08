

import { useMemo } from 'react';

export function useQuery() {
  const { search } = window.location;
  return useMemo(() => new URLSearchParams(search), [search]);
}