import { ScrollableProps } from '../types';
import Platform from './Platform';
import { useTheme } from './ReactBulk';

export default function createScrollable({ horizontal, style, ...props }: ScrollableProps | any, ref: any, map: any) {
  const theme = useTheme();

  const { web, native } = Platform;
  const { Box, ScrollView } = map;

  const styleX = [
    {
      flex: 1,
    },

    web && horizontal && { overflowX: 'auto' },

    web && !horizontal && { overflowY: 'auto' },

    web && { scrollBehavior: 'smooth' },

    style,
  ];

  if (native) {
    props = {
      indicatorStyle: theme.mode === 'dark' ? 'white' : 'black',
      keyboardDismissMode: 'on-drag',
      keyboardShouldPersistTaps: 'always',
      nestedScrollEnabled: true,
      pinchGestureEnabled: false,
      scrollIndicatorInsets: horizontal ? { bottom: 1, left: 1 } : { top: 1, right: 1 },
      ...props,
    };
  }

  return <Box ref={ref} component={ScrollView} {...props} style={styleX} />;
}
