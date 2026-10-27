# useDeferredValue

Returns a copy of a value that only updates after it stops changing for a given delay (debounce).

## Import

```jsx
import { useDeferredValue } from '@react-bulk/core';
```

## Usage

```jsx live
function App() {
  const [search, setSearch] = useState('');
  const deferred = useDeferredValue(search, '', 500);

  return (
    <Box>
      <Input placeholder="Type to search..." value={search} onChange={(e, value) => setSearch(value ?? '')} />
      <Text mt={2}>Searching for: {deferred}</Text>
    </Box>
  );
}
```

## Params

### **`value`**

The value to defer.

➤ Type: **`any`** <br/>

---

### **`initialValue`**

Value returned before the first delay has passed.

➤ Type: **`any`** <br/>

---

### **`delayMs`**

Delay in milliseconds.

➤ Type: **`number`** <br/>
➤ Default: **`500`**

## Returns

### **`value`**

The deferred value.

➤ Type: **`any`** <br/>
