import { forwardRef } from 'react';

import { FormFactory, FormProps } from '@react-bulk/core';

import useMap from '../useMap';

function Form({ ...props }: FormProps, ref) {
  return <FormFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Form, FormProps>(Form);
