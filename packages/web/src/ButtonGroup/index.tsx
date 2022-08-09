import { ComponentPropsWithRef, forwardRef } from 'react';

import { ButtonGroupFactory, ButtonGroupProps } from '@react-bulk/core';

import useMap from '../useMap';

export type ButtonGroupPropsWeb = ComponentPropsWithRef<'div'> & ButtonGroupProps;

function ButtonGroup({ ...props }: ButtonGroupPropsWeb, ref) {
  const map = useMap();

  return <ButtonGroupFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(ButtonGroup);
