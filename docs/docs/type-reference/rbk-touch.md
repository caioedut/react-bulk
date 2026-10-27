# RbkTouch

A single touch point, available in the `touches` list of [RbkPointerEvent](/docs/type-reference/rbk-pointer-event).

Built from the event's changed touches (or its touches, when there are no changed ones). Mouse events have no touches, so the list is empty; use the event's own `offsetX`, `offsetY`, `pageX` and `pageY` instead.

## Type

```ts title="RbkTouch"
type RbkTouch = {
  /**
   * Unique id of the touch point while it stays on the screen
   */
  identifier: number;

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
}
```

## See also:

- [RbkPointerEvent](/docs/type-reference/rbk-pointer-event)
- [RbkEvent](/docs/type-reference/rbk-event)
