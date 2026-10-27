# useDependentState

Like `useState`, but the state is recomputed by a factory function whenever its dependencies change. The state can still be changed locally between dependency changes.

## Import

```jsx
import { useDependentState } from '@react-bulk/core';
```

## Usage

```jsx live
function App() {
  const [base, setBase] = useState(10);
  const [count, setCount] = useDependentState(() => base, [base]);

  return (
    <Grid column gap>
      <Box>
        <Text>Base: {base} / Count: {count}</Text>
      </Box>
      <Box>
        <Button onPress={() => setCount((current) => current + 1)}>Increment count</Button>
      </Box>
      <Box>
        <Button variant="outline" onPress={() => setBase(base + 10)}>
          Change base (resets count)
        </Button>
      </Box>
    </Grid>
  );
}
```

## Params

### **`factory`**

Function that returns the state. Receives the current state (`undefined` on the first render).

➤ Type: **`(current?: T) => T`** <br/>

---

### **`deps`**

When any of these values change, the state is recomputed by `factory`.

➤ Type: **`any[]`** <br/>

## Returns

### **`[state, setState]`**

Same tuple as `useState`.

➤ Type: **`[T, Dispatch<SetStateAction<T>>]`** <br/>
