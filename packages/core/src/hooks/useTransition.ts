import { MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';

import extract from '../props/extract';
import { notPxProps, transformProps } from '../styles/constants';
import jss from '../styles/jss';
import transform from '../styles/transform';
import { AnyObject, RbkTransition, TimeoutType } from '../types';
import clone from '../utils/clone';
import defined from '../utils/defined';
import global from '../utils/global';
import pick from '../utils/pick';
import sleep from '../utils/sleep';
import uuid from '../utils/uuid';
import useHtmlId from './useHtmlId';

function jssWithTransform(style) {
  const resolved = jss(style);
  const transformStyles = extract([...transformProps], resolved, transform(extract('transform', resolved)?.transform));
  return { ...resolved, ...transformStyles };
}

export default function useTransition(style?: RbkTransition['from'], ref?: MutableRefObject<any>) {
  const { web, native } = global.mapping;

  const baseStyle = useMemo(() => jss(style), [style]);

  const defaultRef = useRef();
  const elRef = ref ?? defaultRef;

  const animationName = useHtmlId();
  const styleRef = useRef<AnyObject>(clone(baseStyle));
  const transformRef = useRef<AnyObject>({});
  const runIdRef = useRef<string>();
  const timeoutRef = useRef<TimeoutType>();

  const setStyle = useCallback(
    (attr: string, value: any, unit = null) => {
      let prop = attr;

      if (web) {
        if (defined(value)) {
          if (!unit && !notPxProps.includes(attr as any)) {
            unit = 'px';
          }

          if (unit) {
            value = `${value}${unit}`;
          }
        }
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
      }

      // Parse "transform" props
      if (transformProps.includes(attr as any)) {
        prop = 'transform';

        if (web) {
          transformRef.current[attr] = `${attr}(${value})`;
          value = Object.values(transformRef.current).join(' ');
        }

        if (native) {
          transformRef.current[attr] = { [attr]: value };
          value = Object.values(transformRef.current);
        }
      }

      requestAnimationFrame(() => {
        if (!elRef.current) return;

        if (web) {
          elRef.current.style[prop] = value;
        }

        if (native) {
          elRef.current.setNativeProps({ [prop]: value });
        }
      });

      styleRef.current[attr] = value;
    },
    [elRef, native, web],
  );

  const resolveValue = useCallback((value) => {
    const match = `${value}`.match(/^(-?[\d.]+)([a-z%]*)/i);
    return [parseFloat(match?.[1] ?? '0'), match?.[2]?.trim()?.toLowerCase() || null] as const;
  }, []);

  const stop = useCallback(() => {
    if (web && elRef.current) {
      elRef.current.style.animationPlayState = 'paused';
    }

    runIdRef.current = undefined;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = null;
  }, [elRef, runIdRef, timeoutRef, web]);

  const reset = useCallback(() => {
    stop();

    if (web && elRef.current) {
      elRef.current.style.animation = '';
    }

    Object.keys(styleRef.current).forEach((attr) => {
      setStyle(attr, baseStyle?.[attr] ?? undefined);
    });
  }, [baseStyle, elRef, setStyle, stop, web]);

  const start = useCallback(
    (options: RbkTransition) => {
      stop();

      let {
        to,
        from = styleRef.current,
        boomerang = false,
        delay = 0,
        duration = 350,
        iterations = 1,
        timing = 'linear',
        throttle = 0,
      } = options;

      from = jssWithTransform(from);
      to = jssWithTransform(to);

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

      // if (web) {
      //   const transformFrom = extract([...transformProps], from);
      //   const transformTo = extract([...transformProps], to);
      //
      //   const transformFromStr = Object.entries(transformFrom).map(([attr, value]) => ({ [attr]: value }));
      //   const transformToStr = Object.entries(transformTo).map(([attr, value]) => ({ [attr]: value }));
      //
      //   cometta.createStyleSheet(
      //     `
      //        @keyframes ${animationName} {
      //          from { ${css(from, { transform: transformFromStr })} }
      //          to { ${css(to, { transform: transformToStr })} }
      //        }
      //     `,
      //     { uniqueId: animationName },
      //   );
      //
      //   const direction = boomerang ? 'alternate' : 'normal';
      //   iterations = iterations === -1 ? 'infinite' : iterations;
      //   iterations = typeof iterations === 'number' && boomerang ? iterations * 2 : iterations;
      //
      //   // Reset styles
      //   Object.keys(to).forEach((attr) => {
      //     setStyle(attr, meta[attr].from, meta[attr].unit);
      //   });
      //
      //   elRef.current.addEventListener(
      //     'animationend',
      //     () => {
      //       // Set exact target value on last iteration
      //       Object.keys(to).forEach((attr) => {
      //         if (boomerang) {
      //           setStyle(attr, meta[attr].from, meta[attr].unit);
      //         } else {
      //           setStyle(attr, meta[attr].to, meta[attr].unit);
      //         }
      //       });
      //
      //       if (elRef.current) {
      //         elRef.current.style.animation = '';
      //       }
      //     },
      //     { once: true },
      //   );
      //
      //   if (elRef.current) {
      //     elRef.current.style.animation = `${animationName} ${duration}ms ${timing} ${
      //       delay || 0
      //     }ms ${iterations} ${direction}`;
      //   }
      // }

      // if (native) {
      const runId = uuid();
      runIdRef.current = runId;

      const timingFn = pick(timing, 'ease', {
        linear: easeLinear,
        ease: easeInSine,
        'ease-in': easeInQuad,
        'ease-out': easeOutQuad,
        'ease-in-out': easeInOutQuad,
      });

      const animate = async () => {
        if (!iterations || runId !== runIdRef.current) {
          return;
        }

        if (typeof iterations === 'number' && iterations > 0) {
          iterations--;
        }

        // Reset styles
        Object.keys(to).forEach((attr) => {
          setStyle(attr, meta[attr].from, meta[attr].unit);
        });

        // Animate forward
        await new Promise((resolve) => {
          const startAt = Date.now();
          const endAt = startAt + duration;

          const apply = async () => {
            if (endAt < Date.now() || runId !== runIdRef.current) {
              return resolve(true);
            }

            const pos = duration - (endAt - Date.now());

            Object.keys(to).forEach((attr) => {
              const [startValue] = resolveValue(from[attr]);
              const [endValue] = resolveValue(to[attr]);
              const newValue = timingFn(pos, startValue, endValue - startValue, duration);
              setStyle(attr, newValue, meta[attr].unit);
            });

            if (throttle) {
              await sleep(throttle);
            }

            timeoutRef.current = setTimeout(apply, throttle);
          };

          timeoutRef.current = setTimeout(apply, 0);
        });

        // Set exact target value on last iteration
        if (runId === runIdRef.current) {
          Object.keys(to).forEach((attr) => {
            setStyle(attr, meta[attr].to, meta[attr].unit);
          });
        }

        // Animate backward
        if (boomerang) {
          await new Promise((resolve) => {
            const startAt = Date.now();
            const endAt = startAt + duration;

            const apply = async () => {
              if (endAt < Date.now() || runId !== runIdRef.current) {
                return resolve(true);
              }

              const pos = duration - (endAt - Date.now());

              Object.keys(to).forEach((attr) => {
                const [startValue] = resolveValue(to[attr]);
                const [endValue] = resolveValue(from[attr]);
                const newValue = timingFn(pos, startValue, endValue - startValue, duration);
                setStyle(attr, newValue, meta[attr].unit);
              });

              timeoutRef.current = setTimeout(apply, throttle);
            };

            timeoutRef.current = setTimeout(apply, 0);
          });

          // Set exact target value on last iteration
          if (runId === runIdRef.current) {
            Object.keys(to).forEach((attr) => {
              setStyle(attr, meta[attr].from, meta[attr].unit);
            });
          }
        }

        // Loop?
        await animate();
      };

      timeoutRef.current = setTimeout(animate, Math.max(delay || 0, 0));
      // }
    },
    [animationName, elRef, native, resolveValue, setStyle, stop, web],
  );

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return useMemo(
    () => ({
      start,
      stop,
      reset,
      props: { ref: elRef, style },
    }),
    [elRef, reset, start, stop, style],
  );
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
