# Divider

Used to display a thin line and divide contents.

## Import

```jsx
import { Divider } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<>
  <Divider my={3} />
  <Divider my={3} color="error" opacity={0.5} />
  <Divider my={3} color="primary" opacity={1} />
</>
```

### Sizes

```jsx live
<>
  <Divider my={3} />
  <Divider my={3} size={2} />
  <Divider my={3} size={3} />
  <Divider my={3} size={4} />
  <Divider my={3} size={5} />
</>
```

### Vertical

```jsx live
<Box row center>
  <Text>Home</Text>
  <Divider mx={3} vertical />
  <Text>About</Text>
  <Divider mx={3} color="error" opacity={0.5} vertical />
  <Text>Join Us</Text>
  <Divider mx={3} color="primary" opacity={1} vertical />
  <Text>Help</Text>
</Box>
```

## Props

Extends all [`Box`](/docs/components/core/box#props) props.

**`color`**

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`text.primary`**

---

**`opacity`**

Value between 0 and 1.

➤ Type: **`number`** <br/>
➤ Default: **`0.15`**

---

**`size`**

➤ Type: **`number`** <br/>
➤ Default: **`1`**

---

**`vertical`**

➤ Type: **`boolean`** <br/>

---

## Styles

**`style`** to the main element.

➤ Type: **[`RbkStyles`](/docs/type-reference/rbk-styles)** <br/>

---
