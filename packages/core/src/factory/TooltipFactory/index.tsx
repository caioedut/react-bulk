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
  const [trans, setTrans] = useState(0);

  const translate = native ? -(trans / 2) : '-50%';
  const isHorizontal = ['left', 'right'].includes(position);

  const styleRoot = useStylist({
    name: options.name,
    style: defaultStyle,
  });

  const styleState = useStylist({
    style: [
      position === 'top' && { top: 0, left: '50%' },
      position === 'bottom' && { bottom: 0, left: '50%' },
      position === 'left' && { left: 0, top: '50%' },
      position === 'right' && { right: 0, top: '50%' },
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
          activeOpacity: 1,
          onPressIn: handleTooltipShow,
          onPressOut: handleTooltipHide,
        },
      }}
    >
      {children}
      {Boolean(visible) && (
        <BoxFactory map={map} ref={ref} {...rest} className={styles}>
          <TextFactory
            map={map}
            numberOfLines={1}
            platform={{
              native: {
                onLayout: ({ nativeEvent: { layout } }) => setTrans(isHorizontal ? layout.height : layout.width),
              },
            }}
            style={[
              {
                position: 'absolute',
                backgroundColor: color,
                borderRadius: theme.shape.borderRadius,
                color: theme.contrast(color),
                fontSize: '0.75rem',
                py: 1,
                px: 1.5,
                textAlign: 'center',
                maxWidth: dimensions.width,
                web: { whiteSpace: 'nowrap' },
              },

              native && !trans && { opacity: 0 },

              isHorizontal && { mx: 1, transform: [{ translateY: translate }] },
              !isHorizontal && { my: 0.5, transform: [{ translateX: translate }] },

              position === 'top' && { bottom: '100%' },
              position === 'bottom' && { top: '100%' },
              position === 'left' && { right: '100%' },
              position === 'right' && { left: '100%' },
            ]}
          >
            {title}
          </TextFactory>
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

export default React.forwardRef(TooltipFactory);
