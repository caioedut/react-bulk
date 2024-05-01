import Platform from '../Platform';
import get from '../props/get';
import omit from '../props/omit';

export default function base(event, extra?: Record<PropertyKey, unknown>) {
  const nativeEvent = event.nativeEvent ?? event;
  const target = get('target', nativeEvent, event) ?? null;

  return {
    type: get<string>('type', nativeEvent, event) ?? 'custom',
    handler: 'RbkEvent',

    // Extra
    ...(extra ?? {}),

    target,
    currentTarget: get('currentTarget', nativeEvent, event) ?? target,
    timestamp: Date.now(),
    nativeEvent: Platform.native ? omit('nativeEvent', event) : nativeEvent,
    preventDefault: get<() => void>('preventDefault', nativeEvent, event) ?? (() => void 0),
    stopPropagation: get<() => void>('stopPropagation', nativeEvent, event) ?? (() => void 0),
  };
}
