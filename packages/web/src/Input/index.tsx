import { forwardRef } from 'react';

import { InputFactory } from '@react-bulk/core';
import { InputProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

function Input({ ...props }: InputProps, ref) {
  return <InputFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Input);
