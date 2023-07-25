import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import Platform from './Platform';
import AnimationFactory from './factory/AnimationFactory';
import BoxFactory from './factory/BoxFactory';
import CardFactory from './factory/CardFactory';
import TextFactory from './factory/TextFactory';
import { RbkColor, TimeoutType } from './types';
import uuid from './utils/uuid';

export type SnackbarProps = {
  color?: RbkColor;
  duration?: number;
  message?: string;
  halign?: 'center' | 'left' | 'right';
  valign?: 'center' | 'top' | 'bottom';
};

export type SnackbarRef = {
  props: SnackbarProps;
  setProps: (props?: SnackbarProps) => void;
};

function Snackbar({ theme }: any, ref) {
  const { native } = Platform;

  const idRef = useRef<string>();
  const timeoutRef = useRef<TimeoutType>();

  const [props, setProps] = useState<SnackbarProps>();

  const {
    //
    message,
    color = 'gray.dark',
    duration = 4000,
    halign = 'left',
    valign = 'bottom',
  } = props || {};

  const boxProps = {
    t: valign === 'top' ? 0 : undefined,
    b: valign !== 'top' ? 0 : undefined,
    r: halign === 'right' ? 0 : undefined,
    l: halign !== 'right' ? 0 : undefined,
  };

  const translateY = 120 * (valign === 'top' ? -1 : 1);

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

  // TODO
  // CRIAR TOASTER EM VEZ DE SNACKBAR
  // PERMITIR QUALQUER ELEMENTO NO TOASTER

  return (
    <BoxFactory position={native ? 'absolute' : 'fixed'} maxw="100%" row zIndex={999} {...boxProps}>
      {Boolean(props) && (
        <AnimationFactory
          key={idRef.current}
          in
          m={3}
          speed={200}
          from={{ transform: [{ translateY }] }}
          to={{ transform: [{ translateY: 0 }] }}
        >
          <CardFactory position="relative" overflow="hidden" bg={color} maxw={480} corners={2} px={5} py={3}>
            <TextFactory variant="secondary" color={theme.contrast(color)}>
              {message}
            </TextFactory>
            <BoxFactory position="absolute" b={0} l={0} r={0}>
              <AnimationFactory in timing="linear" speed={duration} from={{ w: '0%' }} to={{ w: '100%' }}>
                <BoxFactory h={2} bg={theme.color(theme.contrast(color), 0.5)} />
              </AnimationFactory>
            </BoxFactory>
          </CardFactory>
        </AnimationFactory>
      )}
    </BoxFactory>
  );
}

export default forwardRef(Snackbar);
