import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { IconFactory } from '@react-bulk/core';
import { IconProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type IconPropsNative = ViewProps & IconProps;

function Icon({ ...props }: IconPropsNative, ref) {
  const map = useMap();

  return <IconFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Icon);
