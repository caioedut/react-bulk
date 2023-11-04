import React, { forwardRef, useEffect, useRef, useState } from 'react';

import rect from '../../element/rect';
import useTheme from '../../hooks/useTheme';
import factory2 from '../../props/factory2';
import { DropdownProps } from '../../types';
import BackdropFactory from '../BackdropFactory';
import BoxFactory from '../BoxFactory';

const DropdownFactory = React.memo<DropdownProps>(
  forwardRef(({ stylist, children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Dropdown;

    // Extends from default props
    let {
      visible,
      // Events
      onClose,
      // Styles,
      variants,
      style,
      ...rest
    } = factory2<DropdownProps>(props, options);

    const boxRef = useRef();

    const [positions, setPositions] = useState({ top: 0, left: 0 });

    useEffect(() => {
      if (!visible || !boxRef?.current) return;

      (async () => {
        const metrics = await rect(boxRef.current);
        setPositions({ top: metrics.pageOffsetY, left: metrics.pageOffsetX });
      })();
    }, [visible, ref]);

    return (
      <BoxFactory ref={boxRef}>
        <BackdropFactory visible={visible} stylist={[variants.backdrop]} onPress={onClose}>
          <BoxFactory ref={ref} stylist={[variants.root, stylist]} style={[positions, style]} {...rest}>
            {children}
          </BoxFactory>
        </BackdropFactory>
      </BoxFactory>
    );
  }),
);

DropdownFactory.displayName = 'DropdownFactory';

export default DropdownFactory;
