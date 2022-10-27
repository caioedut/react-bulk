import React, { useEffect, useRef } from 'react';

import createStyle from '../../createStyle';
import useHtmlId from '../../hooks/useHtmlId';
import useStylist from '../../hooks/useStylist';
import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import jss from '../../styles/jss';
import { AnimationProps, FactoryProps, JssStyles } from '../../types';
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

    const animation = Animated.loop(
      Animated.timing(animationValue, {
        delay,
        toValue: Number(!defaultValue),
        duration: speed,
        easing: Easing.linear,
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
  }, [run, iterations, defaultValue]);

  if (web) {
    const fromCSS = Object.entries(from)
      .map(([attr, val]) => `${attr}: ${val};`)
      .join('');

    const toCSS = Object.entries(to)
      .map(([attr, val]) => `${attr}: ${val};`)
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

  const styleState = useStylist({
    style: web && {
      animation: `${name} ${speed}ms linear ${delay ? `${delay}ms` : ''} ${iterations === -1 ? 'infinite' : iterations} ${
        run ? 'running' : 'paused'
      } ${direction}`,
    },
  });

  const style: JssStyles = { position: 'relative' };

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

  return (
    <BoxFactory map={map} innerRef={innerRef} stylist={[variants.root, styleState, stylist]} row {...rest}>
      <Animated.View style={style}>
        <BoxFactory map={map} component={component}>
          {children}
        </BoxFactory>
      </Animated.View>
    </BoxFactory>
  );
}

export default React.memo(AnimationFactory);
