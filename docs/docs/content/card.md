# Card

Used to encapsulate the content and actions of a single subject.

`Card` just adds `backgroundColor: background.primary` and `padding: theme.rem(3)` into a `Box`.

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

### Composition

```jsx live
<Card maxw={240} mx="auto" border="1px solid background">
  <Text variant="caption" color="text.secondary">
    Lib of the Year
  </Text>
  <Text variant="title" bold>
    React Bulk
  </Text>
  <Box mx={-3} my={3}>
    <Image source="https://i.imgur.com/CmPhDqA.png" bg="background.secondary" w="100%" />
  </Box>
  <Text>
    Complete and uniform UI for React Web and Native
  </Text>
  <Button variant="outline" size="small" align="start" mt={3}>
    Learn More
  </Button>
</Card>
```

## Props

Extends all [`Box`](/docs/components/box#props) props.

**`corners`**

Sets `borderRadius` style. The set value will be multiplied by the `theme.shape.borderRadius` value.

➤ Type: **`number`** <br/>
➤ Default: **`2`** <br/>

---

## Styles

**`style`** to the main element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

---
