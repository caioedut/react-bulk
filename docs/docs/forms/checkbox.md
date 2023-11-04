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

Extends all [`Box`](/docs/core/box#props) props.

**`controlled`**

➤ Type: **`boolean`** <br/>

---

**`disabled`**

➤ Type: **`boolean`** <br/>

---

**`label`**

➤ Type: **`string`** <br/>

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

**`style`** to the outer wrapper.

**`buttonStyle`** to the button element.

**`labelStyle`** to the label element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

---

## Events

**`onBlur`**

➤ Type: **`Function(RbkCheckboxEvent)`** <br/>

---

**`onChange`**

➤ Type: **`Function(RbkCheckboxEvent)`** <br/>

---

**`onFocus`**

➤ Type: **`Function(RbkCheckboxEvent)`** <br/>

---

**`onFormChange`**

Combined with [Form](/docs/forms/form), triggers every time when form data changes.
Eg.: [Input](/docs/forms/input), [Select](/docs/forms/select), [Checkbox](/docs/forms/checkbox).

➤ Type: **`Function(RbkFormEvent)`** <br/>

---

