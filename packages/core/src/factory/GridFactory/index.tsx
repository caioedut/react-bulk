import React, { forwardRef } from 'react';

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
    const checkBreakpoints = breakpoints ?? theme.breakpoints;

    return (
      <BoxFactory ref={ref} style={[{ margin: -spacing }, style]} stylist={[variants.root, stylist]} {...rest}>
        {childrenize(children).map((child, index) => {
          if (!child && !['string', 'number'].includes(typeof child)) {
            return null;
          }

          const props = { ...Object(child?.props) };
          const bkptStyle: NonNullable<RbkStyle> = {};

          Object.keys(checkBreakpoints).forEach((bkptName) => {
            if (bkptName in props) {
              const bkptPropValue = props[bkptName];

              const isSize = typeof bkptPropValue === 'number';
              const isFlex = bkptPropValue === 'flex' || bkptPropValue === true;
              const isHidden = bkptPropValue === 'hide' || bkptPropValue === 'hidden' || bkptPropValue === false;

              bkptStyle[bkptName] = {
                minWidth: 0,
                minHeight: 0,
                flexBasis: 'auto',
                flexGrow: Number(isFlex),
                flexShrink: Number(isFlex),
                display: isHidden ? 'none' : 'flex',
                width: isSize ? `${(bkptPropValue / size) * 100}%` : 'auto',
              };
            }

            delete props[bkptName];
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
              breakpoints={breakpoints}
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
