import React, { forwardRef, useCallback, useRef, useState } from 'react';

import createPortal from '../createPortal';
import rect from '../element/rect';
import useHtmlId from '../hooks/useHtmlId';
import usePropState from '../hooks/usePropState';
import useTheme from '../hooks/useTheme';
import CaretDown from '../icons/CaretDown';
import CaretLeft from '../icons/CaretLeft';
import CaretRight from '../icons/CaretRight';
import CaretUp from '../icons/CaretUp';
import factory2 from '../props/factory2';
import { RbkRect, RequiredSome, TimeoutType, TooltipProps } from '../types';
import global from '../utils/global';
import BoxFactory from './BoxFactory';
import TextFactory from './TextFactory';

const TooltipFactory = React.memo<TooltipProps>(
  forwardRef(({ children, ...props }, ref) => {
    const theme = useTheme();
    const options = theme.components.Tooltip;
    const { native, svg, Button } = global.mapping;

    const portalId = useHtmlId();

    // Extends from default props
    let {
      accessibility,
      color,
      delay,
      offset,
      position,
      title,
      visible,
      // Styles
      variants,
      labelStyle,
      style,
      ...rest
    } = factory2<RequiredSome<TooltipProps, 'position' | 'color' | 'delay' | 'offset'>>(props, options);

    color = theme.color(color);

    const rootRef = useRef();
    const timeoutRef = useRef<TimeoutType>(null);

    const [shown, setShown] = usePropState(visible, false);
    const [rootRect, setRootRect] = useState<RbkRect>({} as any);

    const isControlled = typeof visible === 'boolean';

    style = [
      shown && options?.variants?.visible?.true?.root,

      style,

      {
        top: rootRect.pageOffsetY ?? 0,
        left: rootRect.pageOffsetX ?? 0,
        width: rootRect.width ?? 0,
        height: rootRect.height ?? 0,
      },
    ];

    labelStyle = [
      {
        backgroundColor: color,
        color: theme.contrast(color),
      },

      labelStyle,
    ];

    const handleTooltipShow = useCallback(async () => {
      const rootRect = await rect(rootRef.current);

      setRootRect(rootRect);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (!isControlled) {
        timeoutRef.current = setTimeout(() => {
          setShown(true);
        }, delay);
      }
    }, [timeoutRef, delay, isControlled, setShown]);

    const handleTooltipHide = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (!isControlled) {
        setShown(false);
      }
    }, [isControlled, setShown]);

    return (
      <BoxFactory
        ref={rootRef}
        component={native ? Button : null}
        accessibility={{ label: title, ...Object(accessibility) }}
        style={{ position: 'relative' }}
        platform={{
          web: {
            onPointerEnter: handleTooltipShow,
            onPointerLeave: handleTooltipHide,
          },
          native: {
            onPressIn: handleTooltipShow,
            onPressOut: handleTooltipHide,
          },
        }}
      >
        {children}

        {createPortal(
          portalId,
          <BoxFactory ref={ref} style={style} variants={{ root: variants.root }} {...rest}>
            <BoxFactory
              style={[
                {
                  position: 'absolute',
                  h: 80,
                  w: 240,
                  p: offset,
                },

                position === 'top' && {
                  bottom: '100%',
                  l: '50%',
                  ml: '-120px',
                  alignItems: 'center',
                  justifyContent: 'end',
                },

                position === 'bottom' && {
                  top: '100%',
                  l: '50%',
                  ml: '-120px',
                  alignItems: 'center',
                  justifyContent: 'start',
                },

                position === 'left' && {
                  right: '100%',
                  t: '50%',
                  mt: '-40px',
                  alignItems: 'end',
                  justifyContent: 'center',
                },

                position === 'right' && {
                  left: '100%',
                  t: '50%',
                  mt: '-40px',
                  alignItems: 'start',
                  justifyContent: 'center',
                },
              ]}
            >
              <BoxFactory
                noWrap
                position="relative"
                direction={['left', 'right'].includes(position) ? 'row' : 'column'}
              >
                {position === 'bottom' && (
                  <BoxFactory center mb="-6px">
                    <CaretUp svg={svg} color={color} size={16} />
                  </BoxFactory>
                )}

                {position === 'right' && (
                  <BoxFactory center order={0} mr="-6px">
                    <CaretLeft svg={svg} color={color} size={16} />
                  </BoxFactory>
                )}

                <TextFactory numberOfLines={1} style={labelStyle} variants={{ root: variants.label }}>
                  {title}
                </TextFactory>

                {position === 'top' && (
                  <BoxFactory center mt="-6px">
                    <CaretDown svg={svg} color={color} size={16} />
                  </BoxFactory>
                )}

                {position === 'left' && (
                  <BoxFactory center ml="-6px">
                    <CaretRight svg={svg} color={color} size={16} />
                  </BoxFactory>
                )}
              </BoxFactory>
            </BoxFactory>
          </BoxFactory>,
        )}
      </BoxFactory>
    );
  }),
);

TooltipFactory.displayName = 'TooltipFactory';

export default TooltipFactory;
