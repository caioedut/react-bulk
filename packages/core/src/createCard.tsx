import { useTheme } from './ReactBulk';
import { CardProps } from './types';

export default function createCard({ style, ...rest }: CardProps | any, ref: any, map: any) {
  const theme = useTheme();

  const { Box } = map;

  style = [
    {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.shape.borderRadius,
      p: 3,
    },
    style,
  ];

  return <Box {...rest} ref={ref} style={style} />;
}
