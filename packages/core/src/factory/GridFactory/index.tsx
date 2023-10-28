import React, { forwardRef } from 'react';

import useBreakpoints from '../../hooks/useBreakpoints';
import useTheme from '../../hooks/useTheme';
import childrenize from '../../props/childrenize';
import factory2 from '../../props/factory2';
import { GridProps, RbkStyle, RequiredSome } from '../../types';
import stdout from '../../utils/stdout';
import BoxFactory from '../BoxFactory';

const GridFactory = React.memo<GridProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Grid;

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
    const spacing = !gap ? 0 : theme.spacing(gap / 2);
    const checkBreakpoints = useBreakpoints(breakpoints);

    return (
      <BoxFactory ref={ref} style={[{ margin: -spacing }, style]} stylist={[variants.root, stylist]} {...rest}>
        {childrenize(children).map((child, index) => {
          if (!child && !['string', 'number'].includes(typeof child)) {
            return null;
          }

          const props = { ...Object(child?.props) };
          let bkptStyle: RbkStyle = {};

          Object.entries(checkBreakpoints).forEach(([breakpoint, isBkpActive]) => {
            if (breakpoint in props && isBkpActive) {
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
            }

            delete props[breakpoint];
          });

          if (
            child?.type !== BoxFactory &&
            Object.keys(props).filter((prop) => !['ref', 'key', 'children'].includes(prop)).length > 0
          ) {
            stdout.warn(
              'It\'s recommended to wrap the grid child in a "Box" to pass props in addition to breakpoints.',
            );
          }

          return (
            <BoxFactory
              key={index}
              component={child?.type}
              {...props}
              style={[props.style, { padding: spacing }, bkptStyle]}
              stylist={[variants.item]}
            />
          );
        })}
      </BoxFactory>
    );
  }),
);

GridFactory.displayName = 'GridFactory';

export default GridFactory;
