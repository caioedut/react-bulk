# Label

Used to create caption for an item in a user interface.

## Import

```jsx
import { Label } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Label>Full name</Label>
```

### Composition

```jsx live
<Grid column gap={3} maxw={400}>
  <Input label="Full name" />

  <Select
    label="Theme"
    options={[
      {value: 1, label: 'Light'},
      {value: 2, label: 'Dark'},
    ]}
  />

  <Checkbox label="Accept terms!" />
</Grid>
```

## Props

Extends all [`Text`](/docs/components/core/text) props.

**`for`**

➤ Type: **`string` `RefObject<ReactNode>`** <br/>

---

## Styles

**`style`** to the main element.

➤ Type: **[`RbkStyles`](/docs/type-reference/rbk-styles)** <br/>

---
