# RbkKeyboardEvent

Dispatched by these listeners:

`onKeyPress` `onKeyDown` `onKeyUp`

## RbkEvent Props

Inherits [RbkEvent](/docs/type-reference/rbk-event) props.

## Type

```ts title="RbkKeyboardEvent"
type RbkKeyboardEvent<EventType, TargetType> = RbkEvent<EventType, TargetType> &
{
  handler: 'RbkKeyboardEvent';
  key: string;
  code: string;
  keyCode: number;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}
```

## See also:

- [RbkEvent](/docs/type-reference/rbk-event)
