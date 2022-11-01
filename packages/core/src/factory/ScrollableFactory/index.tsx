import React from 'react';

import useTheme from '../../hooks/useTheme';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import { flexContainerProps } from '../../styles/constants';
import jss from '../../styles/jss';
import { FactoryProps, ScrollableProps } from '../../types';
import BoxFactory from '../BoxFactory';

function ScrollableFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & ScrollableProps) {
  const theme = useTheme();
  const options = theme.components.Scrollable;
  const { native, ScrollView } = map;

  // Extends from default props
  let {
    contentInset,
    direction,
    hideScrollBar,
    pagingEnabled,
    platform,
    // Styles
    variants,
    contentStyle,
    style,
    ...rest
  } = factory2(props, options);

  const isHorizontal = direction === 'horizontal';

  contentStyle = [
    extract(flexContainerProps, style),

    { p: contentInset ?? 0 },

    pagingEnabled && {
      web: {
        '&> *': {
          scrollSnapAlign: 'start',
        },
      },
    },

    contentStyle,
  ];

  style = [
    pagingEnabled && {
      web: { scrollSnapType: `${isHorizontal ? 'x' : 'y'} mandatory` },
    },

    style,
  ];

  if (native) {
    Object.assign(rest, {
      horizontal: isHorizontal,
      contentContainerStyle: jss({ theme }, variants.content, contentStyle),
      pagingEnabled,
    });

    if (hideScrollBar) {
      Object.assign(rest, {
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,
      });
    }
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
    >
      {native ? (
        children
      ) : (
        <BoxFactory map={map} style={contentStyle} stylist={[variants.content]} noRootStyles>
          {children}
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

export default React.memo(ScrollableFactory);
