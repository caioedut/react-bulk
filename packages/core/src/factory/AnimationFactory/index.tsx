import React, { forwardRef, useMemo } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import jss from '../../styles/jss';
import { AnimationProps } from '../../types';
import BoxFactory from '../BoxFactory';

const AnimationFactory = React.memo<AnimationProps>(
  forwardRef(({ stylist, children, component, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Animation;

    // Extends from default props
    const {
      delay,
      direction,
      duration,
      from,
      in: run,
      loop,
      speed,
      to,
      throttle,
      timing,
      // Animations
      fade,
      zoom,
      spin,
      // Styles
      variants,
      ...rest
    } = factory2<AnimationProps>(props, options);

    const iterations = useMemo(() => (loop === true ? -1 : Number(loop ?? 1)), [loop]);
    const boomerang = useMemo(() => direction?.includes('alternate'), [direction]);
    const reverse = useMemo(() => direction?.includes('reverse'), [direction]);

    const styleFrom = useMemo(() => {
      return jss(
        fade && { opacity: Number(fade) < 0 ? 1 : 0 },
        spin && { rotate: Number(spin) < 0 ? '360deg' : '0deg' },
        zoom && { scale: Number(zoom) < 0 ? 1 : 0 },
        from,
      );
    }, [from, fade, spin, zoom]);

    const styleTo = useMemo(() => {
      return jss(
        fade && { opacity: Number(fade) < 0 ? 0 : 1 },
        spin && { rotate: Number(spin) < 0 ? '0deg' : '360deg' },
        zoom && { scale: Number(zoom) < 0 ? 0 : 1 },
        to,
      );
    }, [to, fade, spin, zoom]);

    return (
      <BoxFactory
        ref={ref}
        stylist={[variants.root, stylist]}
        {...rest}
        animation={{
          boomerang,
          delay,
          iterations,
          throttle,
          timing,
          duration: duration ?? speed,
          from: reverse ? styleTo : styleFrom,
          to: reverse ? styleFrom : styleTo,
        }}
      >
        {children}
      </BoxFactory>
    );
  }),
);

AnimationFactory.displayName = 'AnimationFactory';

export default AnimationFactory;
