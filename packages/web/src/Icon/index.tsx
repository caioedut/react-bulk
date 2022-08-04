import { ComponentPropsWithRef, forwardRef } from 'react';

import { IconFactory } from '@react-bulk/core';
import { IconProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type IconPropsWeb = ComponentPropsWithRef<'div'> & IconProps;

function Icon({ ...props }: IconPropsWeb, ref) {
  const map = useMap();

  return <IconFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Icon);
