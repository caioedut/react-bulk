---
sidebar_position: 3
---

# Grid

Checkout [Breakpoints](../layout/breakpoints).

## Basic Usage

```jsx
import { Box, Grid } from '@react-bulk/web' // or @react-bulk/native;

export default function Home() {
  return (
    <Grid size={12}>
      <Box xs={12} md={6}>
        <Text>Hello World!</Text>
      </Box>
      <Box xs={12} md={6}>
        <Text>Welcome!</Text>
      </Box>
    </Grid>
  );
}
```

## Props

Extends all [`Box`](../core/box) properties.

### `gap`

Spacing (horizontal and vertical) between children. The set value will be multiplied by the `theme.typography.fontSize` value.

| Type     | Default |
|----------|---------|
| `number` | `0`     |

---

### `size`

Number of columns.

| Type     | Default |
|----------|---------|
| `number` | `12`    |
