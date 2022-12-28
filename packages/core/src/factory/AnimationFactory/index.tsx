import React, { useEffect, useRef } from 'react';

import createStyle from '../../createStyle';
import useHtmlId from '../../hooks/useHtmlId';
import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { notPxProps } from '../../styles/constants';
import jss from '../../styles/jss';
import { AnimationProps, FactoryProps, RbkStyles } from '../../types';
import BoxFactory from '../BoxFactory';

function AnimationFactory({ stylist, children, component, map, innerRef, ...props }: FactoryProps & AnimationProps) {
  const theme = useTheme();
  const options = theme.components.Animation;
  const { web, native, Animated, Easing } = map;

  // Extends from default props
  let {
    delay,
    direction,
    from,
    in: run,
    loop,
    speed,
    to,
    timing,
    // Styles
    variants,
    ...rest
  } = factory2(props, options);

  from = jss({ theme }, from);
  to = jss({ theme }, to);

  const name = useHtmlId();
  const iterations = loop === true ? -1 : Number(loop ?? 1);

  const defaultValue = Number(direction.includes('reverse'));
  const { current: animationValue } = useRef(native ? new Animated.Value(defaultValue) : null);

  useEffect(() => {
    if (!native) return;

    animationValue.setValue(defaultValue);

    const easing = timing
      .split('-')
      .map((str, index) => (!index ? str : str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()))
      .join('');

    const animation = Animated.loop(
      Animated.timing(animationValue, {
        delay,
        toValue: Number(!defaultValue),
        duration: speed,
        easing: Easing[easing],
        useNativeDriver: false,
      }),
      { iterations },
    );

    if (run) {
      animation.start();
    }

    return () => {
      animation.stop();
    };
  }, [run, timing, iterations, defaultValue]);

  if (web) {
    const fromCSS = Object.entries(from)
      .map(([attr, val]) => `${attr}: ${val}${notPxProps.includes(attr) ? '' : 'px'};`)
      .join('');

    const toCSS = Object.entries(to)
      .map(([attr, val]) => `${attr}: ${val}${notPxProps.includes(attr) ? '' : 'px'};`)
      .join('');

    createStyle({
      global: true,
      theme,
      style: `
        @keyframes ${name} {
          from { ${fromCSS} }
          to { ${toCSS} }
        }
      `,
    });
  }

  const style: RbkStyles = { position: 'relative' };

  if (web) {
    style.animation = `${name} ${speed}ms ${timing} ${delay ? `${delay}ms` : ''} ${iterations === -1 ? 'infinite' : iterations} ${
      run ? 'running' : 'paused'
    } ${direction}`;
  }

  if (native) {
    Object.entries(from).forEach(([attr, val], index) => {
      if (attr === 'transform') {
        style[attr] = (val as any[]).map((obj) => {
          for (let objAttr in obj) {
            obj[objAttr] = animationValue.interpolate({
              inputRange: [0, 1],
              outputRange: [obj[objAttr], to[attr][index][objAttr]],
            });
          }

          return obj;
        });

        return;
      }

      style[attr] = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [val, to[attr]],
      });
    });
  }

  const child = (
    <BoxFactory map={map} component={component}>
      {children}
    </BoxFactory>
  );

  return (
    <BoxFactory map={map} innerRef={innerRef} stylist={[variants.root, stylist]} row {...rest}>
      {native ? (
        <Animated.View style={style}>{child}</Animated.View>
      ) : (
        <BoxFactory map={map} component={Animated.View} style={style} noRootStyles>
          {child}
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

const Memoized = React.memo(AnimationFactory);
Memoized.displayName = 'AnimationFactory';

export default Memoized;
