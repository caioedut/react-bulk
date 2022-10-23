---
sidebar_position: 1
---

# Breakpoints

Commonly used with [Grid](../layout/grid).

## Default

| Alias:     | xs       | sm          | md          | lg          | xl           | xxl         |
|------------|----------|-------------|-------------|-------------|--------------|-------------|
| Min Width: | `0` (px) | `576` (px)  | `768` (px)  | `992` (px)  | `1200` (px)  | `1400` (px) |

## Custom

[Read more about Theme](../layout/theme).

```jsx
const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
};
```

## Usage

### Grid

See [Grid](../layout/grid.md)

### Components

```jsx
import { Button } from '@react-bulk/web' // or @react-bulk/native;

export default function Home() {
  return (
    <>
      <Button style={{ display: 'none', xs: { display: 'flex' } }}>
        Visible on XS or higher
      </Button>
      <Button style={{ display: 'none', sm: { display: 'flex' } }}>
        Visible on SM or higher
      </Button>
      <Button style={{ display: 'none', md: { display: 'flex' } }}>
        Visible on MD or higher
      </Button>
      <Button style={{ display: 'none', lg: { display: 'flex' } }}>
        Visible on LG or higher
      </Button>
      <Button style={{ display: 'none', xl: { display: 'flex' } }}>
        Visible on XL or higher
      </Button>
      <Button style={{ display: 'none', xxl: { display: 'flex' } }}>
        Visible on XXL or higher
      </Button>
    </>
  );
}
```
