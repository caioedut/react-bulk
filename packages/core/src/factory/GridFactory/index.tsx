import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import childrenize from '../../props/childrenize';
import factory2 from '../../props/factory2';
import { GridProps, RbkStyles, RequiredSome } from '../../types';
import BoxFactory from '../BoxFactory';

const GridFactory = React.memo<GridProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Grid;

    // Extends from default props
    let {
      gap,
      size,
      // Styles
      variants,
      style,
      ...rest
    } = factory2<RequiredSome<GridProps, 'size'>>(props, options);

    gap = gap === true ? theme.shape.gap : gap;
    const breakpoints = Object.keys(theme.breakpoints);
    const spacing = !gap ? 0 : theme.spacing(gap / 2);

    return (
      <BoxFactory ref={ref} style={[{ margin: -spacing }, style]} stylist={[variants.root, stylist]} {...rest}>
        {childrenize(children).map((child, index) => {
          if (!child && !['string', 'number'].includes(typeof child)) {
            return null;
          }

          const props = { ...Object(child?.props) };
          const itemStyle: RbkStyles = [props.style, { padding: spacing }];

          breakpoints.forEach((breakpoint: string) => {
            if (breakpoint in props) {
              const value = props[breakpoint];
              const width = (value / size) * 100;

              const isAuto = value === 'auto';
              const isFlex = value === 'flex' || value === true;
              const isHidden = value === 'hide' || value === 'hidden' || value === false;

              if (!isAuto) {
                itemStyle.push({ [breakpoint]: { width: `${width}%` } });
              }

              if (isFlex) {
                itemStyle.push({ [breakpoint]: { flex: 1 } });
              }

              if (isHidden) {
                itemStyle.push({
                  [breakpoint]: {
                    display: 'none',
                    opacity: 0,
                    overflow: 'hidden',
                  },
                });
              }
            }

            delete props[breakpoint];
          });

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
