# usePropState

Local state that follows a prop: it starts from the prop (or an initial state) and is overwritten whenever the prop changes to a defined value.

## Import

```jsx
import { usePropState } from '@react-bulk/core';
```

## Usage

```jsx live
function App() {
  const Toggle = ({ open }) => {
    const [isOpen, setIsOpen] = usePropState(open, false);

    return (
      <Button variant={isOpen ? 'solid' : 'outline'} onPress={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Open' : 'Closed'}
      </Button>
    );
  };

  const [open, setOpen] = useState(true);

  return (
    <Grid gap>
      <Box>
        <Toggle open={open} />
      </Box>
      <Box>
        <Button variant="text" onPress={() => setOpen(!open)}>
          Toggle prop ({String(open)})
        </Button>
      </Box>
    </Grid>
  );
}
```

## Params

### **`prop`**

The prop value. Ignored while `undefined`.

➤ Type: **`T` | `undefined`** <br/>

---

### **`initialState`**

Initial state used when `prop` is `undefined`.

➤ Type: **`T` | `() => T`** <br/>

## Returns

### **`[state, setState]`**

Same tuple as `useState`.

➤ Type: **`[T, Dispatch<SetStateAction<T>>]`** <br/>
