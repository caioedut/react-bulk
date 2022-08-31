import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { FactoryProps, ScrollableProps } from '../../types';
import BoxFactory from '../BoxFactory';

function ScrollableFactory({ className, children, map, ...props }: FactoryProps & ScrollableProps, ref: any) {
  const theme = useTheme();
  const { web, ScrollView, View } = map;

  // Extends from default props
  props = { ...theme.components.Scrollable.defaultProps, ...props };

  let { direction, ...rest } = props;

  const isHorizontal = direction === 'horizontal';

  const styleRoot = createStyle({
    name: 'rbk-scrollable',
    style: {
      flex: 1,
      web: {
        overflow: 'hidden',
        scrollBehavior: 'smooth',
      },
    },
  });

  const styleState = createStyle({
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
