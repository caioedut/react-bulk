import { ComponentPropsWithRef, forwardRef } from 'react';

import { IconFactory, IconProps } from '@react-bulk/core';

import useMap from '../useMap';

export type IconPropsWeb = ComponentPropsWithRef<'div'> & IconProps;

function Icon({ ...props }: IconPropsWeb, ref) {
  return <IconFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Icon);
