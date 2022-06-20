import { useTheme } from './ReactBulk';
import { DividerProps } from './types';

export default function createDivider({ color, size, opacity, vertical, style, ...rest }: DividerProps | any, ref: any, map: any) {
  const { Box } = map;

  const theme = useTheme();

  style = [
    {
      backgroundColor: color ?? theme.colors.text.secondary,
      opacity: opacity ?? 0.25,
    },

    vertical && { width: size ?? 1, height: '100%' },

    !vertical && { height: size ?? 1 },

    style,
  ];

  return <Box {...rest} ref={ref} style={style} />;
}
