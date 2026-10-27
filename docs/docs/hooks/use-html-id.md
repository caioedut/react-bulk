# useHtmlId

Returns a stable, unique id for the component's lifetime, e.g. to link a label to its input.

## Import

```jsx
import { useHtmlId } from '@react-bulk/core';
```

## Usage

```jsx live
function App() {
  const id = useHtmlId();

  return (
    <Box>
      <Label for={id}>Email</Label>
      <Input id={id} placeholder="you@example.com" />
      <Text variant="caption" mt={1}>
        Generated id: {id}
      </Text>
    </Box>
  );
}
```

## Params

### **`id`**

If provided, it is returned as is.

➤ Type: **`string`** <br/>

## Returns

### **`id`**

The given `id`, or a generated one prefixed with `rbk-id-`. Never changes between renders.

➤ Type: **`string`** <br/>
