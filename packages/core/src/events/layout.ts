import { RbkLayoutEvent } from '../types';
import base from './base';

export default function layout(event, extra?: Record<PropertyKey, unknown>): RbkLayoutEvent {
  const layout = event.nativeEvent?.layout;

  const props = {
    type: 'layout',
    handler: 'RbkLayoutEvent',
    x: layout?.x ?? 0,
    y: layout?.y ?? 0,
    width: layout?.width ?? 0,
    height: layout?.height ?? 0,

    // Extra
    ...(extra ?? {}),
  };

  // @ts-expect-error
  return base(event, props);
}
