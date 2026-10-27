# useDraggable

Captures pointer movement across the whole screen while dragging, on both web and native. Must be used inside `ReactBulk`.

## Import

```jsx
import { useDraggable } from '@react-bulk/core';
```

## Usage

```jsx live
function App() {
  const [offset, setOffset] = useState(0);

  // Handlers are bound when capture starts, so keep mutable values in refs
  const offsetRef = useRef(0);
  const startRef = useRef(null);
  const releaseRef = useRef();

  const draggable = useDraggable({
    onDragStart: (e) => {
      startRef.current = { x: e.pageX, offset: offsetRef.current };
    },
    onDragMove: (e) => {
      if (!startRef.current) return;
      offsetRef.current = Math.max(0, Math.min(200, startRef.current.offset + e.pageX - startRef.current.x));
      setOffset(offsetRef.current);
    },
    onDragEnd: () => {
      startRef.current = null;
      releaseRef.current?.();
    },
  });

  releaseRef.current = draggable.release;

  return (
    <Box h={60} w={260} bg="background.secondary" corners={2} justifyContent="center">
      <Box
        marginLeft={offset}
        h={40}
        w={60}
        bg="primary"
        corners={2}
        style={{ web: { cursor: 'grab', userSelect: 'none', touchAction: 'none' } }}
        onPressIn={draggable.capture}
      />
    </Box>
  );
}
```

## Params

### **`onDragStart`**

Called on the first pointer move after `capture()`.

➤ Type: **[`Function(RbkPointerEvent)`](/docs/type-reference/rbk-pointer-event)** <br/>

---

### **`onDragMove`**

Called on every pointer move while capturing.

➤ Type: **[`Function(RbkPointerEvent)`](/docs/type-reference/rbk-pointer-event)** <br/>

---

### **`onDragEnd`**

Called when the pointer is released or cancelled.

➤ Type: **[`Function(RbkPointerEvent)`](/docs/type-reference/rbk-pointer-event)** <br/>

## Returns

### **`capture`**

Starts capturing pointer events. Usually called from `onPressIn`.

➤ Type: **`() => void`** <br/>

---

### **`release`**

Stops capturing pointer events. Usually called from `onDragEnd`.

➤ Type: **`() => void`** <br/>

---

### **`isCapturing`**

Whether pointer events are being captured.

➤ Type: **`boolean`** <br/>
