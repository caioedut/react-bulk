# useDimensions

Used to get the current viewport dimensions.

## Import

```jsx
import { useDimensions } from '@react-bulk/web'; // OR @react-bulk/native
```

## Usage

```jsx
export default function App() {
  const {width, height} = useDimensions();

  return (
    <Box w={width} h={height} />
  );
}
```

## Props

**`height`**

➤ Type: **`number`** <br/>

---

**`width`**

➤ Type: **`number`** <br/>

---
