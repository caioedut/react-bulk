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

      let {
        to,
        from = styleRef.current,
        boomerang = false,
        delay = 0,
        duration = 2000,
        iterations = 1,
        timing = 'linear',
      } = options;

      from = jss({ theme }, from);
      to = jss({ theme }, to);

      const timingFn =
        {
          ease: easeInOutSine,
          'ease-in': easeInQuad,
          'ease-out': easeOutQuad,
          'ease-in-out': easeInOutQuad,
        }[timing] || easeLinear;

      (async () => {
        if (delay > 0) {
          await sleep(delay);
        }

        const meta = Object.fromEntries(
          Object.keys(to).map((attr) => {
            const [fromValue, fromUnit] = resolveValue(from?.[attr] || 0);
            const [toValue, toUnit] = resolveValue(to[attr]);

            return [
              attr,
              {
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
                    const [startValue] = resolveValue(from[attr]);
                    const [endValue] = resolveValue(to[attr]);
                    const newValue = timingFn(pos, startValue, endValue - startValue, duration);
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
                      const [startValue] = resolveValue(to[attr]);
                      const [endValue] = resolveValue(from[attr]);
                      const newValue = timingFn(pos, startValue, endValue - startValue, duration);
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

/**
 * currentIteration = Time - Usually starts at 0 and is slowly increased using a game loop or other update function.
 * startValue = Beginning value - The starting point of the animation. Usually it's a static value, you can start at 0 for example.
 * changeInValue = Change in value - The amount of change needed to go from starting point to end point (endValue - startValue). It's also usually a static value.
 * totalIterations = Duration - Amount of time the animation will take. Usually a static value as well.
 */

function easeLinear(currentIteration, startValue, changeInValue, totalIterations) {
  return (changeInValue * currentIteration) / totalIterations + startValue;
}

function easeInQuad(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
}

function easeOutQuad(currentIteration, startValue, changeInValue, totalIterations) {
  return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue;
}

function easeInOutQuad(currentIteration, startValue, changeInValue, totalIterations) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (changeInValue / 2) * currentIteration * currentIteration + startValue;
  }
  return (-changeInValue / 2) * (--currentIteration * (currentIteration - 2) - 1) + startValue;
}

function easeInCubic(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
}

function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
}

function easeInOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (changeInValue / 2) * Math.pow(currentIteration, 3) + startValue;
  }
  return (changeInValue / 2) * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
}

function easeInQuart(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * Math.pow(currentIteration / totalIterations, 4) + startValue;
}

function easeOutQuart(currentIteration, startValue, changeInValue, totalIterations) {
  return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
}

function easeInOutQuart(currentIteration, startValue, changeInValue, totalIterations) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (changeInValue / 2) * Math.pow(currentIteration, 4) + startValue;
  }
  return (-changeInValue / 2) * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
}

function easeInQuint(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * Math.pow(currentIteration / totalIterations, 5) + startValue;
}

function easeOutQuint(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue;
}

function easeInOutQuint(currentIteration, startValue, changeInValue, totalIterations) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (changeInValue / 2) * Math.pow(currentIteration, 5) + startValue;
  }
  return (changeInValue / 2) * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
}

function easeInSine(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * (1 - Math.cos((currentIteration / totalIterations) * (Math.PI / 2))) + startValue;
}

function easeOutSine(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * Math.sin((currentIteration / totalIterations) * (Math.PI / 2)) + startValue;
}

function easeInOutSine(currentIteration, startValue, changeInValue, totalIterations) {
  return (changeInValue / 2) * (1 - Math.cos((Math.PI * currentIteration) / totalIterations)) + startValue;
}

function easeInExpo(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue;
}

function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * (-Math.pow(2, (-10 * currentIteration) / totalIterations) + 1) + startValue;
}

function easeInOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (changeInValue / 2) * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
  }
  return (changeInValue / 2) * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
}

function easeInCirc(currentIteration, startValue, changeInValue, totalIterations) {
  return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue;
}

function easeOutCirc(currentIteration, startValue, changeInValue, totalIterations) {
  return (
    changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) +
    startValue
  );
}

function easeInOutCirc(currentIteration, startValue, changeInValue, totalIterations) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (changeInValue / 2) * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
  }
  return (changeInValue / 2) * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
}
