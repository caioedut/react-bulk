import get from '../props/get';
import base from './base';

export default function pointer(event, extra?: Record<PropertyKey, unknown>) {
  const nativeEvent = event.nativeEvent ?? event;

  const touches = get<TouchList>('touches', nativeEvent, event) ?? null;

  const props = {
    handler: 'RbkPointerEvent',
    button: get<number>('button', nativeEvent, event, touches?.[0]) ?? 0,
    offsetX:
      get<number>('offsetX', nativeEvent, event, touches?.[0])! ??
      get<number>('locationX', nativeEvent, event, touches?.[0])!,
    offsetY:
      get<number>('offsetY', nativeEvent, event, touches?.[0])! ??
      get<number>('locationY', nativeEvent, event, touches?.[0])!,
    pageX: get<number>('pageX', nativeEvent, event, touches?.[0])!,
    pageY: get<number>('pageY', nativeEvent, event, touches?.[0])!,

    // Extra
    ...(extra ?? {}),

    // Touch
    touches,
  };

  return base(event, props);
}
