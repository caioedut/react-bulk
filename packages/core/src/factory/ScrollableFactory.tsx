import React, { Ref, forwardRef, memo, useMemo } from 'react';

import useTheme from '../hooks/useTheme';
import extract from '../props/extract';
import factory2 from '../props/factory2';
import { flexContainerProps } from '../styles/constants';
import jss from '../styles/jss';
import { Overwrite, ScrollableProps } from '../types';
import rbkGlobal from '../utils/global';
import BoxFactory from './BoxFactory';

function Component({ ref, children, ...props }: ScrollableProps, legacyRef: Ref<any>) {
  ref = ref || legacyRef;

  const theme = useTheme();
  const options = theme.components.Scrollable;
  const { web, native, ios, RefreshControl, ScrollView } = rbkGlobal.mapping;

  // Extends from default props
  let {
    contentInset: contentInsetProp,
    direction,
    hideScrollBar,
    pagingEnabled,
    // Refresh Control (Native)
    refreshControl,
    refreshing,
    onRefresh,
    // Styles
    variants,
    contentStyle,
    style,
    ...rest
  } = factory2<ScrollableProps>(props, options);

  const isHorizontal = direction === 'horizontal';
  const primaryColor = theme.color('primary');

  const contentInset = useMemo(
    () => ({
      // @ts-expect-error
      top: contentInsetProp?.top ?? contentInsetProp?.vertical ?? contentInsetProp ?? 0,
      // @ts-expect-error
      bottom: contentInsetProp?.bottom ?? contentInsetProp?.vertical ?? contentInsetProp ?? 0,
      // @ts-expect-error
      left: contentInsetProp?.left ?? contentInsetProp?.horizontal ?? contentInsetProp ?? 0,
      // @ts-expect-error
      right: contentInsetProp?.right ?? contentInsetProp?.horizontal ?? contentInsetProp ?? 0,
    }),
    [contentInsetProp],
  );

  contentStyle = [
    extract([...flexContainerProps], style),

    {
      pt: contentInset?.top,
      pb: contentInset?.bottom,
      pl: contentInset?.left,
      pr: contentInset?.right,
    },

    pagingEnabled && {
      web: {
        '&> *': { scrollSnapAlign: 'start' },
      },
    },

    contentStyle,
  ];

  style = [
    web &&
      pagingEnabled && {
        scrollSnapType: `${isHorizontal ? 'x' : 'y'} mandatory`,
      },

    style,
  ];

  if (native) {
    rest = {
      contentInsetAdjustmentBehavior: 'never',
      indicatorStyle: theme.mode === 'dark' ? 'white' : 'black',
      keyboardDismissMode: ios ? 'interactive' : 'on-drag',
      keyboardShouldPersistTaps: 'always',
      nestedScrollEnabled: true,
      pinchGestureEnabled: false,
      scrollEventThrottle: theme.rem(),
      scrollIndicatorInsets: isHorizontal ? { bottom: 1, left: 1 } : { top: 1, right: 1 },
      ...rest,
      pagingEnabled,
      horizontal: isHorizontal,
      contentContainerStyle: jss(variants.content, contentStyle),
    };

    if (hideScrollBar) {
      Object.assign(rest, {
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,
      });
    }

    if (!refreshControl && (onRefresh || refreshing)) {
      refreshControl = (
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[primaryColor]}
          tintColor={primaryColor}
          progressBackgroundColor={theme.color('background.primary')}
        />
      );
    }

    if (refreshControl) {
      rest.refreshControl = refreshControl;
    }
  }

  return (
    <BoxFactory
      ref={ref}
      component={ScrollView}
      style={style}
      variants={{ root: variants.root }}
      {...rest}
      noRootStyles
    >
      {native ? (
        children
      ) : (
        <BoxFactory style={contentStyle} variants={{ root: variants.content }} noRootStyles>
          {children}
        </BoxFactory>
      )}
    </BoxFactory>
  );
}

const Forwarded = forwardRef(Component) as <Props extends object = {}>(
  props: Overwrite<Props, ScrollableProps<false>> & ScrollableProps<true>,
) => ReturnType<typeof Component>;

const ScrollableFactory = memo(Forwarded) as typeof Forwarded;

// @ts-expect-error
ScrollableFactory.displayName = 'Scrollable';

export default ScrollableFactory;
