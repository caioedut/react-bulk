import { CardProps } from '../types';
import { useTheme } from './ReactBulk';

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

  return <Box ref={ref} {...rest} style={style} />;
}
