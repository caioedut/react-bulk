import { forwardRef } from 'react';

import { InputFactory, InputProps } from '@react-bulk/core';

import useMap from '../useMap';

function Input({ ...props }: InputProps, ref) {
  return <InputFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Input);
