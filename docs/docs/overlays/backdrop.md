# Backdrop

Backdrop is a box the size of the viewport which is rendered immediately beneath any element being presented in fullscreen mode.

## Import

```jsx
import { Backdrop } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
function Home() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>
        Show Backdrop
      </Button>
      <Backdrop visible={visible} onPress={() => setVisible(false)}>
        <Card>
          <Text center>
            Children do not fire "Backdrop.onPress".
          </Text>
          <Text center>
            Click on backdrop to close.
          </Text>
        </Card>
      </Backdrop>
    </>
  );
}
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`visible`**

➤ Type: **`boolean`** <br/>

## Styles

### **`style`**
To the main element.

## Events

### **`onPress`**

When the backdrop is pressed directly. Children do not fire it.

➤ Type: **[`Function(RbkPointerEvent)`](/docs/type-reference/rbk-pointer-event)** <br/>

---
