import { ComponentPropsWithRef, forwardRef } from 'react';

import { SelectFactory, SelectProps } from '@react-bulk/core';

import useMap from '../useMap';

export type SelectPropsWeb = ComponentPropsWithRef<'div'> & SelectProps;

function Select({ ...props }: SelectPropsWeb, ref) {
  return <SelectFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Select);
