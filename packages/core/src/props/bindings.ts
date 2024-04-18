import Platform from '../Platform';
import press from '../events/press';

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
      props.onClick = (event) => onPress(press(event));
    }

    if (onPressIn) {
      if (props.onPointerDown) {
        props.onMouseDown = (event) => onPressIn(press(event));
      } else {
        props.onPointerDown = (event) => onPressIn(press(event));
      }
    }

    if (onPressOut) {
      if (props.onPointerUp) {
        props.onMouseUp = (event) => onPressOut(press(event));
      } else {
        props.onPointerUp = (event) => onPressOut(press(event));
      }
    }
  }

  if (native) {
    if (onPress) {
      props.onPress = (event) => onPress(press(event));
    }

    if (onPressIn) {
      props.onPressIn = (event) => onPressIn(press(event));
    }

    if (onPressOut) {
      props.onPressOut = (event) => onPressOut(press(event));
    }

    if (onLongPress) {
      props.onLongPress = (event) => onLongPress(press(event));
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
