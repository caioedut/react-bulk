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

**`style`**

Resolves React Bulk styles (aliases, theme colors, spacing and `(theme) => value` functions) into a plain style object. Useful to style components that are not from React Bulk, like a native `View`.

Responsive keys (`xs`, `md`…) and nested CSS (`&:hover`) are not applied, use a React Bulk component for those.

```jsx
import { View } from 'react-native';

export default function App() {
  const theme = useTheme();

  return (
    <View style={theme.style({ bg: 'primary', p: 2, corners: 2 })} />
  );
}
```

➤ Type: **`...styles: RbkStyle[]`** <br/>
➤ Returns: **`object`** <br/>

---
