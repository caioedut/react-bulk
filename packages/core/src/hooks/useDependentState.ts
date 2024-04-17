import { useMemo, useState } from 'react';

export default function useDependentState<T>(factory: (current?: T) => T, deps: unknown[]) {
  const [state, setState] = useState<T>(factory(undefined));

  useMemo(() => {
    setState(factory);
  }, deps);

  return [state, setState] as const;
}
