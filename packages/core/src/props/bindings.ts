import Platform from '../Platform';
import pointer from '../events/pointer';

export default function ({ ...props }: any) {
  const { web, native } = Platform;

  const onPress = props.onPress ?? props.onClick;
  const onPressIn = props.onPressIn ?? props.onMouseDown;
  const onPressOut = props.onPressOut ?? props.onMouseUp;
  const onLongPress = props.onLongPress;

  delete props.onPress;
  delete props.onClick;
  delete props.onPressIn;
  delete props.onPressOut;
  delete props.onMouseDown;
  delete props.onMouseUp;

  if (web) {
    if (onPress) {
      props.onClick = (event) => onPress(pointer(event));
    }

    if (onPressIn) {
      if (props.onPointerDown) {
        props.onMouseDown = (event) => onPressIn(pointer(event));
      } else {
        props.onPointerDown = (event) => onPressIn(pointer(event));
      }
    }

    if (onPressOut) {
      if (props.onPointerUp) {
        props.onMouseUp = (event) => onPressOut(pointer(event));
      } else {
        props.onPointerUp = (event) => onPressOut(pointer(event));
      }
    }
  }

  if (native) {
    if (onPress) {
      props.onPress = (event) => onPress(pointer(event));
    }

    if (onPressIn) {
      props.onPressIn = (event) => onPressIn(pointer(event));
    }

    if (onPressOut) {
      props.onPressOut = (event) => onPressOut(pointer(event));
    }

    if (onLongPress) {
      props.onLongPress = (event) => onLongPress(pointer(event));
    }
  }

  if (props.disabled) {
    delete props.onClick;
    delete props.onPress;
    delete props.onPressIn;
    delete props.onPressOut;
    delete props.onPointerDown;
    delete props.onPointerUp;
    delete props.onMouseDown;
    delete props.onMouseUp;
  }

  return props;
}
