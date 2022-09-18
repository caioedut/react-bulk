[‹ Go Back](README.md)

# Button
A extensible button component.

### `component`

| Web               | Native             |
|-------------------|--------------------|
| `'button'`, `'a'` | `TouchableOpacity` |

---

## Props
Extends all [`Box`](Box.md) properties.

### `autoFocus`

If `true`, focuses the input on `componentDidMount` or `useEffect`.

| Type      |
|-----------|
| `boolean` |

---

### `badge`

| Type                              |
|-----------------------------------|
| `number`, [Badge Props](Badge.md) |

---

### `color`

| Type     | Default     |
|----------|-------------|
| `string` | `'primary'` |

---

### `contentStyle`

| Type              |
|-------------------|
| `object`, `array` |

---

### `disabled`

| Type      |
|-----------|
| `boolean` |

---

### `endIcon`

Shows an icon after the text. See more in [Icon](Icon.md).

| Type                  |
|-----------------------|
| `string`, `ReactNode` |

---

### `href`

For web only.

| Type     |
|----------|
| `string` |

---

### `icon`

Alias for `startIcon`.

| Type                             |
|----------------------------------|
| `string`, `ReactNode` |

---

### `loading`

| Type      |
|-----------|
| `boolean` |

---

### `label`

Render text label as child.

| Type     |
|----------|
| `string` |

---

### `labelStyle`

| Type              |
|-------------------|
| `object`, `array` |

---

### `rounded`

| Type      |
|-----------|
| `boolean` |

---

### `size`

| Type                                         | Default    |
|----------------------------------------------|------------|
| `enum('small', 'medium', 'large', 'xlarge')` | `'medium'` |

---

### `startIcon`

Shows an icon before the text. See more in [Icon](Icon.md).

| Type                  |
|-----------------------|
| `string`, `ReactNode` |

---

### `type`

| Type                     |
|--------------------------|
| enum(`button`, `submit`) |

---

### `variant`

| Type                               | Default   |
|------------------------------------|-----------|
| `enum('solid', 'outline', 'text')` | `'solid'` |

---

## Event Props

### `onBlur`

| Type              |
|-------------------|
| `Function(event)` |

---

### `onFocus`

| Type              |
|-------------------|
| `Function(event)` |

---

[‹ Go Back](README.md)
