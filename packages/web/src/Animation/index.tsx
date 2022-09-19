import { forwardRef } from 'react';

import { AnimationFactory, AnimationProps } from '@react-bulk/core';

import useMap from '../useMap';

function Animation({ ...props }: AnimationProps, ref) {
  return <AnimationFactory ref={ref} {...props} map={useMap()} />;
}

const Component = forwardRef<typeof Animation, AnimationProps>(Animation);

// @ts-ignore
Component.FadeIn = forwardRef<typeof Animation, AnimationProps>((props, ref) => (
  <AnimationFactory ref={ref} {...props} map={useMap()} from={{ opacity: 0 }} to={{ opacity: 1 }} />
));

// @ts-ignore
Component.FadeOut = forwardRef<typeof Animation, AnimationProps>((props, ref) => (
  <AnimationFactory ref={ref} {...props} map={useMap()} from={{ opacity: 1 }} to={{ opacity: 0 }} />
));

// @ts-ignore
Component.ZoomIn = forwardRef<typeof Animation, AnimationProps>((props, ref) => (
  <AnimationFactory ref={ref} {...props} map={useMap()} from={{ transform: [{ scale: 0 }] }} to={{ transform: [{ scale: 1 }] }} />
));

// @ts-ignore
Component.ZoomOut = forwardRef<typeof Animation, AnimationProps>((props, ref) => (
  <AnimationFactory ref={ref} {...props} map={useMap()} from={{ transform: [{ scale: 1 }] }} to={{ transform: [{ scale: 0 }] }} />
));

// @ts-ignore
Component.Spin = forwardRef<typeof Animation, AnimationProps>((props, ref) => (
  <AnimationFactory
    ref={ref}
    {...props}
    map={useMap()}
    from={{ transform: [{ rotate: '0deg' }] }}
    to={{ transform: [{ rotate: '360deg' }] }}
  />
));

export default Component;
