import { forwardRef } from 'react';

import { CheckboxFactory, CheckboxProps } from '@react-bulk/core';

import useMap from '../useMap';

function Checkbox({ ...props }: CheckboxProps, ref) {
  return <CheckboxFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Checkbox, CheckboxProps>(Checkbox);
