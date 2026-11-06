# Collapse

Used to show and hide some content.


## Import

```jsx
import { Collapse } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
function Home() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(!visible)}>
        Toggle Collapse
      </Button>
      <Collapse visible={visible} mt={3}>
        Collapse is amazing!
      </Collapse>
    </>
  )
}
```

### With trigger

Pass a `trigger` function. It receives `onPress`, which toggles the content, so you can attach it wherever you want. Collapse then manages its own open/closed state, and no state is needed.

```jsx live
function Home() {
  return (
    <Collapse trigger={({ onPress }) => <Button mb={3} onPress={onPress}>Toggle Collapse</Button>}>
      Collapse is amazing!
    </Collapse>
  )
}
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`visible`**

➤ Type: **`boolean`** <br/>
Controls visibility when `trigger` is not used. With `trigger`, it sets the initial state only.

### **`trigger`**

➤ Type: **`(options: { onPress: () => void; visible: boolean }) => ReactElement`** <br/>
Renders an element. Attach `onPress` to it (e.g. a `Button`) to toggle the content. `visible` is the current state, so you can change the trigger's appearance (e.g. its label or icon).

## Styles

### **`style`**
To the main element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>
