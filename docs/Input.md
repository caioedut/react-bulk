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

### `defaultValue`

Provides an initial value that will change when the user starts typing. Useful for use-cases where you do not want to deal with listening to
events and updating the value prop to keep the controlled state in sync.

| Type     |
|----------|
| `string` |

---

### `maxLength`

Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.

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

| Type     |
|----------|
| `string` |

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

[‹ Go Back](README.md)
