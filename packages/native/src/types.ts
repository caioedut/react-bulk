import { ReactElement } from 'react';
import { AccessibilityActionEvent, GestureResponderEvent, LayoutChangeEvent, RefreshControlProps } from 'react-native';

import { ScrollableProps } from '@react-bulk/core';

export type NativeBindingProps = {
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
  onAccessibilityAction?: ((event: AccessibilityActionEvent) => void) | undefined;
  onAccessibilityTap?: (() => void) | undefined;
  onMoveShouldSetResponder?: ((event: GestureResponderEvent) => boolean) | undefined;
  onMoveShouldSetResponderCapture?: ((event: GestureResponderEvent) => boolean) | undefined;
  onResponderGrant?: ((event: GestureResponderEvent) => void) | undefined;
  onResponderMove?: ((event: GestureResponderEvent) => void) | undefined;
  onResponderReject?: ((event: GestureResponderEvent) => void) | undefined;
  onResponderRelease?: ((event: GestureResponderEvent) => void) | undefined;
  onResponderTerminate?: ((event: GestureResponderEvent) => void) | undefined;
  onResponderTerminationRequest?: ((event: GestureResponderEvent) => boolean) | undefined;
  onStartShouldSetResponderCapture?: ((event: GestureResponderEvent) => boolean) | undefined;
};

export type NativeScrollableProps = ScrollableProps & {
  onRefresh?: () => void;
  refreshing?: boolean;
  refreshControl?: ReactElement<RefreshControlProps>;

  /** @deprecated use direction instead */
  horizontal?: boolean;
};
