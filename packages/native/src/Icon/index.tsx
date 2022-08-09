import { forwardRef } from 'react';
import { ViewProps } from 'react-native';

import { IconFactory, IconProps } from '@react-bulk/core';

import useMap from '../useMap';

export type IconPropsNative = ViewProps & IconProps;

function Icon({ ...props }: IconPropsNative, ref) {
  return <IconFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Icon);
