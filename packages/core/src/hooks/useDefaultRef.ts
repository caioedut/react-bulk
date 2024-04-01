import { useImperativeHandle, useRef } from 'react';

export default function useDefaultRef<T = undefined>(ref: any, initialValue?: T | null) {
  // @ts-expect-error
  const defaultRef = useRef<T>(initialValue);

  useImperativeHandle(ref, () => defaultRef.current, [defaultRef]);

  return defaultRef;
}
