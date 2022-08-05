import { ComponentPropsWithRef, forwardRef } from 'react';

import { LabelFactory } from '@react-bulk/core';
import { LabelProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type LabelPropsWeb = ComponentPropsWithRef<'label'> & LabelProps;

function Label({ ...props }: LabelPropsWeb, ref) {
  const map = useMap();

  return <LabelFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(Label);
