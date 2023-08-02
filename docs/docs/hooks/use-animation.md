# useAnimation

Used to programatically animate an item.

## Import

```jsx
import { useAnimation } from '@react-bulk/core'; // OR @react-bulk/native
```

## Usage

```jsx live
function App() {
  const sizeAnim = useAnimation({ width: 10, height: 10 });

  function handleForward() {
    sizeAnim.start({ width: 100, height: 100 })
  }

  function handleBackward() {
    sizeAnim.start({ width: 10, height: 10 })
  }

  return (
    <Box center>
      <Button mb={3} onPress={handleForward}>Animate Forward</Button>
      <Button mb={3} onPress={handleBackward}>Animate Backward</Button>
      <Box border='1px solid primary' style={sizeAnim.style} />
    </Box>
  );
}
```

## Options

**`boomerang`**

For web only. <br/>

➤ Type: **`boolean`** <br/>

---

**`delay`**

Delay in milliseconds to start the animation.

➤ Type: **`number`** <br/>

---

**`duration`**

Animation duration in milliseconds.

➤ Type: **`number`** <br/>

---

**`timing`**

➤ Type: **`'ease'` `'linear'` `'ease-in'` `'ease-out'` `'ease-in-out'`** <br/>

---

**`iterations`**

➤ Type: **`number` `'infinite'`** <br/>

---
