import React from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import merge from '../../props/merge';
import { flexContainerProps } from '../../styles/constants';
import jss from '../../styles/jss';
import { FactoryProps, ScrollableProps } from '../../types';
import clone from '../../utils/clone';
import BoxFactory from '../BoxFactory';

function ScrollableFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & ScrollableProps) {
  const theme = useTheme();
  const options = theme.components.Scrollable;
  const { web, native, ScrollView } = map;

  // Extends from default props
  let {
    contentInset,
    direction,
    platform,
    // Styles
    variants,
    contentStyle,
    style,
    ...rest
  } = factory2(props, options);

  const nativeProps: any = {};
  const rootStyles = clone(options.defaultStyles.root);
  const flexContainerStyles = extract(flexContainerProps, rootStyles, style);

  contentStyle = merge(theme.components.Box.defaultStyles.root, flexContainerStyles, { p: contentInset ?? 0 }, contentStyle);

  if (native) {
    nativeProps.horizontal = direction === 'horizontal';
    nativeProps.contentContainerStyle = jss({ theme }, contentStyle);
  }

  return (
    <BoxFactory
      map={map}
      innerRef={innerRef}
      component={ScrollView}
      style={style}
      stylist={[variants.root, stylist]}
      {...rest}
      noRootStyles
      {...nativeProps}
    >
      {web ? (
        <BoxFactory map={map} style={contentStyle} stylist={[variants.content]}>
          {children}
        </BoxFactory>
      ) : (
        children
      )}
    </BoxFactory>
  );
}

export default React.memo(ScrollableFactory);
