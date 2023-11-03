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

## Props

Extends all [`Box`](/docs/core/box#props) props.

**`visible`**

➤ Type: **`boolean`** <br/>

---

## Styles

**`style`** to the main element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

---
