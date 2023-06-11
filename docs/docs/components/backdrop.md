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
        <Text color="background">
          Children do not fire "Backdrop.onPress". Click on backdrop to close.
        </Text>
      </Backdrop>
    </>
  );
}
```

## Props

Extends all [`Box`](/docs/components/core/box#props) props.

**`visible`**

➤ Type: **`boolean`** <br/>

---

## Styles

**`style`** to the main element.

---

## Events

**`onPress`**

When the backdrop is pressed directly. Children do not fire it.

➤ Type: **`Function(RbkEvent)`** <br/>

---
