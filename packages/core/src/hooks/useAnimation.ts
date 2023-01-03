import { useMemo, useRef, useState } from 'react';

export type AnimationOptions = {
  delay?: number;
  speed?: number;
  timing?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  iterations?: number | 'infinite';
};

export default function useAnimation(initial = {}) {
  const { web, native, Animated, Easing } = global._RBK.mapping;

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

  // function stop() {
  //   if (web) {
  //     setStyle(initialStyle);
  //   }
  // }

  function start(styles = {}, options: AnimationOptions = {}) {
    let { delay = 0, speed = 350, timing = 'ease', iterations = 1 } = options;

    if (iterations === 'infinite') {
      iterations = -1;
    }

    if (web) {
      if (animRef.current) {
        clearTimeout(animRef.current);
      }

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

        animRef.current = setTimeout(() => {
          for (const attr of Object.keys(initialStyle)) {
            setStyle((current) => ({ ...current, [attr]: styles[attr] }));
          }

          // @ts-ignore
          if (--iterations > 0) {
            animRef.current = setTimeout(() => {
              setStyle({ ...initialStyle, transitionProperty: 'none' });
              animRef.current = setTimeout(animate, 0);
            }, Math.max(0, speed - 3));
          }
        }, 0);
      };

      animate();
    }

    if (native) {
      const easing = (timing || 'ease')
        .split('-')
        .map((str, index) => (!index ? str : str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()))
        .join('');

      setTimeout(() => {
        Animated.loop(
          Animated.parallel(
            Object.entries(style).map(([attr, animValue]) =>
              Animated.timing(animValue, {
                delay,
                duration: speed,
                easing: Easing[easing],
                toValue: styles[attr],
                useNativeDriver: false,
              }),
            ),
          ),

          { iterations },
        ).start();
      }, 0);
    }
  }

  return {
    start,
    style,
  };
}
