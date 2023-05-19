# Input

Used to create interactive controls for forms to accept user data.

## Import

```jsx
import { Input } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Grid column gap={3} maxw={400}>
  <Box>
    <Input label="Label" placeholder="Label + Input" />
  </Box>
  <Box>
    <Input placeholder="Default" />
  </Box>
  <Box>
    <Input placeholder="Secure" secure />
  </Box>
  <Box>
    <Input placeholder="Read Only" readOnly />
  </Box>
  <Box>
    <Input placeholder="Disabled" disabled />
  </Box>
</Grid>
```

### Sizes

```jsx live
<Grid column gap={3} maxw={400}>
  <Box>
    <Input size="xsmall" placeholder="Input (xsmall)" />
  </Box>
  <Box>
    <Input size="small" placeholder="Input (small)" />
  </Box>
  <Box>
    <Input size="medium" placeholder="Input (medium)"/>
  </Box>
  <Box>
    <Input size="large" placeholder="Input (large)"/>
  </Box>
  <Box>
    <Input size="xlarge" placeholder="Input (xlarge)"/>
  </Box>
</Grid>
```

### Error

```jsx live
<Box maxw={400}>
    <Input placeholder="Full Name" error="Please enter your full name." />
</Box>
```

### Addons

```jsx live
function Home () {

  const CustomIcon = () => <Text>👁</Text>

  return (
    <Grid column gap={3} maxw={400}>
      <Box>
        <Input placeholder="Username" startAddon="👤" />
      </Box>
      <Box>
        <Input placeholder="Password" endAddon={<CustomIcon/>} />
      </Box>
      <Box>
        <Input placeholder="reactbulk" startAddon="https://" endAddon=".com" />
      </Box>
    </Grid>
  )
}
```

## Props

Extends all [`Box`](/docs/components/core/box#props) props.

**`autoCapitalize`**

Automatically capitalize certain characters.

- `none`: don't auto capitalize anything.
- `sentences`: first letter of each sentence.
- `words`: first letter of each word.
- `characters`: all characters.

➤ Type: **`'none'` `'sentences'` `'words'` `'characters'`** <br/>
➤ Default: **`'none'`** <br/>

---

**`autoCorrect`**

➤ Type: **`boolean`** <br/>

---

**`autoFocus`**

If `true`, focuses the input on `componentDidMount` or `useEffect`.

➤ Type: **`boolean`** <br/>

---

**`caretHidden`**

➤ Type: **`boolean`** <br/>

---

**`color`**

➤ Type: **`boolean`** <br/>
➤ Default: **`'primary'`**

---

**`controlled`**

➤ Type: **`boolean`** <br/>

---

**`defaultValue`**

Provides an initial value that will change when the user starts typing. Useful for use-cases where you do not want to deal with listening to
events and updating the value prop to keep the controlled state in sync.

➤ Type: **`string` `number`** <br/>

---

**`disabled`**

➤ Type: **`boolean`** <br/>

---

**`endAddon`**

➤ Type: **`string` `ReactNode`** <br/>

---

**`error`**

➤ Type: **`string`** <br/>

---

**`label`**

To use as prop instead of children.

➤ Type: **`string` `ReactNode`** <br/>

---

**`mask`**

➤ Type: **`Function(value: string) => string`** <br/>

---

**`max`**

Combined with `type="number"`, limit the maximum number value.

➤ Type: **`number`** <br/>

---

**`maxLength`**

Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.

➤ Type: **`number`** <br/>

---

**`min`**

Combined with `type="number"`, defines the minimum number value.

➤ Type: **`number`** <br/>

---

**`multiline`**

If `true`, the text input can be multiple lines.

➤ Type: **`number`** <br/>

---

**`name`**

➤ Type: **`string`** <br/>

---

**`notNull`**

Final empty value will be empty string ("") or null depending on this prop.

➤ Type: **`bool`** <br/>

---

**`placeholder`**

The string that will be rendered before text input has been entered.

➤ Type: **`string`** <br/>

---

**`placeholderColor`**

➤ Type: **`string`** <br/>
➤ Default: **`'text.primary'`**

---

**`readOnly`**

If `true`, text is not editable.

➤ Type: **`boolean`** <br/>

---

**`returnKeyType`**

Determines how the return key should look.

➤ Type: **`'default'` `'done'` `'go'` `'next'` `'search'` `'send'`** <br/>
➤ Default: **`'default'`** <br/>

---

**`secure`**

If `true`, the text input obscures the text entered so that sensitive text like passwords stay secure.

➤ Type: **`boolean`** <br/>

---

**`selectionColor`**

The highlight and cursor color of the text input.

➤ Type: **`string`** <br/>
➤ Default: **`props.color`**

---

**`size`**

➤ Type: **`'xsmall'` `'small'` `'medium'` `'large'` `'xlarge'`** <br/>
➤ Default: **`'medium'`** <br/>

---

**`startAddon`**

➤ Type: **`string` `ReactNode`** <br/>

---

**`textColor`**

➤ Type: **`boolean`** <br/>
➤ Default: **`'text.primary'`**

---

**`type`**

Determines which keyboard to open.

➤ Type: **`'text'` `'number'` `'email'` `'phone'` `'url'`** <br/>
➤ Default: **`'text'`** <br/>

---

**`unmask`**

➤ Type: **`Function(value: string) => string`** <br/>

---

**`value`**

The value to show for the text input.

➤ Type: **`string`** <br/>

---

## Styles

**`style`** to the outer wrapper.

**`contentStyle`** to the inner wrapper.

**`errorStyle`** to the error element when has [`error`](#error) prop.

**`inputStyle`** to the input element.

**`labelStyle`** to the label element.

➤ Type: **[`RbkStyles`](/docs/type-reference/rbk-styles)** <br/>

---

## Events

**`onBlur`**

➤ Type: **`Function(RbkEvent)`** <br/>

---

**`onChange`**

➤ Type: **`Function(RbkEvent)`** <br/>

---

**`onFocus`**

➤ Type: **`Function(RbkEvent)`** <br/>

---

**`onFormChange`**

Combined with [Form](/docs/components/forms/form), triggers every time when form data changes.
Eg.: [Input](/docs/components/forms/input), [Select](/docs/components/forms/select), [Checkbox](/docs/components/forms/checkbox).

➤ Type: **`Function(RbkEvent)`** <br/>

---

