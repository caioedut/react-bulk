# Scrollable

Easiest way to create a scrollable container, vertical or horizontal.

## Import

```jsx
import { Scrollable } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Grid row center gap={3}>
  <Box>
    <Text>Vertical</Text>
    <Scrollable h={160} w={160}>
      <Box bg="secondary" h={320} w={160} />
    </Scrollable>
  </Box>
  <Box>
    <Text>Horizontal</Text>
    <Scrollable h={160} w={160} direction="horizontal">
      <Box bg="secondary" h={160} w={320} />
    </Scrollable>
  </Box>
</Grid>
```

## Props

**`contentInset`**

Add padding into content element. The set value will be multiplied by the `theme.shape.spacing`.

➤ Type: **`number`** <br/>

---

**`direction`**

➤ Type: **`'vertical'` `'horizontal'`** <br/>

---

**`hideScrollBar`**

➤ Type: **`boolean`** <br/>

---

**`pagingEnabled`**

When true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination.

:::note
Vertical pagination is not supported on Android.
:::

➤ Type: **`boolean`** <br/>

---
