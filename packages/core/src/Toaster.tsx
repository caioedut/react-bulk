import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import Platform from './Platform';
import BoxFactory from './factory/BoxFactory';
import CardFactory from './factory/CardFactory';
import TextFactory from './factory/TextFactory';
import factory2 from './props/factory2';
import { RequiredSome, TimeoutType, ToasterProps } from './types';
import uuid from './utils/uuid';

export type ToasterRef = {
  props: ToasterProps;
  setProps: (props?: ToasterProps) => void;
};

function Toaster({ theme }: any, ref) {
  const { web, native } = Platform;
  const options = theme.components.Toaster;

  const idRef = useRef<string>();
  const timeoutRef = useRef<TimeoutType>();
  const cardRef = useRef<any>();

  const [props, setProps] = useState<ToasterProps>();

  // Extends from default props
  const {
    content,
    color,
    duration,
    width,
    halign,
    offset,
    valign,
    // Events
    onPress,
    // Styles
    variants,
  } = factory2<RequiredSome<ToasterProps, 'color' | 'duration' | 'halign' | 'valign' | 'offset'>>(props || {}, options);

  const translateY = 120 * (valign === 'top' ? -1 : 1);
  const textColor = theme.contrast(color);

  const containerStyle = [
    {
      position: native ? 'absolute' : 'fixed',
      zIndex: theme.mixins.zIndex.toaster,

      h: 0,
      w: '100%',
      l: 0,
      r: 0,
    },

    valign === 'top' && { t: 0 },
    valign === 'bottom' && { b: 0 },
  ];

  const animationStyle = [
    {
      position: 'absolute',
      maxw: '100%',
      width,
      transform: { translateY },
    },

    valign === 'top' && { t: 0 },
    valign === 'bottom' && { b: 0 },
    halign === 'left' && { l: 0 },
    halign === 'right' && { r: 0 },
  ];

  useImperativeHandle(ref, () => ({ props, setProps }), [props]);

  useEffect(() => {
    if (props) {
      idRef.current = uuid();

      if (web) {
        setTimeout(() => cardRef?.current?.focus?.(), 10);
      }

      timeoutRef.current = setTimeout(() => {
        setProps(undefined);
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [duration, props, web]);

  return (
    <BoxFactory row center style={containerStyle}>
      {Boolean(props) && (
        <BoxFactory
          key={idRef.current}
          px={offset?.x}
          py={offset?.y}
          style={animationStyle}
          animation={{
            throttle: 0,
            duration: 200,
            from: { transform: { translateY } },
            to: { transform: { translateY: 0 } },
          }}
        >
          <CardFactory
            data-rbk-toaster={color}
            ref={cardRef}
            variants={{ root: variants.root }}
            accessibility={{ role: 'alert' }}
            platform={{ web: { tabIndex: '-1' } }}
            bg={color}
            onPress={onPress}
          >
            <BoxFactory row noWrap alignItems="center">
              {typeof content === 'string' ? (
                <TextFactory flex variant="secondary" color={textColor}>
                  {content}
                </TextFactory>
              ) : (
                content
              )}
            </BoxFactory>

            <BoxFactory position="absolute" b={0} l={0} r={0}>
              <BoxFactory
                animation={{
                  throttle: 0,
                  duration,
                  timing: 'linear',
                  iterations: 1,
                  from: { width: '0%' },
                  to: { width: '100%' },
                }}
              >
                <BoxFactory h={2} bg={theme.color(textColor, 0.5)} />
              </BoxFactory>
            </BoxFactory>
          </CardFactory>
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

export default forwardRef(Toaster);
