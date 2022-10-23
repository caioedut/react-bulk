# Text

A extensible text component.

## Basic Usage

```jsx
import { Text } from '@react-bulk/web' // or @react-bulk/native;

export default function Home() {
  return (
    <Text>Hello World!</Text>
  );
}
```

## Props

Extends all [`Box`](../core/box) properties.

### `bold`

Sets `fontWeight` style to `bold`.

| Type      |
|-----------|
| `boolean` |

---

### `color`

Sets `color` style.

| Type     | Default     |
|----------|-------------|
| `string` | `'primary'` |

---

### `center`

Sets `textAlign` style to `center`.

| Type      |
|-----------|
| `boolean` |

---

### `italic`

Sets `fontStyle` style to `italic`.

| Type      |
|-----------|
| `boolean` |

---

### `justify`

Sets `textAlign` style to `justify`.

| Type      |
|-----------|
| `boolean` |

---

### `left`

Sets `textAlign` style to `left`.

| Type      |
|-----------|
| `boolean` |

---

### `numberOfLines`

Sets the maximun lines of text.

| Type     |
|----------|
| `number` |

---

### `right`

Sets `textAlign` style to `right`.

| Type      |
|-----------|
| `boolean` |

---

### `smallCaps`

Sets `fontVariant` style to `small-caps`.

| Type      |
|-----------|
| `boolean` |

---

### `size`

Sets `fontSize` style. The set value will be multiplied by the `theme.typography.fontSize` value.

| Type     |
|----------|
| `number` |

---

### `transform`

Sets `textTransform` style.

| Type                                                              |
|-------------------------------------------------------------------|
| `enum('none', 'captalize', 'uppercase', lowercase', 'full-width)` |

---

### `variant`

| Type                                                                       |
|----------------------------------------------------------------------------|
| `enum('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'title', 'subtitle', 'caption')` |

---

### `weight`

Sets `fontWeight` style.

| Type                                                                                    |
|-----------------------------------------------------------------------------------------|
| `enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')` |

---
