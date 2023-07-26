import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import Platform from './Platform';
import AnimationFactory from './factory/AnimationFactory';
import BoxFactory from './factory/BoxFactory';
import ButtonFactory from './factory/ButtonFactory';
import CardFactory from './factory/CardFactory';
import TextFactory from './factory/TextFactory';
import Times from './icons/Times';
import { EventCallback, RbkColor, ReactElement, TimeoutType } from './types';
import global from './utils/global';
import uuid from './utils/uuid';

export type ToasterProps = {
  content?: ReactElement;
  color?: RbkColor;
  duration?: number;
  halign?: 'left' | 'right' | 'center';
  valign?: 'top' | 'bottom';
  width?: number | string;
  // Events
  onClose?: EventCallback;
};

export type ToasterRef = {
  props: ToasterProps;
  setProps: (props?: ToasterProps) => void;
};

function Toaster({ theme }: any, ref) {
  const { native } = Platform;
  const { svg } = global.mapping;

  const idRef = useRef<string>();
  const timeoutRef = useRef<TimeoutType>();

  const [props, setProps] = useState<ToasterProps>();

  const {
    // Defaults
    content,
    color = 'gray.dark',
    duration = 4000,
    width,
    halign = 'left',
    valign = 'bottom',
    // Events
    onClose,
  } = props || {};

  const containerStyle = {
    position: native ? 'absolute' : 'fixed',
    zIndex: theme.mixins.zIndex.toaster,

    maxw: '100%',
    w: halign === 'center' ? '100%' : undefined,

    t: valign === 'top' ? 0 : undefined,
    b: valign !== 'top' ? 0 : undefined,
    r: halign === 'right' ? 0 : undefined,
    l: halign !== 'right' ? 0 : undefined,
  };

  const translateY = 120 * (valign === 'top' ? -1 : 1);
  const textColor = theme.contrast(color);

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
          m={3}
          speed={200}
          from={{ transform: [{ translateY }] }}
          to={{ transform: [{ translateY: 0 }] }}
        >
          <CardFactory
            position="relative"
            overflow="hidden"
            bg={color}
            w={width}
            maxw="100%"
            corners={2}
            px={5}
            py={3}
            accessibility={{ role: 'alert' }}
          >
            <BoxFactory row noWrap>
              <BoxFactory flex>
                {typeof content === 'string' ? (
                  <TextFactory variant="secondary" color={textColor}>
                    {content}
                  </TextFactory>
                ) : (
                  content
                )}
              </BoxFactory>
              {typeof onClose === 'function' && (
                <BoxFactory ml={3} mr={-3} my={-1.5}>
                  <ButtonFactory
                    circular
                    variant="text"
                    size="small"
                    color={textColor}
                    onPress={onClose}
                    accessibility={{ label: 'close' }}
                  >
                    <Times svg={svg} color={textColor} />
                  </ButtonFactory>
                </BoxFactory>
              )}
            </BoxFactory>

            <BoxFactory position="absolute" b={0} l={0} r={0}>
              <AnimationFactory in timing="linear" speed={duration} from={{ w: '0%' }} to={{ w: '100%' }}>
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
