import React from 'react';

import { useTheme } from '../../ReactBulk';
import factory2 from '../../props/factory2';
import { FactoryProps, GridProps, JssStyles } from '../../types';
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

        const Component = child.type;
        const props = { ...(child?.props || {}) };
        const style: JssStyles = [{ padding: spacing }];

        breakpoints.forEach((key: string) => {
          if (key in props) {
            const value = props[key];
            const width = (value / size) * 100;

            const isAuto = value === 'auto';
            const isFlex = value === true || value === 'flex';

            style.push({
              [key]: {
                flex: isFlex ? '1' : undefined,
                width: !isAuto && !isFlex ? `${width}%` : undefined,
              },
            });
          }

          delete props[key];
        });

        return (
          <BoxFactory key={index} map={map} style={style} stylist={[variants.item]}>
            <Component {...props} />
          </BoxFactory>
        );
      })}
    </BoxFactory>
  );
}

export default React.memo(GridFactory);
