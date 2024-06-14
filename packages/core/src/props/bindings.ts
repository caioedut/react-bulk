import Platform from '../Platform';
import base from '../events/base';
import keyboard from '../events/keyboard';
import pointer from '../events/pointer';
import scroll from '../events/scroll';

export default function ({ ...props }: any) {
  const { web, native } = Platform;

  const mapping = {
    common: [['onFocus'], ['onBlur'], ['onChange']],
    keyboard: [['onKeyPress'], ['onKeyDown'], ['onKeyUp']],
    pointer: [['onClick', 'onPress'], ['onMouseDown', 'onPressIn'], ['onMouseUp', 'onPressOut'], ['onLongPress']],
    scroll: [['onScroll']],
  } as const;

  for (const handler in mapping) {
    for (const events of mapping[handler]) {
      const webEventName = events[0];
      const nativeEventName = events[1] ?? events[0];

      for (const eventName of events) {
        const callback = props[eventName];
        delete props[eventName];

        if (!callback) {
          continue;
        }

        const callbackHandled = (event) =>
          handler === 'pointer'
            ? callback(pointer(event))
            : handler === 'keyboard'
              ? callback(keyboard(event))
              : handler === 'scroll'
                ? callback(scroll(event))
                : callback(base(event));

        if (web) {
          props[webEventName] = callbackHandled;
        }

        if (native) {
          props[nativeEventName] = callbackHandled;
        }
      }
    }
  }

  // Disables interaction with Keyboard and Pointer events
  if (props.disabled) {
    [...mapping.keyboard, ...mapping.pointer].flat().forEach((eventName) => {
      delete props[eventName];
    });
  }

  return props;
}
