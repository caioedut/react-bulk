import Platform from './Platform';
import { useTheme } from './ReactBulk';
import get from './props/get';
import remove from './props/remove';
import { InputProps } from './types';

export default function createText({ label, size, style, ...rest }: InputProps | any, ref: any, map: any) {
  const theme = useTheme();

  const { web, native } = Platform;
  const { Box, Text, Input, ios } = map;
  const { disabled } = rest;

  style = [
    {
      fontSize: theme.rem(1),
      lineHeight: 1.25,

      backgroundColor: theme.colors.background.primary,
      color: theme.colors.text.primary,

      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.primary.main,
      borderRadius: theme.shape.borderRadius,

      paddingVertical: theme.rem(0.5),
      paddingHorizontal: theme.rem(0.6),

      margin: 0,
      width: '100%',
    },

    size === 'small' && {
      fontSize: theme.rem(0.875),
      paddingVertical: theme.rem(0.5, theme.rem(0.875)),
      paddingHorizontal: theme.rem(0.6, theme.rem(0.875)),
    },

    size === 'large' && {
      fontSize: theme.rem(1.25),
      paddingVertical: theme.rem(0.5, theme.rem(1.25)),
      paddingHorizontal: theme.rem(0.6, theme.rem(1.25)),
    },

    disabled && {
      backgroundColor: theme.colors.background.secondary,
      borderColor: theme.colors.background.disabled,
      opacity: 0.75,
    },

    web && disabled && { cursor: 'not-allowed' },

    web && {
      fontFamily: 'inherit',
      transition: 'all 0.2s ease',

      '&:focus': {
        outline: 0,
        boxShadow: `0 0 0 0.2rem ${theme.hex2rgba(theme.colors.primary.main, 0.4)}`,
      },
    },

    style,
  ];

  if (native) {
    // Calculate full height (for iOS)
    const pt = get('paddingTop', style) ?? get('paddingVertical', style) ?? get('padding', style) ?? 0;
    const pb = get('paddingBottom', style) ?? get('paddingVertical', style) ?? get('padding', style) ?? 0;
    const bt = get('borderTopWidth', style) ?? get('borderWidth', style) ?? 0;
    const bb = get('borderBottomWidth', style) ?? get('borderWidth', style) ?? 0;
    const fs = get('fontSize', style);
    const lh = get('lineHeight', style);

    style.height = get('height', style) ?? pt + pb + bt + bb + fs * lh;

    if (ios) {
      remove('lineHeight', style);
    }
  }

  return (
    <>
      {Boolean(label) && <Text>{label}</Text>}
      <Box ref={ref} component={Input} {...rest} style={style} />
    </>
  );
}
