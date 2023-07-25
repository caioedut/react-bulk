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

  const { message, color = 'gray.dark', duration = 4000 } = props || {};

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
    <BoxFactory position={native ? 'absolute' : 'fixed'} b={0} l={0} maxw="100%" p={3} row zIndex={999}>
      {Boolean(props) && (
        <AnimationFactory
          key={idRef.current}
          in
          speed={200}
          from={{ transform: [{ translateY: 120 }] }}
          to={{ transform: [{ translateY: 0 }] }}
        >
          <CardFactory position="relative" overflow="hidden" bg={color} maxw={480} corners={2} px={5} py={3}>
            <TextFactory variant="secondary" color={theme.contrast(color)}>
              {message}
            </TextFactory>
            <BoxFactory position="absolute" t={0} l={0} r={0}>
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
