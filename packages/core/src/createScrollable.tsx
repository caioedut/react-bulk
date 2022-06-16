import { ScrollableProps } from '../types';
import Platform from './Platform';

export default function createScrollable({ horizontal, style, ...props }: ScrollableProps | any, ref: any, map: any) {
  const { web, native } = Platform;
  const { Box, ScrollView } = map;

  const styleX = [
    { flex: 1 },

    web && horizontal && { overflowX: 'auto' },

    web && !horizontal && { overflowY: 'auto' },

    web && { scrollBehavior: 'smooth' },

    style,
  ];

  if (native) {
    props.horizontal = horizontal;
  }

  return <Box ref={ref} component={ScrollView} {...props} style={styleX} />;
}
