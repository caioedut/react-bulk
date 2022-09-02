import React, { cloneElement } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { ButtonGroupProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';

function ButtonGroupFactory({ stylist, children, map, ...props }: FactoryProps & ButtonGroupProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.ButtonGroup;

  // Extends from default props
  let { color, disabled, loading, size, variant, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  if (children && !Array.isArray(children)) {
    children = [children];
  }

  stylist = [styleRoot, stylist];

  return (
    <BoxFactory ref={ref} map={map} stylist={stylist} {...rest}>
      {children?.map((child, key) => {
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
  );
}

export default React.forwardRef(ButtonGroupFactory);
