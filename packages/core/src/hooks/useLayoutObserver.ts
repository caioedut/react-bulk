import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * Web only: emulates React Native "onLayout" event using ResizeObserver.
 * Dispatches an event with the same shape of native: { nativeEvent: { layout: { x, y, width, height } } }
 */
export default function useLayoutObserver(elRef: MutableRefObject<any>, callback?: (event: any) => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const hasCallback = Boolean(callback);
  const observedRef = useRef<{ el: any; observer: ResizeObserver } | null>(null);

  // Cleanup on unmount
  useEffect(() => () => observedRef.current?.observer.disconnect(), []);

  // No deps: element may change between renders (eg: remount)
  useEffect(() => {
    const el = hasCallback ? (elRef?.current ?? null) : null;

    if (observedRef.current?.el === el) return;

    observedRef.current?.observer.disconnect();
    observedRef.current = null;

    if (!el || typeof ResizeObserver === 'undefined') return;

    const parent = el.parentElement;
    let prev = '';

    const dispatch = () => {
      const rect = el.getBoundingClientRect();
      const parentRect = parent?.getBoundingClientRect();

      // Same as native: position relative to parent, size without transforms
      const layout = {
        x: parentRect ? rect.left - parentRect.left + parent.scrollLeft : rect.left,
        y: parentRect ? rect.top - parentRect.top + parent.scrollTop : rect.top,
        width: el.offsetWidth ?? rect.width,
        height: el.offsetHeight ?? rect.height,
      };

      const key = `${layout.x}|${layout.y}|${layout.width}|${layout.height}`;
      if (key === prev) return;
      prev = key;

      callbackRef.current?.({
        type: 'layout',
        target: el,
        currentTarget: el,
        nativeEvent: { layout, target: el },
      });
    };

    const observer = new ResizeObserver(dispatch);
    observer.observe(el);

    // Parent resizing may move the element without changing its size
    if (parent) {
      observer.observe(parent);
    }

    observedRef.current = { el, observer };
  });
}
