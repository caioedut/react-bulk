import React, { cloneElement } from 'react';

import { ButtonGroupProps } from '../../types';
import clsx from '../../utils/clsx';
import BoxFactory from '../BoxFactory';
import ScrollableFactory from '../ScrollableFactory';

function ButtonGroupFactory(
  { disabled, loading, variant, size, color, className, children, map, ...rest }: ButtonGroupProps | any,
  ref: any,
) {
  const classes: any[] = ['rbk-button-group', className];

  if (children && !Array.isArray(children)) {
    children = [children];
  }

  return (
    <ScrollableFactory ref={ref} map={map} horizontal {...rest} className={clsx(classes)}>
      <BoxFactory
        map={map}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          alignItems: 'stretch',
        }}
      >
        {children.map((child, key) => {
          const isFirst = key === 0;
          const isLast = key === children.length - 1;

          const button = cloneElement(child, {
            disabled,
            loading,
            variant,
            size,
            color,
            ...child.props,
            mt: 0,
            mb: 0,
            ml: 0,
            mr: 0,
            style: [
              child.style,
              !isFirst && !isLast && { borderRadius: 0 },
              isFirst && { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
              isLast && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
            ],
          });

          return <React.Fragment key={key}>{button}</React.Fragment>;
        })}
      </BoxFactory>
    </ScrollableFactory>
  );
}

export default React.forwardRef(ButtonGroupFactory);
