# Text

A extensible text component.

## Basic Usage

```jsx live
function Home() {
  return (
    <Grid gap={3} center>
      <Text bold>Hello World!</Text>
      <Text color="primary">Primary Color</Text>
      <Text color="secondary">Secondary Color</Text>
      <Text color="text.primary">Primary Text Color</Text>
      <Text color="text.secondary">Secondary Text Color</Text>
      <Text color="#ff0000">Hex Color</Text>
      <Text variant="title">Title</Text>
      <Text variant="subtitle">Subtitle</Text>
      <Text variant="caption">Caption</Text>
    </Grid>
  );
}
```

## Props

Extends all [`Box`](/docs/components/core/box) properties.

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
