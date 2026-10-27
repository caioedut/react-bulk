# RbkEvent

Dispatched by these listeners:

`onFocus` `onBlur` `onChange` `onScroll`

## Type

```ts title="RbkEvent"
type RbkEvent<EventType = any, TargetType = any> = {
  type: string;
  form: FormRef | null;
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
- [RbkLayoutEvent](/docs/type-reference/rbk-layout-event)
- [RbkScrollEvent](/docs/type-reference/rbk-scroll-event)
- [FormRef](/docs/forms/form#reference) (the `form` the element belongs to, or `null`)
