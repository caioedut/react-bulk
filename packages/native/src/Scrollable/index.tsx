import React, { forwardRef } from 'react';
import { RefreshControl, RefreshControlProps } from 'react-native';

import { createScrollable } from '@react-bulk/core';
import { ScrollableProps } from '@react-bulk/core/types';

import map from '../../map';

type ScrollablePropsNative = RefreshControlProps &
  ScrollableProps & {
    refreshing?: boolean;
    refreshControl?: any;
  };

const Scrollable = forwardRef(({ refreshing, onRefresh, refreshControl, ...props }: ScrollablePropsNative, ref) => {
  if (!refreshControl && (onRefresh || refreshing)) {
    refreshControl = <RefreshControl refreshing={refreshing as any} onRefresh={onRefresh} />;
  }

  if (refreshControl) {
    // @ts-ignore
    props.refreshControl = refreshControl;
  }

  return createScrollable(props, ref, map);
});

export default Scrollable;
