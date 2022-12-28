import React from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { FactoryProps, GridProps, RbkStyles } from '../../types';
import BoxFactory from '../BoxFactory';

function GridFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & GridProps) {
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
  } = factory2(props, options);

  const breakpoints = Object.keys(theme.breakpoints);
  const spacing = !gap ? 0 : theme.spacing(gap) / 2;

  return (
    <BoxFactory map={map} innerRef={innerRef} style={[{ margin: -spacing }, style]} stylist={[variants.root, stylist]} {...rest}>
      {React.Children.map(children, (child, index) => {
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
          <BoxFactory
            key={index}
            map={map}
            component={child?.type}
            componentProps={{ map }}
            {...props}
            style={itemStyle}
            stylist={[variants.item]}
          />
        );
      })}
    </BoxFactory>
  );
}

const Memoized = React.memo(GridFactory);
Memoized.displayName = 'GridFactory';

export default Memoized;
