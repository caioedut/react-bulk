# Select

Used to create a selectable drop-down list.

## Import

```jsx
import { Select } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Box maxw={400}>
  <Select
    label="Theme"
    placeholder="Select a theme"
    options={[
      {value: 1, label: 'Light'},
      {value: 2, label: 'Dark'},
    ]}
  />
</Box>
```

### Sizes

```jsx live
<Grid column gap={3} maxw={400}>
  <Select size="xsmall" placeholder="Select (xsmall)"  options={[{value: 1, label: 'Option 1'}]} />
  <Select size="small" placeholder="Select (small)" options={[{value: 1, label: 'Option 1'}]} />
  <Select size="medium" placeholder="Select (medium)" options={[{value: 1, label: 'Option 1'}]}/>
  <Select size="large" placeholder="Select (large)" options={[{value: 1, label: 'Option 1'}]}/>
  <Select size="xlarge" placeholder="Select (xlarge)" options={[{value: 1, label: 'Option 1'}]}/>
</Grid>
```

### Error

```jsx live
<Box maxw={400}>
  <Select
    error="Please select a theme."
    options={[
      {value: 1, label: 'Light'},
      {value: 2, label: 'Dark'},
    ]}
  />
</Box>
```

### Addons

```jsx live
<Box maxw={400}>
  <Select placeholder="Username" icon="👤" />
</Box>
```

## Props

Extends all [`Box`](/docs/components/core/box#props) props.

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

**`error`**

➤ Type: **`string`** <br/>

---

**`label`**

To use as prop instead of children.

➤ Type: **`string` `ReactNode`** <br/>

---

**`loading`**

➤ Type: **`boolean`** <br/>

---

**`name`**

➤ Type: **`string`** <br/>

---

**`options`**

➤ Type: **`Array<RbkSelectOption>`** <br/>

```jsx title="RbkSelectOption"
{
  value: string | number
  label: string
  disabled?: boolean
}
```

---

**`placeholder`**

The string that will be rendered before text input has been entered.

➤ Type: **`string`** <br/>

---

**`readOnly`**

➤ Type: **`boolean`** <br/>

---

**`size`**

➤ Type: **`'xsmall'` `'small'` `'medium'` `'large'` `'xlarge'`** <br/>
➤ Default: **`'medium'`** <br/>

---

**`startIcon`**

➤ Type: **`string` `ReactNode`** <br/>

---

**`value`**

➤ Type: **`string` `number`** <br/>

---

## Styles

**`style`** to the outer wrapper.

**`buttonStyle`** to the button element.

**`errorStyle`** to the error element when has [`error`](#error) prop.

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
