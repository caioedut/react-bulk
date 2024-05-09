import Platform from '../Platform';
import get from '../props/get';
import omit from '../props/omit';

export default function base(event, extra?: Record<PropertyKey, unknown>) {
  const { native } = Platform;

  const nativeEvent = event.nativeEvent ?? event;
  const originalTarget = get('target', nativeEvent, event) ?? null;
  const target = native ? { ...originalTarget, value: nativeEvent?.text } : originalTarget;

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
