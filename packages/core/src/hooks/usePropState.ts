import { useEffect, useState } from 'react';

export default function usePropState(initialState: any, prop: any) {
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    if (typeof prop === 'undefined') return;

    if (value !== prop) {
      setValue(prop);
    }
  }, [prop]);

  return [value, setValue];
}
