import { ComponentPropsWithRef, forwardRef } from 'react';

import SelectFactory from '@react-bulk/core/src/factory/SelectFactory';
import { SelectProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type SelectPropsWeb = ComponentPropsWithRef<'div'> & SelectProps;

function Select({ ...props }: SelectPropsWeb, ref) {
  const map = useMap();

  return <SelectFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Select);
