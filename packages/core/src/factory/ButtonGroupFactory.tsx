import React, { cloneElement, forwardRef } from 'react';

import useTheme from '../hooks/useTheme';
import childrenize from '../props/childrenize';
import factory2 from '../props/factory2';
import { ButtonGroupProps } from '../types';
import BoxFactory from './BoxFactory';
import ScrollableFactory from './ScrollableFactory';

const ButtonGroupFactory = React.memo<ButtonGroupProps>(
  forwardRef(({ ref, children, ...props }, legacyRef) => {
    ref = ref || legacyRef;

    const theme = useTheme();
    const options = theme.components.ButtonGroup;

    // Extends from default props
    const {
      color,
      disabled,
      loading,
      size,
      variant,
      contentStyle,
      // Styles
      variants,
      ...rest
    } = factory2<ButtonGroupProps>(props, options);

    const childrenArray = childrenize(children);

    return (
      <ScrollableFactory ref={ref} variants={{ root: variants.root }} {...rest} direction="horizontal">
        <BoxFactory style={contentStyle} variants={{ root: variants.content }}>
          {childrenArray.map((child, key) => {
            const length = Array.isArray(children) ? children.length : children ? 1 : 0;

            const isFirst = key === 0;
            const isLast = key === length - 1;
            const borderLeftWidth = length > 1 && !isFirst ? 0 : 1;

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

                // @ts-expect-error
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
  }),
);

ButtonGroupFactory.displayName = 'ButtonGroupFactory';

export default ButtonGroupFactory;
