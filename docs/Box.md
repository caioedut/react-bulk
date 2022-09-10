[‹ Go Back](README.md)

# Box

It is the primary component, factory for everything. All components extends the `Box`.

## Core Props

### `accessibility`

| Type                                                                                                                                                                                                                                                                                             |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `{ accessible: boolean, hint: string, label: string, role: enum('none', 'button', 'link', 'search', 'image', 'alert', 'checkbox', 'combobox', 'menu', 'menubar', 'menuitem', 'progressbar', 'radio', 'radiogroup', 'scrollbar', 'spinbutton', 'switch', 'tab', 'tablist', 'timer', 'toolbar') }` |

### `component`

Defines which element will be rendered.

| Type                  | Default (Web) | Default (Native) |
|-----------------------|---------------|------------------|
| `string`, `Component` | `'div'`       | `View`           |

---

### `className`

For web only.
<br/>
Defines the `class` attribute.

| Type     |
|----------|
| `string` |

---

### `noRootStyles`

Does not applies the box default styles (flexbox).

| Type      |
|-----------|
| `boolean` |

---

### `platform`

Apply props for a specific platform. For example:
```jsx
<Box
  platform={{
    web: { type: 'password' },
    native: { secureTextEntry: true },
  }}
/>
```

| Type                                                            |
|-----------------------------------------------------------------|
| `{ web: object, native: object, ios: object, android: object }` |

---

### `rawStyle`

**Web:** create inline styles.
<br/>
**Native:** priorize styles.

| Type              |
|-------------------|
| `object`, `array` |

---

### `style`

| Type              |
|-------------------|
| `object`, `array` |

---

## Flexbox Container Props

### `center`

Sets `justifyContent`, `justifyItems`, `alignContent` and `alignItems` styles to `center`.

| Type      |
|-----------|
| `boolean` |

---

### `column`

Sets `flexDirection` style to `column`.

| Type      |
|-----------|
| `boolean` |

---

### `direction`

Sets `flexDirection` style.

| Type                                                     | Default    |
|----------------------------------------------------------|------------|
| `enum('row', 'row-reverse', 'column', 'column-reverse')` | `'column'` |

---

### `noWrap`

Sets `flexWrap` style to `no-wrap`.

| Type      |
|-----------|
| `boolean` |

---

### `reverse`

Sets `flexDirection` style to `row-reverse` or `column-reverse`, combined with props `row` or `column`.

| Type      | Default |
|-----------|---------|
| `boolean` | `false` |

---

### `row`

Sets `flexDirection` style to `row`.

| Type      | Default |
|-----------|---------|
| `boolean` | `true`  |

---

### `wrap`

Sets `flexWrap` style. When `boolean`, the value will be `'wrap'`.

| Type                                                |
|-----------------------------------------------------|
| `boolean`, `enum('wrap', 'nowrap', 'wrap-reverse')` |

---

## Flexbox Child Props

### `align`

Sets `alignSelf` style.

| Type                                                  |
|-------------------------------------------------------|
| `enum('flex-start', 'flex-end', 'center', 'stretch')` |

---

### `basis`

Sets `flexBasis` style.

| Type                         |
|------------------------------|
| `'auto'`, `string`, `number` |

---

### `flex`

Sets `flex` style to `1`.

| Type      |
|-----------|
| `boolean` |

---

### `grow`

Sets `flexGrow` style.

| Type     |
|----------|
| `number` |

---

### `justify`

Sets `justifySelf` style.

| Type                                                                                                   |
|--------------------------------------------------------------------------------------------------------|
| `enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'stretch')` |

---

### `order`

Sets `order` style.

| Type     |
|----------|
| `number` |

---

### `shrink`

Sets `flexShrink` style.

| Type     |
|----------|
| `number` |

---

## Positioning and Spacing Props

Sets style as described below. Combinations are valid.
When `number` value, it will be multiplied by the `theme.shape.spacing` value.

`i` for `inset` (this one has no combinations).

`m` for `margin`
<br/>
`p` for `padding`

`t` for `top`
<br/>
`b` for `bottom`
<br/>
`l` for `left`
<br/>
`r` for `right`

`v` or `y` for `vertical` (combines only with `m` and `p`)
<br/>
`h` or `x` for `horizontal` (combines only with `m` and `p`)

Examples:

```jsx
<Box i={2} />     // inset: theme.shape.spacing * 2
<Box t={2} />     // top: theme.shape.spacing * 2
<Box m={2} />     // margin: theme.shape.spacing * 2
<Box ml={2} />    // marginLeft: theme.shape.spacing * 2
<Box mr="5%" />   // marginRight: '5%'
<Box p="2rem" />  // padding: theme.typography.fontSize * 2 (also works on native)
<Box pr="16px" /> // paddingRight: '16px'
<Box pv="16px" /> // paddingVertical: '16px' (on web, sets paddingTop and paddingBottom)
<Box ph="16px" /> // paddingHorizontal: '16px' (on web, sets paddingLeft and paddingRight)
```

| Type               |
|--------------------|
| `number`, `string` |

---

## Custom Style Props

### `bg`

Sets `backgroundColor` style.

| Type     |
|----------|
| `string` |

---

### `border`

Sets `borderWidth`, `borderStyle` and `borderColor` styles. For example:
```jsx
<Box border />
<Box border={2} />
<Box border="purple" />
<Box border="1px solid purple" />
```

| Type                          |
|-------------------------------|
| `string`, `number`, `boolean` |

---

### `corners`

Sets `borderRadius` style. The set value will be multiplied by the `theme.shame.borderRadius` value.

| Type     |
|----------|
| `number` |

---

### `h`

Sets `height` style.

| Type               |
|--------------------|
| `number`, `string` |

---

### `maxh`

Sets `maxHeight` style.

| Type               |
|--------------------|
| `number`, `string` |

---

### `maxw`

Sets `maxWidth` style.

| Type               |
|--------------------|
| `number`, `string` |

---

### `minh`

Sets `minHeight` style.

| Type               |
|--------------------|
| `number`, `string` |

---

### `minw`

Sets `minWidth` style.

| Type               |
|--------------------|
| `number`, `string` |

---

### `position`

Sets `position` style.

| Type                           |
|--------------------------------|
| `enum('relative', 'absolute')` |

---

### `w`

Sets `width` style.

| Type               |
|--------------------|
| `number`, `string` |

---

## Other Props

### `hidden`

Fully hide element

| Type      |
|-----------|
| `boolean` |

---

### `invisible`

Hides element but keeps its box sizes

| Type      |
|-----------|
| `boolean` |

---

## Event Props

### `onPress`

| Type              |
|-------------------|
| `Function(event)` |

---

### `onPressIn`

| Type              |
|-------------------|
| `Function(event)` |

---

### `onPressOut`

| Type              |
|-------------------|
| `Function(event)` |

---

[‹ Go Back](README.md)
