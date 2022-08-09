import React from 'react';

import { useTheme } from '../../ReactBulk';
import { GridProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';

function GridFactory({ size, className, style, children, map, ...rest }: GridProps | any, ref: any) {
  const theme = useTheme();
  const classes: any[] = ['rbk-grid', className];

  const breakpoints = Object.keys(theme.breakpoints);

  if (children && !Array.isArray(children)) {
    children = [children];
  }

  style = [
    {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'stretch',
    },

    style,
  ];

  return (
    <BoxFactory map={map} ref={ref} {...rest} className={clsx(classes)} style={style}>
      {children.map((child, index) => {
        const props = { ...child.props };
        const childStyle: any[] = [props.style];

        breakpoints.forEach((key: string) => {
          if (key in props) {
            const value = props[key];
            const width = (props[key] / size) * 100;
            const isFlex = value === true || value === 'flex' || value === 'auto';

            childStyle.push({
              [key]: {
                flex: isFlex ? '1' : undefined,
                width: !isFlex ? `${width}%` : undefined,
              },
            });

            delete props[key];
          }
        });

        return <BoxFactory key={index} map={map} component={child.type} {...props} style={childStyle} />;
      })}
    </BoxFactory>
  );
}

export default React.forwardRef(GridFactory);
