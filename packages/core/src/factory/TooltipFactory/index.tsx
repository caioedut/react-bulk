import React, { useRef, useState } from 'react';

import { useTheme } from '../../ReactBulk';
import factory from '../../props/factory';
import { FactoryProps, TimeoutType, TooltipProps } from '../../types';
import useStylist from '../../useStylist';
import BoxFactory from '../BoxFactory';
import TextFactory from '../TextFactory';

function TooltipFactory({ className, children, map, ...props }: FactoryProps & TooltipProps, ref: any) {
  const theme = useTheme();
  const options = theme.components.Tooltip;
  const { native, dimensions, Button } = map;

  // Extends from default props
  let { color, position, title, defaultStyle, ...rest } = factory(props, options.defaultProps);

  const timeoutRef = useRef<TimeoutType>(null);
  const [visible, setVisible] = useState(false);

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styleState = useStylist({
    style: [
      {
        backgroundColor: color,
        borderRadius: theme.shape.borderRadius,
        color: theme.contrast(color),
        maxw: dimensions.width / 2,
      },

      position === 'top' && { bottom: '100%', minWidth: '100%' },
      position === 'bottom' && { top: '100%', minWidth: '100%' },
      position === 'left' && { right: '100%', minHeight: '100%' },
      position === 'right' && { left: '100%', minHeight: '100%' },

      ['top', 'bottom'].includes(position) && {
        left: '50%',
        transform: [{ translateX: '-50%' }],
        my: 1,
      },

      ['left', 'right'].includes(position) && {
        top: '50%',
        transform: [{ translateY: '-50%' }],
        mx: 1,
      },
    ],
  });

  const styles = [styleRoot, styleState, className];

  const handleTooltipShow = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setVisible(true), 50);
  };

  const handleTooltipHide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setVisible(false);
  };

  return (
    <BoxFactory
      map={map}
      component={native ? Button : null}
      style={{ position: 'relative' }}
      platform={{
        web: {
          onMouseOver: handleTooltipShow,
          onMouseOut: handleTooltipHide,
        },
        native: {
          onPressIn: handleTooltipShow,
          onPressOut: handleTooltipHide,
        },
      }}
    >
      {children}
      {Boolean(visible) && (
        <TextFactory map={map} ref={ref} numberOfLines={1} {...rest} className={styles}>
          {title}
        </TextFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(TooltipFactory);
