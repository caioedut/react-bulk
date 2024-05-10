import get from '../props/get';
import { RbkPointerEvent, RbkTouch } from '../types';
import base from './base';

export default function pointer(event, extra?: Record<PropertyKey, unknown>): RbkPointerEvent {
  const nativeEvent = event.nativeEvent ?? event;
  const targetRect = get('target', nativeEvent, event)?.getBoundingClientRect?.();

  const touches: RbkTouch[] = Array.from<any>(
    get('changedTouches', nativeEvent, event) ?? get('touches', nativeEvent, event) ?? [],
  ).map((touch) => ({
    identifier: touch?.identifier ?? 0,
    offsetX: targetRect
      ? touch.pageX - targetRect.left
      : get<number>('offsetX', touch)! ?? get<number>('locationX', touch)!,
    offsetY: targetRect
      ? touch.pageY - targetRect.top
      : get<number>('offsetY', touch)! ?? get<number>('locationY', touch)!,
    pageX: get<number>('pageX', touch)!,
    pageY: get<number>('pageY', touch)!,
  }));

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

  // @ts-expect-error
  return base(event, props);
}
