import { RbkScrollEvent } from '../types';
import base from './base';

export default function scroll(event, extra?: Record<PropertyKey, unknown>): RbkScrollEvent {
  const props = {
    handler: 'RbkScrollEvent',
    width: event.target?.clientWidth ?? event.nativeEvent?.layoutMeasurement?.width,
    height: event.target?.clientHeight ?? event.nativeEvent?.layoutMeasurement?.height,
    contentWidth: event.target?.scrollWidth ?? event.nativeEvent?.contentSize?.width,
    contentHeight: event.target?.scrollHeight ?? event.nativeEvent?.contentSize?.height,
    offsetX: event.target?.scrollLeft ?? event.nativeEvent?.contentOffset?.x,
    offsetY: event.target?.scrollTop ?? event.nativeEvent?.contentOffset?.y,

    // Extra
    ...(extra ?? {}),
  };

  // @ts-expect-error
  return base(event, props);
}
