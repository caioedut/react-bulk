import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, ScrollableProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function ScrollableFactory({ className, children, map, ...props }: FactoryProps & ScrollableProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Scrollable;
  const { web, ScrollView, View } = map;

  // Extends from default props
  props = { ...theme.components.Scrollable.defaultProps, ...props };
  let { direction, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const isHorizontal = direction === 'horizontal';

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styleState = useStylist({
    style: web && {
      overflowX: isHorizontal ? 'auto' : 'hidden',
      overflowY: isHorizontal ? 'hidden' : 'auto',
    },
  });

  const styles = [styleRoot, styleState, className];

  return (
    <BoxFactory
      map={map}
      ref={ref}
      component={ScrollView}
      {...rest}
      className={styles}
      platform={{
        native: { horizontal: isHorizontal },
      }}
    >
      <View>{children}</View>
    </BoxFactory>
  );
}

export default React.forwardRef(ScrollableFactory);
