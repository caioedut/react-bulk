import { forwardRef } from 'react';
import { ScrollViewProps } from 'react-native';

import { ButtonGroupFactory } from '@react-bulk/core';
import { ButtonGroupProps } from '@react-bulk/core/src/types';

import useMap from '../useMap';

export type ButtonGroupPropsWeb = ScrollViewProps & ButtonGroupProps;

function ButtonGroup({ ...props }: ButtonGroupPropsWeb, ref) {
  const map = useMap();

  return <ButtonGroupFactory ref={ref} {...props} map={map} />;
}

export default forwardRef(ButtonGroup);
