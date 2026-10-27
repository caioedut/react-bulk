# useDefaultRef

Creates an internal ref and exposes its value to an optional forwarded `ref`. Useful when a component needs its own ref but should still forward it.

## Import

```jsx
import { useDefaultRef } from '@react-bulk/core';
```

## Usage

```jsx live
function App() {
  const FocusableInput = forwardRef((props, ref) => {
    const inputRef = useDefaultRef(ref);

    return (
      <Box>
        <Input ref={inputRef} {...props} />
        <Button mt={2} onPress={() => inputRef.current?.focus()}>
          Focus (internal ref)
        </Button>
      </Box>
    );
  });

  const outerRef = useRef();

  return (
    <Box>
      <FocusableInput ref={outerRef} placeholder="Type here..." />
      <Button mt={2} variant="outline" onPress={() => outerRef.current?.focus()}>
        Focus (forwarded ref)
      </Button>
    </Box>
  );
}
```

## Params

### **`ref`**

The forwarded ref (may be `null` or `undefined`).

➤ Type: **`Ref`** <br/>

---

### **`initialValue`**

Initial value of the internal ref.

➤ Type: **`any`** <br/>

## Returns

### **`ref`**

A mutable ref object (`{ current }`) whose value is also exposed through the forwarded ref.

➤ Type: **`MutableRefObject`** <br/>
