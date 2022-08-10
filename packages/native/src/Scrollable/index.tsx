import { forwardRef } from 'react';
import { RefreshControl } from 'react-native';

import { ScrollableFactory, ScrollableProps, useTheme } from '@react-bulk/core';

import { NativeScrollableProps } from '../types';
import useMap from '../useMap';

export type ScrollablePropsNative = ScrollableProps & NativeScrollableProps;

function Scrollable({ refreshing, onRefresh, refreshControl, ...props }: ScrollablePropsNative, ref) {
  const map = useMap();
  const theme = useTheme();

  if (!refreshControl && (onRefresh || refreshing)) {
    refreshControl = <RefreshControl refreshing={refreshing as any} onRefresh={onRefresh} />;
  }

  if (refreshControl) {
    // @ts-ignore
    props.refreshControl = refreshControl;
  }

  props = {
    // @ts-ignore
    contentInsetAdjustmentBehavior: 'scrollableAxes',
    indicatorStyle: theme.mode === 'dark' ? 'white' : 'black',
    keyboardDismissMode: 'on-drag',
    keyboardShouldPersistTaps: 'always',
    nestedScrollEnabled: true,
    pinchGestureEnabled: false,
    scrollIndicatorInsets: props.horizontal ? { bottom: 1, left: 1 } : { top: 1, right: 1 },
    ...props,
  };

  return <ScrollableFactory ref={ref} {...props} map={map} />;
}

export default forwardRef<typeof Scrollable, ScrollablePropsNative>(Scrollable);
