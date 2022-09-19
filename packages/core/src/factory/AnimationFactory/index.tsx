import React, { useEffect, useRef } from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import factory from '../../props/factory';
import jss from '../../styles/jss';
import { AnimationProps, FactoryProps } from '../../types';
import useHtmlId from '../../useHtmlId';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function AnimationFactory({ stylist, children, component, map, ...props }: FactoryProps & AnimationProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Animation;
  const { web, native, Animated, Easing } = map;

  // Extends from default props
  let { from, infinite, speed, to, ...rest } = factory(props, options.defaultProps);

  const name = useHtmlId();

  const { current: animationValue } = useRef(native ? new Animated.Value(0) : null);

  useEffect(() => {
    if (!native) return;

    const animate = () => {
      animationValue.setValue(0);

      Animated.timing(animationValue, {
        toValue: 1,
        duration: speed,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => infinite && animate());
    };

    animate();
  }, []);

  if (web) {
    const fromCSS = Object.entries(jss({ theme }, from))
      .map(([attr, val]) => `${attr}: ${val};`)
      .join('');

    const toCSS = Object.entries(jss({ theme }, to))
      .map(([attr, val]) => `${attr}: ${val};`)
      .join('');

    createStyle({
      global: true,
      style: `
        @keyframes ${name} {
          from { ${fromCSS} }
          to { ${toCSS} }
        }
      `,
    });
  }

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleState = useStylist({
    style: web && {
      animation: `${name} ${speed}ms linear ${infinite ? 'infinite' : ''}`,
    },
  });

  const style = {};

  if (native) {
    Object.entries(from).forEach(([attr, val]) => {
      style[attr] = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [val, to[attr]],
      });
    });
  }

  return (
    <BoxFactory map={map} ref={ref} stylist={[styleRoot, styleState, stylist]} row {...rest}>
      <Animated.View style={style}>
        <BoxFactory map={map} component={component}>
          {children}
        </BoxFactory>
      </Animated.View>
    </BoxFactory>
  );
}

export default React.forwardRef(AnimationFactory);
