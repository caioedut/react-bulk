import React, { forwardRef, useEffect, useRef, useState } from 'react';

import rect from '../../element/rect';
import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { DropdownProps } from '../../types';
import global from '../../utils/global';
import BackdropFactory from '../BackdropFactory';
import BoxFactory from '../BoxFactory';

const DropdownFactory = React.memo<DropdownProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Dropdown;
    const { native, useDimensions } = global.mapping;

    // Extends from default props
    const {
      placement,
      visible,
      // Events
      onClose,
      // Styles,
      variants,
      style,
      ...rest
    } = factory2<DropdownProps>(props, options);

    const boxRef = useRef();

    const dimensions = useDimensions();

    const [positions, setPositions] = useState({ top: 0, left: 0 });

    const backdropProps = !native ? {} : { onRequestClose: onClose };

    useEffect(() => {
      if (!visible || !boxRef?.current) return;

      (async () => {
        const metrics = await rect(boxRef.current);

        setPositions({
          top: metrics.pageOffsetY,
          left: metrics.pageOffsetX,
        });
      })();
    }, [ref, visible, placement, dimensions.height]);

    return (
      <BoxFactory ref={boxRef}>
        <BackdropFactory visible={visible} stylist={[variants.backdrop]} onPress={onClose} {...backdropProps}>
          <BoxFactory ref={ref} stylist={[variants.root, stylist]} style={[positions, style]} {...rest}>
            <BoxFactory position="absolute" l={0} style={placement === 'top' ? { bottom: 0 } : { top: 0 }}>
              {children}
            </BoxFactory>
          </BoxFactory>
        </BackdropFactory>
      </BoxFactory>
    );
  }),
);

DropdownFactory.displayName = 'DropdownFactory';

export default DropdownFactory;
