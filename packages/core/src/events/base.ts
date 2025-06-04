import Platform from '../Platform';
import get from '../props/get';
import { RbkEvent } from '../types';

export default function base(event, extra?: Record<PropertyKey, unknown>): RbkEvent {
  const { native } = Platform;

  const nativeEvent = event.nativeEvent ?? event;
  const originalTarget = get('target', nativeEvent, event) ?? null;
  const target = native ? { ...originalTarget, value: nativeEvent?.text } : originalTarget;

  return {
    type: get<string>('type', nativeEvent, event) ?? 'unknown',
    handler: 'RbkEvent',
    form: null,

    // Extra
    ...(extra ?? {}),

    target,
    currentTarget: get('currentTarget', nativeEvent, event) ?? target,
    timestamp: Date.now(),
    // TODO: check why
    // nativeEvent: Platform.native ? omit('nativeEvent', event) : nativeEvent,
    nativeEvent,
    preventDefault: () => {
      event?.preventDefault?.();
      nativeEvent?.preventDefault?.();
    },
    stopPropagation: () => {
      event?.stopPropagation?.();
      nativeEvent?.stopPropagation?.();
    },
  };
}
