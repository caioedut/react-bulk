# Card

Used to encapsulate the content and actions of a single subject.

`Card` just adds `backgroundColor`, `borderRadius` and `padding` into a `Box`.

## Import

```jsx
import { Card } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Card>
  <Text>Hello World!</Text>
</Card>
```

### Elevation

Using prop `shadow`.

```jsx live
<Card shadow={2}>
  <Text>Hello World!</Text>
</Card>
```

### Composition

```jsx live
<Card shadow={2} maxw={240} mx="auto">
  <Text variant="caption" color="text.secondary">
    Lib of the Year ⭐
  </Text>
  <Text variant="title" bold>
    React Bulk
  </Text>
  <Box mx={-4} mt={4}>
    <Image source="https://i.imgur.com/HdIl3Ef.png" bg="background.secondary" w="100%" />
  </Box>
  <Text mt={4}>
    Complete and uniform UI for React Web and Native
  </Text>
  <Button variant="outline" align="start" mt={4}>
    Learn More!
  </Button>
</Card>
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`corners`**

Sets `borderRadius` style. The set value will be multiplied by the `theme.shape.borderRadius` value.

➤ Type: **`number`** <br/>
➤ Default: **`2`** <br/>

---

## Styles

### **`style`**
To the main element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

---
