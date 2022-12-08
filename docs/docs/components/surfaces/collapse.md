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
      <Collapse in={visible} mt={3}>
        Collapse is amazing!
      </Collapse>
    </>
  )
}
```

## Props

Extends all [`Box`](/docs/components/core/box#props) props.

**`in`**

➤ Type: **`boolean`** <br/>

---

## Styles

**`style`** to the main element.

➤ Type: **[`RbkStyles`](/docs/type-reference/rbk-styles)** <br/>

---