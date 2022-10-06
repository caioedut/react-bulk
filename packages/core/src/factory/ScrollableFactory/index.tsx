import React from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import factory from '../../props/factory';
import merge from '../../props/merge';
import { flexContainerProps } from '../../styles/constants';
import { FactoryProps, ScrollableProps } from '../../types';
import useStylist from '../../useStylist';
import clone from '../../utils/clone';
import BoxFactory from '../BoxFactory';

function ScrollableFactory({ stylist, children, map, ...props }: FactoryProps & ScrollableProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Scrollable;
  const { web, native, ScrollView } = map;

  // Extends from default props
  let { direction, platform, style, ...rest } = factory(props, options.defaultProps);

  const isHorizontal = direction === 'horizontal';

  const nativeProps: any = {};
  const rootStyles = clone(options.defaultStyles.root);

  if (native) {
    const flexContainerStyles = extract(flexContainerProps, rootStyles, style);
    nativeProps.contentContainerStyle = merge(flexContainerStyles);
  }

  const styleRoot = useStylist({
    name: options.name,
    style: rootStyles,
  });

  const styleState = useStylist({
    style: web && {
      overflowX: isHorizontal ? 'auto' : 'hidden',
      overflowY: isHorizontal ? 'hidden' : 'auto',
    },
  });

  return (
    <BoxFactory
      map={map}
      ref={ref}
      component={ScrollView}
      style={style}
      stylist={[styleRoot, styleState, stylist]}
      {...rest}
      noRootStyles={native}
      {...nativeProps}
    >
      {children}
    </BoxFactory>
  );
}

export default React.forwardRef(ScrollableFactory);
