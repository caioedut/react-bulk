import { CardProps } from '../types';
import { useTheme } from './ThemeProvider';

export default function createCard({ style, ...rest }: any, ref: any, map: any) {
  const theme = useTheme();

  const { Box } = map;

  const styleX = [
    {
      backgroundColor: theme.colors.background.primary,
      borderRadius: theme.shape.borderRadius,
      padding: theme.rem(0.75),
    },
    style,
  ];

  return <Box {...rest} style={styleX} />;
}
