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
<Grid size={3} gap={6}>
  <Box xs={1}>
    <Text border>Hello World!</Text>
  </Box>
  <Box xs={1}>
    <Text border>Welcome!</Text>
  </Box>
</Grid>
```

## Props

Extends all [`Box`](/docs/components/core/box) props.

**`direction`**

➤ Type: **`'row'` `'column'` `'row-reverse'` `'column-reverse'`** <br/>
➤ Default: **`'row'`** <br/>

---

**`gap`**

Spacing (horizontal and vertical) between children. The set value will be multiplied by the `theme.typography.fontSize` value.

➤ Type: **`number`** <br/>

---

**`size`**

Number of columns.

➤ Type: **`number`** <br/>
➤ Default: **`12`** <br/>

---

## Styles

**`style`** to the main element.

**`child.itemStyle`** to the wrapper element of the item.

➤ Type: **`RbkStyle`** <br/>

---
