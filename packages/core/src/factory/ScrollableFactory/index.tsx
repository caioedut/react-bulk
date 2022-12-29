import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import extract from '../../props/extract';
import factory2 from '../../props/factory2';
import { flexContainerProps } from '../../styles/constants';
import jss from '../../styles/jss';
import { ScrollableProps } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

const ScrollableFactory = React.memo<ScrollableProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Scrollable;
    const { native, ScrollView } = global.mapping;

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
      <BoxFactory ref={ref} component={ScrollView} style={style} stylist={[variants.root, stylist]} {...rest} noRootStyles>
        {native ? (
          children
        ) : (
          <BoxFactory style={contentStyle} stylist={[variants.content]} noRootStyles>
            {children}
          </BoxFactory>
        )}
      </BoxFactory>
    );
  }),
);

ScrollableFactory.displayName = 'ScrollableFactory';

export default ScrollableFactory;
