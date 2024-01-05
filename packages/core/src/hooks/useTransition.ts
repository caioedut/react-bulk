import { useCallback, useMemo, useRef } from 'react';

import { notPxProps } from '../styles/constants';
import jss from '../styles/jss';
import { RbkStyleProps, RbkTransition, TimeoutType } from '../types';
import clone from '../utils/clone';
import defined from '../utils/defined';
import global from '../utils/global';
import sleep from '../utils/sleep';
import uuid from '../utils/uuid';
import useTheme from './useTheme';

export default function useTransition(style?: RbkStyleProps) {
  const theme = useTheme();
  const { web, native } = global.mapping;

  const baseStyle = useMemo(() => jss({ theme }, style), [theme, style]);

  const elRef = useRef<any>();
  const styleRef = useRef(clone(baseStyle));
  const timeoutRef = useRef<TimeoutType[]>([]);
  const runIdRef = useRef<string>();

  const setStyle = useCallback(
    (attr: string, value: any, unit = null) => {
      if (!elRef.current) return;

      if (web) {
        if (defined(value)) {
          if (!unit && !notPxProps.includes(attr as any)) {
            unit = 'px';
          }

          if (unit) {
            value = `${value}${unit}`;
          }
        }

        requestAnimationFrame(() => {
          elRef.current.style[attr] = value;
        });
      }

      if (native) {
        if (defined(value)) {
          if (unit === 'px') {
            unit = null;
          }

          if (unit) {
            value = `${value}${unit}`;
          }
        }

        requestAnimationFrame(() => {
          elRef.current.setNativeProps({ [attr]: value });
        });
      }

      styleRef.current[attr] = value;
    },
    [native, web],
  );

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

    Object.keys(styleRef.current).forEach((attr) => {
      setStyle(attr, baseStyle?.[attr] ?? undefined);
    });
  }, [baseStyle, setStyle, stop]);

  const start = useCallback(
    (options: RbkTransition) => {
      stop();

      const runId = uuid();
      runIdRef.current = runId;

      let { to, from = styleRef.current, boomerang = false, delay = 0, duration = 1000, iterations = 1 } = options;

      from = jss({ theme }, from);
      to = jss({ theme }, to);

      (async () => {
        if (delay > 0) {
          await sleep(delay);
        }

        const meta = Object.fromEntries(
          Object.keys(to).map((attr) => {
            const [fromValue, fromUnit] = resolveValue(from?.[attr] || 0);
            const [toValue, toUnit] = resolveValue(to[attr]);

            const diffValue = toValue - fromValue;
            const incValuePerMs = diffValue / duration;

            return [
              attr,
              {
                inc: incValuePerMs,
                from: fromValue,
                to: toValue,
                unit: toUnit || fromUnit,
              },
            ];
          }),
        );

        const animate = () => {
          if (typeof iterations === 'number' && iterations > 0) {
            iterations--;
          }

          // Reset styles
          Object.keys(to).forEach((attr) => {
            setStyle(attr, meta[attr].from);
          });

          requestAnimationFrame(() => {
            let wait = 0;

            for (let pos = 1; pos <= duration; pos++) {
              timeoutRef.current.push(
                setTimeout(() => {
                  Object.keys(to).forEach((attr) => {
                    const [currValue] = resolveValue(styleRef.current[attr]);
                    const newValue = currValue + meta[attr].inc;
                    setStyle(attr, newValue, meta[attr].unit);
                  });
                }, wait++),
              );
            }

            timeoutRef.current.push(
              setTimeout(() => {
                // Set exact target value on last iteration
                Object.keys(to).forEach((attr) => {
                  setStyle(attr, meta[attr].to);
                });
              }, wait++),
            );

            // Repeat actions (reversed) when used boomerang
            if (boomerang) {
              for (let pos = 1; pos <= duration; pos++) {
                timeoutRef.current.push(
                  setTimeout(() => {
                    Object.keys(to).forEach((attr) => {
                      const [currValue] = resolveValue(styleRef.current[attr]);
                      const newValue = currValue - meta[attr].inc;
                      setStyle(attr, newValue, meta[attr].unit);
                    });
                  }, wait++),
                );
              }

              timeoutRef.current.push(
                setTimeout(() => {
                  // Set exact target value on last iteration
                  Object.keys(to).forEach((attr) => {
                    setStyle(attr, meta[attr].from);
                  });
                }, wait++),
              );
            }

            if (iterations && runId === runIdRef.current) {
              timeoutRef.current.push(setTimeout(animate, wait++));
            }
          });
        };

        if (iterations) {
          animate();
        }
      })();
    },
    [resolveValue, setStyle, stop, theme],
  );

  return {
    start,
    stop,
    reset,
    props: { ref: elRef, style },
  };
}
