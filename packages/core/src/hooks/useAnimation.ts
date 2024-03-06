import { useMemo, useRef, useState } from 'react';

import { RbkAnimation } from '../types';
import global from '../utils/global';
import sleep from '../utils/sleep';
import stdout from '../utils/stdout';

export default function useAnimation(initial = {}) {
  const { web, native, Animated, Easing } = global.mapping;

  const animRef: any = useRef();

  const initialStyle = useMemo(() => {
    const props = Object.keys(initial);
    const values = {};

    for (const prop of props) {
      const initialValue = initial[prop] ?? 0;
      values[prop] = native ? new Animated.Value(initialValue) : initialValue;
    }

    return values;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentStyle, setCurrentStyle] = useState(initialStyle);

  async function start(styles = {}, options: RbkAnimation = {}) {
    return new Promise(async (resolve) => {
      let { boomerang = false, delay = 0, timing = 'ease', iterations = 1 } = options;

      const duration = options.duration ?? options.speed ?? 350;

      await stop();

      if (iterations === 'infinite') {
        iterations = -1;
      }

      if (web) {
        if (iterations === -1) {
          iterations = Number.POSITIVE_INFINITY;
        }

        const animate = () => {
          setCurrentStyle((current) => ({
            ...current,
            transitionDelay: `${delay}ms`,
            transitionDuration: `${duration}ms`,
            transitionProperty: 'all',
            transitionTimingFunction: timing,
          }));

          let nextDelay = Math.max(0, duration - 3);

          animRef.current = setTimeout(() => {
            const toStyle = {};

            for (const attr of Object.keys(initialStyle)) {
              toStyle[attr] = styles[attr];
            }

            setCurrentStyle((current) => ({ ...current, ...toStyle }));

            if (boomerang) {
              animRef.current = setTimeout(() => {
                setCurrentStyle((current) => ({ ...current, ...initialStyle }));
              }, nextDelay);

              nextDelay *= 2;
            }

            // @ts-expect-error
            iterations -= 1;

            if (iterations === 0) {
              animRef.current = setTimeout(() => {
                resolve(1);
              }, nextDelay);
            }

            // @ts-ignore
            if (iterations > 0) {
              animRef.current = setTimeout(() => {
                setCurrentStyle({ ...initialStyle, transitionProperty: 'none' });
                animRef.current = setTimeout(animate, 0);
              }, nextDelay);
            }
          }, 0);
        };

        animate();
      }

      if (native) {
        if (boomerang) {
          stdout.warn('"useAnimation" "boomerang" was not supported on native.');
        }

        const easing = (timing || 'ease')
          .split('-')
          .map((str, index) => (!index ? str : str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()))
          .join('');

        await sleep(0);

        const animations = Object.entries(styles).map(([attr, value]) => {
          const animValue = currentStyle[attr];
          animValue.setValue(animValue.__getValue());

          return Animated.timing(animValue, {
            useNativeDriver: false,
            delay,
            duration,
            easing: Easing[easing],
            toValue: value,
          });
        });

        animRef.current = Animated.loop(Animated.parallel(animations), { iterations });
        animRef.current.start(() => resolve(1));
      }
    });
  }

  async function stop() {
    if (!animRef.current) return;

    if (web) {
      clearTimeout(animRef.current);
    }

    if (native) {
      animRef.current.stop();
    }
  }

  async function reset() {
    await stop();
    setCurrentStyle(initialStyle);
  }

  return {
    start,
    stop,
    reset,
    style: currentStyle,
    Component: Animated.View,
  };
}
