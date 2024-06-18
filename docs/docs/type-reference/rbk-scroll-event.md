# RbkScrollEvent

Dispatched by these listeners:

`onScroll`

## RbkEvent Props

Inherits [RbkEvent](/docs/type-reference/rbk-event) props.

## Type

```ts title="RbkScrollEvent"
type RbkScrollEvent<EventType, TargetType> = RbkEvent<EventType, TargetType> &
{
  handler: 'RbkScrollEvent';
  width: number;
  height: number;
  contentWidth: number;
  contentHeight: number;
  offsetX: number;
  offsetY: number;
  contentInset?: {
    top: RbkUnit;
    bottom: RbkUnit;
    left: RbkUnit;
    right: RbkUnit;
  };
}
```

## See also:

- [RbkEvent](/docs/type-reference/rbk-event)
