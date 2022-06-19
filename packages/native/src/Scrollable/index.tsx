import { forwardRef } from 'react';
import { RefreshControl, RefreshControlProps, ScrollViewProps } from 'react-native';

import { createScrollable, useTheme } from '@react-bulk/core';
import { ScrollableProps } from '@react-bulk/core/src/types';

import map from '../../map';

type ScrollablePropsNative = ScrollViewProps &
  RefreshControlProps &
  ScrollableProps & {
    refreshing?: boolean;
    refreshControl?: any;
  };

const Scrollable = forwardRef(({ refreshing, onRefresh, refreshControl, ...props }: ScrollablePropsNative, ref) => {
  const theme = useTheme();

  if (!refreshControl && (onRefresh || refreshing)) {
    refreshControl = <RefreshControl refreshing={refreshing as any} onRefresh={onRefresh} />;
  }

  if (refreshControl) {
    // @ts-ignore
    props.refreshControl = refreshControl;
  }

  props = {
    contentInsetAdjustmentBehavior: 'scrollableAxes',
    indicatorStyle: theme.mode === 'dark' ? 'white' : 'black',
    keyboardDismissMode: 'on-drag',
    keyboardShouldPersistTaps: 'always',
    nestedScrollEnabled: true,
    pinchGestureEnabled: false,
    scrollIndicatorInsets: props.horizontal ? { bottom: 1, left: 1 } : { top: 1, right: 1 },
    ...props,
  };

  return createScrollable(props, ref, map);
});

export default Scrollable;
