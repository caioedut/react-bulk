# GrowBox

A box that animates its width and height from zero to its content size whenever its children change.

## Import

```jsx
import { GrowBox } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
function App() {
  const [items, setItems] = useState(['Item 1']);

  return (
    <Box>
      <Box mb={2}>
        <Button onPress={() => setItems([...items, `Item ${items.length + 1}`])}>Add Item</Button>
      </Box>
      <GrowBox>
        <Card bg="background.secondary">
          {items.map((item) => (
            <Text key={item}>{item}</Text>
          ))}
        </Card>
      </GrowBox>
    </Box>
  );
}
```

### Duration

```jsx live
function App() {
  const [key, setKey] = useState(0);

  return (
    <Box>
      <Box mb={2}>
        <Button onPress={() => setKey(key + 1)}>Replay</Button>
      </Box>
      <GrowBox key={key} duration={1500}>
        <Card bg="background.secondary">
          <Text>Slowly growing content.</Text>
        </Card>
      </GrowBox>
    </Box>
  );
}
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`duration`**

Animation duration in milliseconds.

➤ Type: **`number`** <br/>

## Styles

### **`style`**
To the root element. Has `overflow: hidden` by default.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>
