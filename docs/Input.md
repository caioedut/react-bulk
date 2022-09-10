[‹ Go Back](README.md)

# Input

A extensible text input component.

## Props

Extends all [`Box`](Box.md) properties.

### `autoCapitalize`

Automatically capitalize certain characters.

- `none`: don't auto capitalize anything.
- `sentences`: first letter of each sentence.
- `words`: first letter of each word.
- `characters`: all characters.

| Type                                                  | Default        |
|-------------------------------------------------------|----------------|
| `enum('none' , 'sentences' , 'words' , 'characters')` | `'sentences'`  |

---

### `autoCorrect`

| Type      | Default |
|-----------|---------|
| `boolean` | `true`  |

---

### `autoFocus`

If `true`, focuses the input on `componentDidMount` or `useEffect`.

| Type      |
|-----------|
| `boolean` |

---

### `caretHidden`

| Type      |
|-----------|
| `boolean` |

---

### `color`

| Type     | Default     |
|----------|-------------|
| `string` | `'primary'` |

---

### `containerStyle`

| Type              |
|-------------------|
| `object`, `array` |

---

### `defaultValue`

Provides an initial value that will change when the user starts typing. Useful for use-cases where you do not want to deal with listening to
events and updating the value prop to keep the controlled state in sync.

| Type     |
|----------|
| `string` |

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

### `inputStyle`

| Type              |
|-------------------|
| `object`, `array` |

---

### `label`

| Type                  |
|-----------------------|
| `string`, `ReactNode` |

---

### `labelStyle`

| Type              |
|-------------------|
| `object`, `array` |

---

### `maxLength`

Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.

| Type     |
|----------|
| `number` |

---

### `multiline`

If `true`, the text input can be multiple lines.

| Type     |
|----------|
| `number` |

---

### `name`

| Type     |
|----------|
| `string` |

---

### `placeholder`

The string that will be rendered before text input has been entered.

| Type     |
|----------|
| `string` |

---

### `readOnly`

If `true`, text is not editable.

| Type      |
|-----------|
| `boolean` |

---

### `returnKeyType`

Determines how the return key should look.

| Type                                                      | Default     |
|-----------------------------------------------------------|-------------|
| `enum('default', 'done', 'go', 'next', 'search', 'send')` | `'default'` |

---

### `secure`

If `true`, the text input obscures the text entered so that sensitive text like passwords stay secure.

| Type      |
|-----------|
| `boolean` |

---

### `selectionColor`

The highlight and cursor color of the text input.

| Type     | Default  |
|----------|----------|
| `string` | `'text'` |

---

### `size`

| Type                                         | Default  |
|----------------------------------------------|----------|
| `enum('small', 'medium', 'large', 'xlarge')` | `medium` |

---

### `startIcon`

Shows an icon before the text. See more in [Icon](Icon.md).

| Type                  |
|-----------------------|
| `string`, `ReactNode` |

---

### `type`

Determines which keyboard to open.

| Type                                              | Default  |
|---------------------------------------------------|----------|
| `enum('text', 'number', 'email', 'phone', 'url')` | `'text'` |

---

### `value`

The value to show for the text input.

| Type     |
|----------|
| `string` |

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

### `onChange`

| Type                     |
|--------------------------|
| `Function(event, value)` |

---

### `onFocus`

| Type              |
|-------------------|
| `Function(event)` |

---

[‹ Go Back](README.md)
