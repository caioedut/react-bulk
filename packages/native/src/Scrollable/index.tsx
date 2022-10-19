import { forwardRef } from 'react';
import { Platform, RefreshControl } from 'react-native';

import { ScrollableFactory, useTheme } from '@react-bulk/core';

import { NativeScrollableProps } from '../types';
import useMap from '../useMap';

function Scrollable({ refreshing, onRefresh, refreshControl, ...props }: NativeScrollableProps, ref) {
  const map = useMap();
  const theme = useTheme();

  // @ts-ignore
  const primaryColor = theme.colors.primary.main;

  if (!refreshControl && (onRefresh || refreshing)) {
    refreshControl = (
      <RefreshControl
        refreshing={refreshing as any}
        onRefresh={onRefresh}
        colors={[primaryColor]}
        tintColor={primaryColor}
        progressBackgroundColor={theme.colors.background.primary}
      />
    );
  }

  if (refreshControl) {
    // @ts-ignore
    props.refreshControl = refreshControl;
  }

  props = {
    // @ts-ignore
    contentInsetAdjustmentBehavior: 'scrollableAxes',
    endFillColor: primaryColor,
    indicatorStyle: theme.mode === 'dark' ? 'white' : 'black',
    keyboardDismissMode: Platform.OS === 'ios' ? 'interactive' : 'on-drag',
    keyboardShouldPersistTaps: 'always',
    nestedScrollEnabled: true,
    pinchGestureEnabled: false,
    scrollIndicatorInsets: props.horizontal ? { bottom: 1, left: 1 } : { top: 1, right: 1 },
    ...props,
  };

  return <ScrollableFactory ref={ref} {...props} map={map} />;
}

export default forwardRef<typeof Scrollable, NativeScrollableProps>(Scrollable);
