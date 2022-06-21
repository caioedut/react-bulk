import Platform from './Platform';
import { ModalProps } from './types';

export default function createModal({ visible, align, onBackdropPress, children, style, ...rest }: ModalProps | any, ref: any, map: any) {
  const { web, native } = Platform;
  const { Box } = map;

  style = [
    {
      position: web ? 'fixed' : 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    align === 'top' && { alignItems: 'flex-start' },

    align === 'bottom' && { alignItems: 'flex-end' },

    web && {
      transition: 'opacity 0.2s ease',
      opacity: 0,
      visibility: 'hidden',
      zIndex: -1,
    },

    web &&
      visible && {
        opacity: 1,
        visibility: 'visible',
        zIndex: 900,
      },

    style,
  ];

  const containerProps: any = {};

  if (native) {
    containerProps.onStartShouldSetResponder = () => true;
    containerProps.onTouchEnd = (e) => e.stopPropagation();
  }

  return (
    <Box flexbox center {...rest} ref={ref} style={style} onPress={onBackdropPress}>
      <Box {...containerProps}>{children}</Box>
    </Box>
  );
}
