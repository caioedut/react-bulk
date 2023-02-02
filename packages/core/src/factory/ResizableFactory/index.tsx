import React, { forwardRef } from 'react';

import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { ResizableProps } from '../../types';
import global from '../../utils/global';
import BoxFactory from '../BoxFactory';

const ResizableFactory = React.memo<ResizableProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Resizable;
    const { web } = global.mapping;

    // Extends from default props
    let {
      horizontal,
      vertical,
      // Styles
      variants,
      style,
      ...rest
    } = factory2(props, options);

    const both = horizontal && vertical;

    style = [
      web && horizontal && { resize: 'horizontal' },
      web && vertical && { resize: 'vertical' },
      web && both && { resize: 'both' },

      style,
    ];

    return (
      <BoxFactory ref={ref} style={style} stylist={[variants.root, stylist]} {...rest}>
        {children}
        <BoxFactory
          position="absolute"
          r={0}
          b={0}
          style={{
            transform: [{ rotate: '-45deg' }],
          }}
        >
          <BoxFactory borderBottom="1px solid text" w={theme.spacing(3)} />
          <BoxFactory borderBottom="1px solid text" w={theme.spacing(1.5)} mt={0.5} mx="auto" />
        </BoxFactory>
      </BoxFactory>
    );
  }),
);

ResizableFactory.displayName = 'ResizableFactory';

export default ResizableFactory;
