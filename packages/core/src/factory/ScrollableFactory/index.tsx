import React from 'react';

import { useTheme } from '../../ReactBulk';
import extract from '../../props/extract';
import factory from '../../props/factory';
import merge from '../../props/merge';
import { flexContainerProps } from '../../styles/constants';
import jss from '../../styles/jss';
import { FactoryProps, ScrollableProps } from '../../types';
import useStylist from '../../useStylist';
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
    contentStyle,
    style,
    ...rest
  } = factory(props, options.defaultProps);

  const isHorizontal = direction === 'horizontal';

  const nativeProps: any = {};
  const rootStyles = clone(options.defaultStyles.root);
  const flexContainerStyles = extract(flexContainerProps, rootStyles, style);

  contentStyle = merge(
    theme.components.Box.defaultStyles.root,
    flexContainerStyles,
    {
      p: contentInset ?? 0,
      flexGrow: 1,
      minWidth: '100%',
    },
    contentStyle,
  );

  if (native) {
    nativeProps.horizontal = isHorizontal;
    nativeProps.contentContainerStyle = jss({ theme }, contentStyle);
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
      innerRef={innerRef}
      component={ScrollView}
      style={style}
      stylist={[styleRoot, styleState, stylist]}
      {...rest}
      noRootStyles
      {...nativeProps}
    >
      {web ? (
        <BoxFactory map={map} style={contentStyle}>
          {children}
        </BoxFactory>
      ) : (
        children
      )}
    </BoxFactory>
  );
}

export default React.memo(ScrollableFactory);
