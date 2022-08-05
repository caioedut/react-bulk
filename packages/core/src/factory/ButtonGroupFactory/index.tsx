import React, { cloneElement } from 'react';

import { ButtonGroupProps } from '../../types';
import clsx from '../../utils/clsx';
import DividerFactory from '../DividerFactory';
import ScrollableFactory from '../ScrollableFactory';

function ButtonGroupFactory(
  { disabled, loading, variant, size, color, className, children, map, ...rest }: ButtonGroupProps | any,
  ref: any,
) {
  if (children && !Array.isArray(children)) {
    children = [children];
  }

  return (
    <ScrollableFactory map={map} ref={ref} horizontal flexbox wrap={false} {...rest} className={clsx('rbk-button-group', className)}>
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

        return (
          <React.Fragment key={key}>
            {!isFirst && <DividerFactory map={map} w={1} h="auto" style={{ opacity: 0.5 }} />}
            {button}
          </React.Fragment>
        );
      })}
    </ScrollableFactory>
  );
}

export default React.forwardRef(ButtonGroupFactory);
