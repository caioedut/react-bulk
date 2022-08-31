import React from 'react';

import { useTheme } from '../../ReactBulk';
import createStyle from '../../createStyle';
import { FactoryProps, GridProps } from '../../types';
import BoxFactory from '../BoxFactory';

function GridFactory({ className, children, map, ...props }: FactoryProps & GridProps, ref: any) {
  const theme = useTheme();

  // Extends from default props
  props = { ...theme.components.Grid.defaultProps, ...props };

  let { gap, size, ...rest } = props;

  const breakpoints = Object.keys(theme.breakpoints);
  const spacing = !gap ? 0 : theme.spacing(gap) / 2;

  if (children && !Array.isArray(children)) {
    children = [children];
  }

  const styleRoot = createStyle({
    name: 'rbk-grid',
    style: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'stretch',
    },
  });

  const styleState = createStyle({
    style: { padding: -spacing },
  });

  const styles = [styleRoot, styleState, className];

  return (
    <BoxFactory map={map} ref={ref} {...rest} className={styles}>
      {children?.map((child, index) => {
        const props = { ...child.props };
        const childStyle: any[] = [props.style, { padding: spacing }];

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
          }

          delete props[key];
        });

        return <BoxFactory key={index} map={map} component={child.type} {...props} style={childStyle} />;
      })}
    </BoxFactory>
  );
}

export default React.forwardRef(GridFactory);
