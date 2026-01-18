# RbkEvent

Dispatched by these listeners:

`onFocus` `onBlur` `onChange` `onScroll`

## Type

```ts title="RbkEvent"
type RbkEvent<EventType = any, TargetType = any> = {
  handler: 'RbkEvent';
  target: TargetType;
  currentTarget: TargetType;
  timestamp: number;
  nativeEvent: EventType;
  preventDefault: () => void;
  stopPropagation: () => void;
}
```

## See also:

- [RbkPointerEvent](/docs/type-reference/rbk-pointer-event)
- [RbkKeyboardEvent](/docs/type-reference/rbk-keyboard-event)
- [RbkScrollEvent](/docs/type-reference/rbk-scroll-event)
