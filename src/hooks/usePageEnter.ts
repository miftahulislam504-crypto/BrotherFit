'use client';

import { useEffect, useState } from 'react';

export function usePageEnter(delay = 0) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return entered;
}
