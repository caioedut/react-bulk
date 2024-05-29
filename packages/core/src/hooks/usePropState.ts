import { useEffect, useState } from 'react';

export default function usePropState<T>(prop: T | undefined, initialState?: T | (() => T)) {
  const [state, setState] = useState<T>((typeof prop !== 'undefined' ? prop : initialState) as T);

  useEffect(() => {
    if (typeof prop !== 'undefined') {
      setState(prop);
    }
  }, [prop]);

  return [state, setState] as const;
}
