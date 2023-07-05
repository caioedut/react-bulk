# Drawer

Used do display a floating side menu on top of the current page.

## Import

```jsx
import { Drawer } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
function Home() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)}>
        Open Drawer
      </Button>
      <Drawer visible={visible} maxw={320}>
        <Card>
          <Text variant="title" bold>Drawer is amazing!</Text>

          <Divider my={3} />

          <Button onPress={() => setVisible(false)}>
            Close
          </Button>
        </Card>
      </Drawer>
    </>
  );
}
```

## Props

Extends all [`Box`](/docs/components/core/box#props) props.

**`placement`**

➤ Type: **`'right'` `'left'` `'top'` `'bottom'`** <br/>
➤ Default: **`'right'`** <br/>

---

**`visible`**

➤ Type: **`boolean`** <br/>

---

## Styles

**`style`** to the main element.
**`backdropStyle`** to the backdrop element.

---

## Events

**`onBackdropPress`**

➤ Type: **`Function(Event)`** <br/>

---
