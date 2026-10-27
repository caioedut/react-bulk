# useInput

Manages the value of a custom input (controlled or uncontrolled) and registers it in the parent [`Form`](/docs/forms/form), so custom fields work with `getData`, `reset`, `clear` and errors like the built-in inputs.

## Import

```jsx
import { useInput } from '@react-bulk/core';
```

## Usage

```jsx live
function App() {
  const Counter = ({ name, defaultValue = 0 }) => {
    const input = useInput({ name, defaultValue });
    const value = input.state ?? 0;

    return (
      <Grid gap alignItems="center">
        <Box>
          <Button onPress={(e) => input.setState(value - 1, e)}>-</Button>
        </Box>
        <Box>
          <Text>{value}</Text>
        </Box>
        <Box>
          <Button onPress={(e) => input.setState(value + 1, e)}>+</Button>
        </Box>
      </Grid>
    );
  };

  return (
    <Form onSubmit={(e, data) => alert(JSON.stringify(data))}>
      <Counter name="quantity" defaultValue={1} />
      <Button type="submit" mt={2}>
        Submit
      </Button>
    </Form>
  );
}
```

## Params

### **`name`**

Field name. When set, the input is registered in the parent `Form`.

➤ Type: **`string`** <br/>

---

### **`value`**

The value. Updates the state whenever it changes.

➤ Type: **`any`** <br/>

---

### **`defaultValue`**

Initial value when `value` is not set. Falls back to the form's `initialData[name]`.

➤ Type: **`any`** <br/>

---

### **`controlled`**

If `true`, the state always reflects `value`.

➤ Type: **`boolean`** <br/>

---

### **`editable`**

If `false`, `props.onChange` ignores changes.

➤ Type: **`boolean`** <br/>
➤ Default: **`true`**

---

### **`error`**

Error message, also reported to the form.

➤ Type: **`string` | `boolean`** <br/>

---

### **`prop`**

Property of the change event target to read the value from (e.g. `checked`).

➤ Type: **`string`** <br/>
➤ Default: **`'value'`**

---

### **`mask`**

Formats the state into `props.value`.

➤ Type: **`(value) => string`** <br/>

---

### **`unmask`**

Converts the state into the value reported to the form.

➤ Type: **`(value) => any`** <br/>

---

### **`onChange`**

Called when the state changes.

➤ Type: **`Function(event, value)`** <br/>

---

### **`onFormChange`**

Called when any field of the parent form changes.

➤ Type: **[`Function(RbkFormEvent, data)`](/docs/type-reference/rbk-form-event)** <br/>

## Returns

### **`state`**

The current value (`null` when empty).

➤ Type: **`any`** <br/>

---

### **`setState`**

Changes the value and calls `onChange` if it differs.

➤ Type: **`(value, event?) => void`** <br/>

---

### **`prevState`**

The previous value.

➤ Type: **`any`** <br/>

---

### **`error`**

The current error, or `null`.

➤ Type: **`string` | `boolean` | `null`** <br/>

---

### **`clear`**

Clears the value.

➤ Type: **`() => void`** <br/>

---

### **`reset`**

Restores the initial value.

➤ Type: **`() => void`** <br/>

---

### **`form`**

The parent form reference (same as [`useForm`](/docs/hooks/use-form)).

➤ Type: **`FormRef` | `null`** <br/>

---

### **`props`**

`{ name, value, onChange }` ready to spread on a native input element.

➤ Type: **`object`** <br/>
