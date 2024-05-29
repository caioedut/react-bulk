# RbkPointerEvent

Dispatched by these listeners:

`onPress` `onPressIn` `onPressOut` `onLongPress`

## RbkEvent Props

Inherits [RbkEvent](/docs/type-reference/rbk-event) props.

## Type

```ts title="RbkPointerEvent"
type RbkPointerEvent<EventType, TargetType> = RbkEvent<EventType, TargetType> &
{
  handler: 'RbkPointerEvent';

  /**
   * The X position of the touch, relative to the element
   */
  offsetX: number;

  /**
   * The Y position of the touch, relative to the element
   */
  offsetY: number;

  /**
   * The X position of the touch, relative to the screen
   */
  pageX: number;

  /**
   * The Y position of the touch, relative to the screen
   */
  pageY: number;

  /**
   * All detected pointers (like touch and mouse)
   */
  touches: RbkTouch[];
}
```

## See also:

- [RbkEvent](/docs/type-reference/rbk-event)
- [RbkTouch](/docs/type-reference/rbk-touch)
