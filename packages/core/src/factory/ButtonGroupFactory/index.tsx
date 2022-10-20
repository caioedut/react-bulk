import React, { cloneElement } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { ButtonGroupProps, FactoryProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';
import ScrollableFactory from '../ScrollableFactory';

function ButtonGroupFactory({ stylist, children, map, innerRef, ...props }: FactoryProps & ButtonGroupProps) {
  const theme = useTheme();
  const options = theme.components.ButtonGroup;

  // Extends from default props
  let { color, disabled, loading, size, variant, contentStyle, ...rest } = factory(props, options.defaultProps);

  const styleRoot = useStylist({
    name: options.name,
    style: options.defaultStyles.root,
  });

  const styleContent = useStylist({
    name: options.name + '-content',
    style: options.defaultStyles.content,
  });

  if (children && !Array.isArray(children)) {
    children = [children];
  }

  return (
    <ScrollableFactory map={map} innerRef={innerRef} stylist={[styleRoot, stylist]} {...rest} direction="horizontal">
      <BoxFactory map={map} style={contentStyle} stylist={[styleContent]}>
        {children?.map((child, key) => {
          const isFirst = key === 0;
          const isLast = key === children.length - 1;
          const borderLeftWidth = children.length > 1 && !isFirst ? 0 : 1;

          const button = cloneElement(child, {
            color,
            disabled,
            loading,
            size,
            variant,
            ...child.props,
            mt: 0,
            mb: 0,
            ml: 0,
            mr: 0,
            style: [
              { borderLeftWidth, height: 'auto', width: 'auto' },
              child.style,
              !isFirst && !isLast && { borderRadius: 0 },
              !isFirst && isLast && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
              isFirst && !isLast && { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ],
          });

          return <React.Fragment key={key}>{button}</React.Fragment>;
        })}
      </BoxFactory>
    </ScrollableFactory>
  );
}

export default React.memo(ButtonGroupFactory);
