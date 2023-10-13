import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import childrenize from '../../props/childrenize';
import factory2 from '../../props/factory2';
import { GridProps, RbkStyle, RequiredSome } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

const GridFactory = React.memo<GridProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Grid;
    const { useDimensions } = global.mapping;

    const dimensions = useDimensions();

    // Extends from default props
    let {
      breakpoints,
      gap,
      size,
      // Styles
      variants,
      style,
      ...rest
    } = factory2<RequiredSome<GridProps, 'size'>>(props, options);

    gap = gap === true ? theme.shape.gap : gap;
    breakpoints = { ...theme.breakpoints, ...Object(breakpoints) };
    const spacing = !gap ? 0 : theme.spacing(gap / 2);

    return (
      <BoxFactory ref={ref} style={[{ margin: -spacing }, style]} stylist={[variants.root, stylist]} {...rest}>
        {childrenize(children).map((child, index) => {
          if (!child && !['string', 'number'].includes(typeof child)) {
            return null;
          }

          const props = { ...Object(child?.props) };
          const itemStyle: RbkStyle[] = [props.style, { padding: spacing }];
          let bkptStyle: RbkStyle = {};

          Object.entries(breakpoints || {})
            .filter(([breakpoint, minWidth]) => breakpoint in props && dimensions.width >= minWidth)
            .sort((a, b) => a[1] - b[1])
            .forEach(([breakpoint]) => {
              const value = props[breakpoint];
              const width = (value / size) * 100;

              const isAuto = value === 'auto';
              const isFlex = value === 'flex' || value === true;
              const isHidden = value === 'hide' || value === 'hidden' || value === false;

              if (isFlex) {
                bkptStyle = { flex: 1 };
              } else if (!isAuto) {
                bkptStyle = { width: `${width}%` };
              } else if (isHidden) {
                bkptStyle = {
                  display: 'none',
                  opacity: 0,
                  overflow: 'hidden',
                };
              }

              delete props[breakpoint];
            });

          itemStyle.push(bkptStyle);

          return (
            <BoxFactory key={index} component={child?.type} {...props} style={itemStyle} stylist={[variants.item]} />
          );
        })}
      </BoxFactory>
    );
  }),
);

GridFactory.displayName = 'GridFactory';

export default GridFactory;
