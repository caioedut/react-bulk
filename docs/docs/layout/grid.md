# Grid

Used to create responsive containers. Checkout [Breakpoints](/docs/layout/breakpoints).

## Import

```jsx
import { Grid } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Grid>
  <Box>
    <Text border>Hello World!</Text>
  </Box>
  <Box>
    <Text border>Welcome!</Text>
  </Box>
</Grid>
```

### Size

```jsx live
<Grid size={12}>
  <Box xs={12} sm={6} md={4} lg={3} xl={2}>
    <Text border>Hello World!</Text>
  </Box>
  <Box xs={12} sm={6} md={4} lg={3} xl={2}>
    <Text border>Welcome!</Text>
  </Box>
</Grid>
```

### Spacing

```jsx live
<Grid size={3} gap={4}>
  <Box>
    <Text border>Hello World!</Text>
  </Box>
  <Box>
    <Text border>Welcome!</Text>
  </Box>
</Grid>
```

### Auto/Flex Item

```jsx live
<Grid size={3}>
  <Box xs={1} md="auto">
    <Text border>Hello World!</Text>
  </Box>
  <Box xs={2} md="flex">
    <Text border>Welcome!</Text>
  </Box>
</Grid>
```

## Breakpoints

It is recommended to use the [`Box`](/docs/core/box) as a child.

All [breakpoints](/docs/layout/breakpoints) are avalilable as prop of the children.

Default breakpoints: **`xs` `sm` `md` `lg` `xl` `xxl`**

- `number`: number of columns that the item will fill.
- `'auto'`: the size will be calculated with the item content.
- `'flex'` or `true`: item will grow or shrink to fit the space available in its container.
- `'hide'` or `false`: hides the item.

➤ Type: **`number` `boolean` `'auto'` `'flex'` `'hide'`** <br/>
➤ Default: **`'auto'`** <br/>

---

## Props

Extends all [`Box`](/docs/core/box#props) props.

**`breakpoints`**

An option to override [Layout Breakpoints](/docs/layout/breakpoints/#default) for a single `Grid`.

➤ Type: **`object`** <br/>

```js
{
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}
```

---

**`direction`**

➤ Type: **`'row'` `'column'` `'row-reverse'` `'column-reverse'`** <br/>
➤ Default: **`'row'`** <br/>

---

**`gap`**

Spacing (horizontal and vertical) between children. The set value will be multiplied by the `theme.shape.spacing` value.

➤ Type: **`number`** <br/>
➤ Default: **`theme.shape.gap`** <br/>

---

**`size`**

Number of columns.

➤ Type: **`number`** <br/>
➤ Default: **`12`** <br/>

---

## Styles

**`style`** to the main element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

---
