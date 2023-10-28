# useBreakpoints

Used to get all active viewports.

## Import

```jsx
import { useBreakpoints } from '@react-bulk/web'; // OR @react-bulk/native
```

## Usage

```jsx
export default function App() {
  const { xs, sm, md, lg, xl, xxl } = useBreakpoints();

  return (
    <Box>
      {md ? (
        <Text>Desktop</Text>
      ) : (
        <Text>Mobile</Text>
      )}
    <>
  );
}
```

## Props

**`xs`**

➤ Type: **`boolean`** <br/>

---

**`sm`**

➤ Type: **`boolean`** <br/>

---

**`md`**

➤ Type: **`boolean`** <br/>

---

**`lg`**

➤ Type: **`boolean`** <br/>

---

**`xl`**

➤ Type: **`boolean`** <br/>

---

**`xxl`**

➤ Type: **`boolean`** <br/>

---
