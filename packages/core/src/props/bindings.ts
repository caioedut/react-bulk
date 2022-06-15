import Platform from '../Platform';

export default function ({ ...props }: any) {
  const { web, native } = Platform;

  if (web) {
    if (props.onPress) {
      props.onClick = props.onPress;
    }

    if (props.onPressIn) {
      props.onMouseDown = props.onPressIn;
    }

    if (props.onPressOut) {
      props.onMouseUp = props.onPressOut;
    }

    delete props.onPress;
    delete props.onPressIn;
    delete props.onPressOut;
  }

  if (native) {
    if (props.onClick) {
      props.onPress = props.onClick;
    }

    if (props.onChange) {
      props.onChangeText = props.onChange;
    }

    delete props.onClick;
    delete props.onChange;
  }

  return props;
}
