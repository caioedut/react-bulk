# Splitter

Used to create a group of resizable panels.

## Import

```jsx
import { Splitter } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Splitter>
    <Box width={360} minw={160} bg="primary" p={4}>
      <Text>Sidebar</Text>
    </Box>
    <Box flex bg="secondary" p={4}>
      <Text>Content</Text>
    </Box>
</Splitter>
```

### Vertical

```jsx live
<Splitter direction="vertical" height={480}>
    <Box height={100} bg="primary" p={4}>
      <Text>Top</Text>
    </Box>
    <Box flex bg="secondary" p={4}>
      <Text>Bottom</Text>
    </Box>
</Splitter>
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`direction`**

➤ Type: **`'vertical'` `'horizontal'`** <br/>
➤ Default: **`'horizontal'`** <br/>

## Styles

### **`style`**
To the main element.

## Theming

See [`Theme`](/docs/layout/theme#props).

```jsx
const theme = {
  components: {
    Splitter: {
      defaultProps: {
        direction: 'horizontal',
        /* ...props */
      },
      defaultStyles: {
        root: { /* ...styles */ },
        item: { /* ...styles */ },
      }
    }
  }
}
```
