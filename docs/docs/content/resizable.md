# Resizable

Used to create resizable containers.

## Import

```jsx
import { Resizable } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Resizable w={100} h={100}>
    <Box flex border bg="primary.light" w="100%" h="100%" />
</Resizable>
```

### Vertical

```jsx live
<Resizable vertical w={100} h={100}>
    <Box flex border bg="primary.light" w="100%" h="100%" />
</Resizable>
```

### Horizontal

```jsx live
<Resizable horizontal w={100} h={100}>
    <Box flex border bg="primary.light" w="100%" h="100%" />
</Resizable>
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`horizontal`**

➤ Type: **`boolean`** <br/>

---

### **`vertical`**

➤ Type: **`boolean`** <br/>

## Styles

### **`style`**
To the main element.
