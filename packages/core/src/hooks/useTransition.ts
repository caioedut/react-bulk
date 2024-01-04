import { useCallback, useMemo, useRef } from 'react';

import { notPxProps } from '../styles/constants';
import { RbkStyleProps, RbkTransition, TimeoutType } from '../types';
import clone from '../utils/clone';
import global from '../utils/global';
import sleep from '../utils/sleep';
import uuid from '../utils/uuid';

export default function useTransition(initialStyle: RbkStyleProps = {}) {
  const { web, native } = global.mapping;

  const elRef = useRef<any>();
  const styleRef = useRef(clone(initialStyle || {}));
  const timeoutRef = useRef<TimeoutType[]>([]);
  const runIdRef = useRef<string>();

  const immutableInitialStyle = useMemo(
    () => initialStyle || {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const setStyle = useCallback((attr, value, unit = null) => {
    if (!elRef.current) return;

    if (web) {
      if (!unit && !notPxProps.includes(attr)) {
        unit = 'px';
      }

      if (unit) {
        value = `${value}${unit}`;
      }

      elRef.current.style[attr] = value;
    }

    if (native) {
      if (unit === 'px') {
        unit = null;
      }

      if (unit) {
        value = `${value}${unit}`;
      }

      elRef.current.setNativeProps({ [attr]: value });
    }

    styleRef.current[attr] = value;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resolveValue = useCallback((value) => {
    const match = `${value}`.match(/^(-?[\d.]+)([a-z%]*)/i);
    return [parseFloat(match?.[1] ?? '0'), match?.[2]?.trim()?.toLowerCase() || null] as const;
  }, []);

  const stop = useCallback(() => {
    runIdRef.current = undefined;

    for (const timeout of timeoutRef.current) {
      if (timeout) {
        clearTimeout(timeout);
      }
    }

    timeoutRef.current = [];
  }, []);

  const start = useCallback(
    async (toStyle: RbkStyleProps = {}, options: RbkTransition = {}) => {
      stop();

      const runId = uuid();
      runIdRef.current = runId;

      let { duration = 200, step = 1, boomerang = false, iterations = 1 } = options;

      const from = clone(styleRef.current);
      const to = toStyle;

      const animate = async () => {
        if (runId !== runIdRef.current) {
          return;
        }

        if (typeof iterations === 'number' && iterations > 0) {
          iterations--;
        }

        for (let pos = step; pos <= duration; pos += step) {
          if (runId !== runIdRef.current) {
            return;
          }

          timeoutRef.current.push(
            setTimeout(() => {
              Object.keys(toStyle).forEach((attr) => {
                const [fromValue, unit] = resolveValue(from[attr]);
                const [toValue] = resolveValue(to[attr]);

                const diffValue = toValue - fromValue;
                const newValue = fromValue + (diffValue / duration) * pos;

                setStyle(attr, newValue, unit);
              });
            }, pos),
          );
        }

        await sleep(duration);

        if (boomerang) {
          const backFrom = toStyle;
          const backTo = immutableInitialStyle;

          for (let pos = step; pos <= duration; pos += step) {
            if (runId !== runIdRef.current) {
              return;
            }

            timeoutRef.current.push(
              setTimeout(() => {
                Object.keys(toStyle).forEach((attr) => {
                  const [fromValue, unit] = resolveValue(backFrom[attr]);
                  const [toValue] = resolveValue(backTo[attr]);

                  const diffValue = toValue - fromValue;
                  const newValue = fromValue + (diffValue / duration) * pos;

                  setStyle(attr, newValue, unit);
                });
              }, pos),
            );
          }

          await sleep(duration);
        }

        if (iterations) {
          await animate();
        }
      };

      if (iterations) {
        await animate();
      }
    },
    [immutableInitialStyle, resolveValue, setStyle, stop],
  );

  const reset = useCallback(() => {
    stop();

    Object.entries(immutableInitialStyle).forEach(([attr, value]) => {
      setStyle(attr, value);
    });
  }, [immutableInitialStyle, setStyle, stop]);

  return {
    start,
    stop,
    reset,
    props: { ref: elRef, style: initialStyle },
  };
}
