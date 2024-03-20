import { useCallback, useEffect, useRef, useState } from 'react';

import { TimeoutType } from '@react-bulk/core';

const getWindowDimensions = () => {
  let width = 0;
  let height = 0;

  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  return { width, height };
};

export default function useDimensions(enabled = true) {
  const timeoutRef = useRef<TimeoutType>(null);

  const [dimensions, setDimensions] = useState(getWindowDimensions());

  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDimensions(getWindowDimensions());
    }, 50);
  }, [timeoutRef]);

  useEffect(() => {
    if (!enabled) return;
    if (!window) return;

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [enabled, handleResize]);

  return dimensions;
}
