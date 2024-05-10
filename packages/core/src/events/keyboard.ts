import get from '../props/get';
import { RbkKeyboardEvent } from '../types';
import base from './base';

export default function keyboard(event, extra?: Record<PropertyKey, unknown>): RbkKeyboardEvent {
  const nativeEvent = event.nativeEvent ?? event;

  const props = {
    handler: 'RbkKeyboardEvent',
    key: get<string>('key', nativeEvent, event)!,
    code: get<string>('code', nativeEvent, event)!,
    keyCode: get<number>('keyCode', nativeEvent, event)! ?? get<number>('which', nativeEvent, event)!,
    altKey: get<boolean>('altKey', nativeEvent, event)!,
    ctrlKey: get<boolean>('ctrlKey', nativeEvent, event)!,
    metaKey: get<boolean>('metaKey', nativeEvent, event)!,
    shiftKey: get<boolean>('shiftKey', nativeEvent, event)!,

    // Extra
    ...(extra ?? {}),
  };

  // @ts-expect-error
  return base(event, props);
}
