import { ComponentPropsWithRef, forwardRef } from 'react';

import { LabelFactory, LabelProps } from '@react-bulk/core';

import useMap from '../useMap';

export type LabelPropsWeb = ComponentPropsWithRef<'label'> & LabelProps;

function Label({ ...props }: LabelPropsWeb, ref) {
  return <LabelFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(Label);
