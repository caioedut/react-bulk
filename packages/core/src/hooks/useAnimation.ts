import { useMemo, useRef, useState } from 'react';

import { RbkAnimation } from '../types';
import global from '../utils/global';

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
  }, [initial]);

  const [style, setStyle] = useState(initialStyle);

  function start(styles = {}, options: RbkAnimation = {}) {
    let { boomerang = false, delay = 0, speed = 350, timing = 'ease', iterations = 1 } = options;

    stop();

    if (iterations === 'infinite') {
      iterations = -1;
    }

    if (web) {
      if (iterations === -1) {
        iterations = Number.POSITIVE_INFINITY;
      }

      const animate = () => {
        setStyle((current) => ({
          ...current,
          transitionDelay: `${delay}ms`,
          transitionDuration: `${speed}ms`,
          transitionProperty: 'all',
          transitionTimingFunction: timing,
        }));

        let nextDelay = Math.max(0, speed - 3);

        animRef.current = setTimeout(() => {
          const toStyle = {};

          for (const attr of Object.keys(initialStyle)) {
            toStyle[attr] = styles[attr];
          }

          setStyle((current) => ({ ...current, ...toStyle }));

          if (boomerang) {
            animRef.current = setTimeout(() => {
              setStyle((current) => ({ ...current, ...initialStyle }));
            }, nextDelay);

            nextDelay *= 2;
          }

          // @ts-ignore
          if (--iterations > 0) {
            animRef.current = setTimeout(() => {
              setStyle({ ...initialStyle, transitionProperty: 'none' });
              animRef.current = setTimeout(animate, 0);
            }, nextDelay);
          }
        }, 0);
      };

      animate();
    }

    if (native) {
      if (boomerang) {
        console.warn('"useAnimation" "boomerang" was not supported on native.');
      }

      const easing = (timing || 'ease')
        .split('-')
        .map((str, index) => (!index ? str : str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()))
        .join('');

      setTimeout(() => {
        const animations = Object.entries(style).map(([attr, animValue]) =>
          Animated.timing(animValue, {
            delay,
            duration: speed,
            easing: Easing[easing],
            toValue: styles[attr],
            useNativeDriver: false,
          }),
        );

        animRef.current = Animated.loop(Animated.parallel(animations), { iterations });
        animRef.current.start();
      }, 0);
    }
  }

  function stop() {
    if (!animRef.current) return;

    if (web) {
      clearTimeout(animRef.current);
    }

    if (native) {
      animRef.current.stop();
    }
  }

  function reset() {
    stop();
    setStyle(initialStyle);
  }

  return {
    start,
    stop,
    reset,
    style,
    Component: Animated.View,
  };
}
