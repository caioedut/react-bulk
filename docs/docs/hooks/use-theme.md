# useTheme

Used to get and set the current theme definitions. [Read more about Theme](/docs/layout/theme).

## Import

```jsx
import { useTheme } from '@react-bulk/web'; // OR @react-bulk/native
```

## Usage

```jsx
export default function App() {
  const theme = useTheme();

  return (
    <Box h={theme.typography.fontSize} />
  );
}
```

## Methods

**`setTheme`**

Examples:

```jsx
const theme = useTheme();
theme.setTheme(theme.mode === 'light' ? 'dark' : 'light');
```

```jsx
const theme = useTheme();
theme.setTheme({
  colors: {
      primary: '#9c2c2c'
  }
});
```

➤ Type: **[`Theme`](/docs/layout/theme) `'light'` `'dark'`** <br/>

---
