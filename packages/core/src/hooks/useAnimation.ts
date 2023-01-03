import { useMemo, useState } from 'react';

import useTheme from './useTheme';

export default function useAnimation(initial = {}) {
  const theme = useTheme();
  const { web, native, Animated } = global._RBK.mapping;

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

  function start(styles = {}, options = {}) {
    if (web) {
      for (const attr of Object.keys(initialStyle)) {
        setStyle((current) => ({ ...current, [attr]: styles[attr] }));
      }
    }

    if (native) {
      setTimeout(() => {
        Animated.parallel(
          Object.entries(style).map(([attr, animValue]) => {
            return Animated.timing(animValue, {
              duration: 350,
              useNativeDriver: false,
              ...options,
              toValue: styles[attr],
            });
          }),
        ).start();
      }, 1);
    }
  }

  // function loop(iterations = -1, options = {}) {
  //   if (native) {
  //     setTimeout(() => {
  //       Animated.loop(
  //         Animated.parallel(
  //           Object.entries(style).map(([attr, animValue]) =>
  //             Animated.timing(animValue, {
  //               duration: 200,
  //               useNativeDriver: false,
  //               ...options,
  //               toValue: to[attr] ?? 1,
  //             }),
  //           ),
  //         ),
  //
  //         { iterations },
  //       ).start();
  //     }, 1);
  //   }
  // }

  return {
    start,
    style: {
      ...theme.mixins.transitions.medium,
      ...style,
    },
  };
}
