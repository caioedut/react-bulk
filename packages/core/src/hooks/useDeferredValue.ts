import { useEffect, useRef, useState } from 'react';

import { TimeoutType } from '../types';

export default function useDeferredValue<T>(value: T, delayMs = 500) {
  const timeoutRef = useRef<TimeoutType>();

  const [state, setState] = useState(value);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setState(value);
    }, delayMs);
  }, [value, delayMs]);

  return state;
}
