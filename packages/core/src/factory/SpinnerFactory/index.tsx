import React, { useEffect, useRef } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, SpinnerProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function SpinnerFactory({ stylist, children, component, map, ...props }: FactoryProps & SpinnerProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Spinner;
  const { web, native, Animated, Easing } = map;

  // Extends from default props
  let { speed, ...rest } = factory(props, options.defaultProps);

  const { current: rotateAnim } = useRef(native ? new Animated.Value(0) : null);

  useEffect(() => {
    if (!native) return;

    const animate = () => {
      rotateAnim.setValue(0);

      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: speed,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => animate());
    };

    animate();
  }, []);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleSpeed = useStylist({
    avoid: speed === options.defaultProps.speed,
    style: web && { animationDuration: `${speed}ms` },
  });

  const rotate =
    native &&
    rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

  return (
    <BoxFactory map={map} ref={ref} stylist={[styleRoot, styleSpeed, stylist]} row {...rest}>
      <Animated.View style={native ? { transform: [{ rotate }] } : {}}>
        <BoxFactory map={map} component={component}>
          {children}
        </BoxFactory>
      </Animated.View>
    </BoxFactory>
  );
}

export default React.forwardRef(SpinnerFactory);
