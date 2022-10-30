# Checkbox

The checkbox is shown as a square box that is ticked (checked) when activated.

## Import

```jsx
import { Checkbox } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Grid column>
  <Checkbox />
  <Checkbox unique />
</Grid>
```

### Composition

```jsx live
<>
  <Grid gap={3}>
    <Checkbox label="Checkbox" />
    <Checkbox label="Radio" unique />
  </Grid>
  <Grid gap={3}>
    <Checkbox label="Checked" checked />
    <Checkbox label="Checked" unique checked />
  </Grid>
  <Grid gap={3}>
    <Checkbox label="Disabled" disabled />
    <Checkbox label="Disabled" unique disabled />
  </Grid>
  <Grid gap={3}>
    <Checkbox label="Read Only" readOnly />
    <Checkbox label="Read Only" unique readOnly />
  </Grid>
</>
```

## Props

Extends all [`Box`](/docs/components/core/box) props.

**`disabled`**

➤ Type: **`boolean`** <br/>

---

**`label`**

To use as prop instead of children.

➤ Type: **`string` `ReactNode`** <br/>

---

**`name`**

➤ Type: **`string`** <br/>

---

**`readOnly`**

➤ Type: **`boolean`** <br/>

---

**`size`**

➤ Type: **`'xsmall'` `'small'` `'medium'` `'large'` `'xlarge'`** <br/>
➤ Default: **`'medium'`** <br/>

---

**`unique`**

If `true`, renders a radion button.

➤ Type: **`boolean`** <br/>

---

## Styles

**`buttonStyle`** to the button element.

**`labelStyle`** to the label element.

**`style`** to the outer wrapper.

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

