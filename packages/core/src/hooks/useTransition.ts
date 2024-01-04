import { useCallback, useMemo, useRef } from 'react';

import { notPxProps } from '../styles/constants';
import { RbkStyleProps, RbkTransition, TimeoutType } from '../types';
import clone from '../utils/clone';
import global from '../utils/global';
import sleep from '../utils/sleep';
import uuid from '../utils/uuid';

export default function useTransition(style?: RbkStyleProps) {
  const { web, native } = global.mapping;

  const elRef = useRef<any>();
  const styleRef = useRef(clone(style || {}));
  const timeoutRef = useRef<TimeoutType[]>([]);
  const runIdRef = useRef<string>();

  const immutableStyle = useMemo(
    () => style || {},
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

  const reset = useCallback(() => {
    stop();

    Object.entries(immutableStyle).forEach(([attr, value]) => {
      setStyle(attr, value);
    });
  }, [immutableStyle, setStyle, stop]);

  const start = useCallback(
    async (options: RbkTransition) => {
      stop();

      const runId = uuid();
      runIdRef.current = runId;

      let { to, from = styleRef.current, boomerang = false, delay = 0, duration = 200, iterations = 1 } = options;

      if (delay > 0) {
        await sleep(delay);
      }

      const meta = Object.fromEntries(
        Object.keys(to).map((attr) => {
          const [fromValue] = resolveValue(from?.[attr] || 0);
          const [toValue] = resolveValue(to[attr]);

          const diffValue = toValue - fromValue;
          const incValuePerMs = diffValue / duration;

          return [
            attr,
            {
              inc: incValuePerMs,
              from: fromValue,
              to: toValue,
            },
          ];
        }),
      );

      const animate = async () => {
        if (typeof iterations === 'number' && iterations > 0) {
          iterations--;
        }

        // Reset styles
        Object.keys(to).forEach((attr) => {
          setStyle(attr, meta[attr].from);
        });

        const baseCalc = boomerang ? 2 : 1;

        setTimeout(async () => {
          for (let i = 1; i <= baseCalc; i++) {
            const isBoomerangIteration = i % 2 === 0;

            for (let pos = 1; pos <= duration; pos++) {
              timeoutRef.current.push(
                setTimeout(() => {
                  Object.keys(to).forEach((attr) => {
                    const [currValue, unit] = resolveValue(styleRef.current[attr]);
                    const newValue = isBoomerangIteration ? currValue - meta[attr].inc : currValue + meta[attr].inc;
                    setStyle(attr, newValue, unit);
                  });
                }, pos),
              );
            }

            // Set exact target value on last iteration
            timeoutRef.current.push(
              setTimeout(() => {
                Object.keys(to).forEach((attr) => {
                  setStyle(attr, isBoomerangIteration ? meta[attr].from : meta[attr].to);
                });
              }, duration),
            );

            await sleep(duration);
          }
        }, 0);

        await sleep(duration * baseCalc + 20);

        if (iterations && runId === runIdRef.current) {
          await animate();
        }
      };

      if (iterations) {
        await animate();
      }
    },
    [resolveValue, setStyle, stop],
  );

  return {
    start,
    stop,
    reset,
    props: { ref: elRef, style },
  };
}
