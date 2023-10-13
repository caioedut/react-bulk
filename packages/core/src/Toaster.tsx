import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import Platform from './Platform';
import AnimationFactory from './factory/AnimationFactory';
import BoxFactory from './factory/BoxFactory';
import CardFactory from './factory/CardFactory';
import TextFactory from './factory/TextFactory';
import { TimeoutType, ToasterProps } from './types';
import uuid from './utils/uuid';

export type ToasterRef = {
  props: ToasterProps;
  setProps: (props?: ToasterProps) => void;
};

function Toaster({ theme }: any, ref) {
  const { web, native } = Platform;

  const idRef = useRef<string>();
  const timeoutRef = useRef<TimeoutType>();
  const cardRef = useRef<any>();

  const [props, setProps] = useState<ToasterProps>();

  const {
    // Defaults
    content,
    color = 'gray.dark',
    duration = 4000,
    width,
    halign = 'left',
    offset,
    valign = 'bottom',
  } = props || {};

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
    },

    valign === 'top' && { t: 0 },
    valign === 'bottom' && { b: 0 },
    halign === 'left' && { l: 0 },
    halign === 'right' && { r: 0 },
  ];

  useImperativeHandle(
    ref,
    () => ({
      props,
      setProps,
    }),
    [],
  );

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (props) {
      idRef.current = uuid();

      if (web) {
        setTimeout(() => cardRef?.current?.focus?.(), 10);
      }

      timeoutRef.current = setTimeout(() => {
        setProps(undefined);
      }, duration);
    }
  }, [props]);

  return (
    <BoxFactory row center style={containerStyle}>
      {Boolean(props) && (
        <AnimationFactory
          key={idRef.current}
          in
          p={theme.shape.gap}
          mx={offset?.x}
          my={offset?.y}
          duration={200}
          from={{ transform: [{ translateY }] }}
          to={{ transform: [{ translateY: 0 }] }}
          style={animationStyle}
        >
          <CardFactory
            ref={cardRef}
            position="relative"
            overflow="hidden"
            bg={color}
            corners={2}
            p={theme.shape.gap}
            accessibility={{ role: 'alert' }}
            platform={{ web: { tabIndex: '-1' } }}
          >
            <BoxFactory row noWrap center>
              {typeof content === 'string' ? (
                <TextFactory variant="secondary" color={textColor}>
                  {content}
                </TextFactory>
              ) : (
                content
              )}
            </BoxFactory>

            <BoxFactory position="absolute" b={0} l={0} r={0}>
              <AnimationFactory in timing="linear" duration={duration} from={{ w: '0%' }} to={{ w: '100%' }}>
                <BoxFactory h={2} bg={theme.color(textColor, 0.5)} />
              </AnimationFactory>
            </BoxFactory>
          </CardFactory>
        </AnimationFactory>
      )}
    </BoxFactory>
  );
}

export default forwardRef(Toaster);
