# Input

Used to create interactive controls for forms to accept user data.

```jsx live
<Input label="Full Name" placeholder="Enter your full name" />
```

## Examples

### Basic

```jsx live
function Home () {
  return (
    <Grid column center gap={3}>
      <Box w={400}>
        <Input placeholder="Default" />
      </Box>
      <Box w={400}>
        <Input placeholder="Secure" secure />
      </Box>
      <Box w={400}>
        <Input placeholder="Read Only" readOnly />
      </Box>
      <Box w={400}>
        <Input placeholder="Disabled" disabled />
      </Box>
    </Grid>
  )
}
```

### Sizes

```jsx live
<Grid column center gap={3}>
  <Box w={400}>
    <Input size="xsmall" placeholder="Input (xsmall)" />
  </Box>
  <Box w={400}>
    <Input size="small" placeholder="Input (small)" />
  </Box>
  <Box w={400}>
    <Input size="medium" placeholder="Input (medium)"/>
  </Box>
  <Box w={400}>
    <Input size="large" placeholder="Input (large)"/>
  </Box>
  <Box w={400}>
    <Input size="xlarge" placeholder="Input (xlarge)"/>
  </Box>
</Grid>
```

### Error

```jsx live
<Input placeholder="Full Name" error="Please enter your full name." />
```

### Addons

```jsx live
function Home () {

  const CustomIcon = () => <Text>👁</Text>

  return (
    <Grid column center gap={3}>
      <Box w={400}>
        <Input placeholder="Username" startIcon="👤" />
      </Box>
      <Box w={400}>
        <Input placeholder="Password" endIcon={<CustomIcon/>} />
      </Box>
      <Box w={400}>
        <Input placeholder="reactbulk" startIcon="https://" endIcon=".com" />
      </Box>
    </Grid>
  )
}
```

## Props

Extends all [`Box`](/docs/components/core/box) props.

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

**`defaultValue`**

Provides an initial value that will change when the user starts typing. Useful for use-cases where you do not want to deal with listening to
events and updating the value prop to keep the controlled state in sync.

➤ Type: **`string` `number`** <br/>

---

**`disabled`**

➤ Type: **`boolean`** <br/>

---

**`endIcon`**

➤ Type: **`string` `ReactNode`** <br/>

---

**`label`**

To use as prop instead of children.

➤ Type: **`string` `ReactNode`** <br/>

---

**`mask`**

➤ Type: **`Function(value: string) => string`** <br/>

---

**`maxLength`**

Limits the maximum number of characters that can be entered. Use this instead of implementing the logic in JS to avoid flicker.

➤ Type: **`number`** <br/>

---

**`multiline`**

If `true`, the text input can be multiple lines.

➤ Type: **`number`** <br/>

---

**`name`**

➤ Type: **`string`** <br/>

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

**`startIcon`**

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

**`containerStyle`** to the outer wrapper.

**`errorStyle`** to the error element when has [`error`](#error) prop.

**`inputStyle`** to the input element.

**`style`** to the inner wrapper.

➤ Type: **`RbkStyle`** <br/>

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
