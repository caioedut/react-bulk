import React, { forwardRef, useEffect, useRef } from 'react';

import createStyle from '../../createStyle';
import useHtmlId from '../../hooks/useHtmlId';
import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import get from '../../props/get';
import css from '../../styles/css';
import jss from '../../styles/jss';
import { AnimationProps, RbkStyles } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

const AnimationFactory = React.memo<AnimationProps>(
  forwardRef(({ stylist, children, component, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Animation;
    const { web, native, Animated, Easing } = global.mapping;

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
      // Animations
      fade,
      zoom,
      spin,
      // Styles
      variants,
      ...rest
    } = factory2(props, options);

    direction = direction ?? 'normal';

    let transformFrom = get('transform', from) ?? [];
    let transformTo = get('transform', to) ?? [];

    const opacityFrom = fade < 0 ? 1 : 0;
    const scaleFrom = zoom < 0 ? 1 : 0;
    const rotateFrom = spin < 0 ? '360deg' : '0deg';

    const opacityTo = fade < 0 ? 0 : 1;
    const scaleTo = zoom < 0 ? 0 : 1;
    const rotateTo = spin < 0 ? '0deg' : '360deg';

    if (Array.isArray(transformFrom)) {
      zoom && transformFrom.push({ scale: scaleFrom });
      spin && transformFrom.push({ rotate: rotateFrom });
    }

    if (typeof transformFrom === 'string') {
      transformFrom += zoom ? ` scale(${scaleFrom})` : '';
      transformFrom += spin ? ` rotate(${rotateFrom})` : '';
    }

    if (Array.isArray(transformTo)) {
      zoom && transformTo.push({ scale: scaleTo });
      spin && transformTo.push({ rotate: rotateTo });
    }

    if (typeof transformTo === 'string') {
      transformTo += zoom ? ` scale(${scaleTo})` : '';
      transformTo += spin ? ` rotate(${rotateTo})` : '';
    }

    from = jss({ theme }, fade && { opacity: opacityFrom }, { transform: transformFrom }, from);
    to = jss({ theme }, fade && { opacity: opacityTo }, { transform: transformTo }, to);

    const name = useHtmlId();
    const iterations = loop === true ? -1 : Number(loop ?? 1);

    const isBoomerang = direction.includes('alternate');
    const initRangeValue = !direction.includes('reverse') ? 0 : isBoomerang ? 2 : 1;

    const { current: animationValue } = useRef(native ? new Animated.Value(initRangeValue) : null);

    useEffect(() => {
      if (!native) return;

      animationValue.setValue(initRangeValue);

      const easing = timing
        .split('-')
        .map((str, index) => (!index ? str : str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()))
        .join('');

      const animation = Animated.loop(
        Animated.timing(animationValue, {
          useNativeDriver: false,
          delay,
          duration: speed,
          easing: Easing[easing],
          toValue: initRangeValue ? 0 : isBoomerang ? 2 : 1,
        }),
        { iterations },
      );

      if (run) {
        animation.start();
      }

      return () => {
        animation.stop();
      };
    }, [run, timing, iterations, initRangeValue]);

    if (web) {
      const fromJSS = jss({ theme }, from);
      const fromCSS = css(fromJSS, 'from');

      const toJSS = jss({ theme }, to);
      const toCSS = css(toJSS, 'to');

      createStyle({
        global: true,
        theme,
        style: `
        @keyframes ${name} {
          ${fromCSS}
          ${toCSS}
        }
      `,
      });
    }

    const style: RbkStyles = { position: 'relative' };

    if (web) {
      style.animation = `${name} ${speed}ms ${timing} ${delay ? `${delay}ms` : ''} ${
        iterations === -1 ? 'infinite' : iterations
      } ${run ? 'running' : 'paused'} ${direction}`;
    }

    if (native) {
      Object.entries(from).forEach(([attr, val]) => {
        if (attr === 'transform' && Array.isArray(val)) {
          style.transform = (val as any[]).map((obj) => {
            Object.entries(obj).map(([transfAttr, transfValue]) => {
              const toValue = get(transfAttr, ...to.transform);

              obj[transfAttr] = animationValue.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [transfValue, toValue, transfValue],
              });
            });

            return obj;
          });

          return;
        }

        style[attr] = animationValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [val, to[attr], val],
        });
      });
    }

    const child = <BoxFactory component={component}>{children}</BoxFactory>;

    return (
      <BoxFactory ref={ref} stylist={[variants.root, stylist]} {...rest}>
        {native ? (
          <Animated.View style={style}>{child}</Animated.View>
        ) : (
          <BoxFactory component={Animated.View} style={style} noRootStyles>
            {child}
          </BoxFactory>
        )}
      </BoxFactory>
    );
  }),
);

AnimationFactory.displayName = 'AnimationFactory';

export default AnimationFactory;
