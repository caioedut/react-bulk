# RbkLayoutEvent

Dispatched by these listeners:

`onLayout`

Same data on web and native. On native it maps the React Native `onLayout` event; on web (which has no layout event) it is emulated with `ResizeObserver`.

:::note

On web, the event is triggered when the element or its parent is resized. A change of position alone (without any resize) does not trigger it.

:::

## RbkEvent Props

Inherits [RbkEvent](/docs/type-reference/rbk-event) props.

## Type

```ts title="RbkLayoutEvent"
type RbkLayoutEvent<EventType, TargetType> = RbkEvent<EventType, TargetType> &
{
  handler: 'RbkLayoutEvent';

  /**
   * The X position of the element, relative to its parent
   */
  x: number;

  /**
   * The Y position of the element, relative to its parent
   */
  y: number;

  width: number;
  height: number;
}
```

## Example

```jsx
<Box onLayout={(e) => console.log(e.x, e.y, e.width, e.height)} />
```

## See also:

- [RbkEvent](/docs/type-reference/rbk-event)
