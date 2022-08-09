import { forwardRef } from 'react';
import { ScrollViewProps } from 'react-native';

import { ButtonGroupFactory, ButtonGroupProps } from '@react-bulk/core';

import useMap from '../useMap';

export type ButtonGroupPropsWeb = ScrollViewProps & ButtonGroupProps;

function ButtonGroup({ ...props }: ButtonGroupPropsWeb, ref) {
  return <ButtonGroupFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef(ButtonGroup);
