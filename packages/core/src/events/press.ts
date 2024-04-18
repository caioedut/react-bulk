import Platform from '../Platform';
import get from '../props/get';
import omit from '../props/omit';

export default function press(event) {
  const nativeEvent = event.nativeEvent ?? event;

  return {
    type: get('type', nativeEvent, event) ?? 'press',
    offsetX: get('offsetX', nativeEvent, event) ?? get('locationX', nativeEvent, event),
    offsetY: get('offsetY', nativeEvent, event) ?? get('locationY', nativeEvent, event),
    pageX: get('pageX', nativeEvent, event),
    pageY: get('pageY', nativeEvent, event),
    target: get('target', nativeEvent, event),
    timestamp: Date.now(),
    nativeEvent: Platform.native ? omit('nativeEvent', event) : nativeEvent,
    preventDefault: get('preventDefault', nativeEvent, event) ?? (() => void 0),
    stopPropagation: get('stopPropagation', nativeEvent, event) ?? (() => void 0),
  };
}
