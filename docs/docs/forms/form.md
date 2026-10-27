---
sidebar_position: 1
---

# Form

Context to manipulate and serialize forms.

## Import

```jsx
import { Form } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
function Home() {
  function handleSubmit(event, data) {
    alert(`Your name is "${data.name || ''}"`);
  }

  function handleCancel(event, data) {
    alert('Cancelled!');
  }

  return (
    <Form onSubmit={handleSubmit} onCancel={handleCancel}>
      <Input name="name" label="Full Name" placeholder="Type your full name" />
      <Box row noWrap justifyContent="end" mt={3}>
        <Button type="cancel" variant="outline" ml={3}>Cancel</Button>
        <Button type="clear" variant="outline" ml={3}>Clear</Button>
        <Button type="submit" ml={3}>Submit</Button>
      </Box>
    </Form>
  );
}
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`disableObjectParser`**

Disables serialization with [dot-object](https://www.npmjs.com/package/dot-object)-like

➤ Type: **`object`** <br/>

---

### **`initialData`**

Fill inputs with these values ONLY on FIRST RENDER.

➤ Type: **`object`** <br/>

---

## Events

### **`onSubmit`**

➤ Type: **`Function(FormRef, data)`** <br/>

---

### **`onCancel`**

➤ Type: **`Function(FormRef)`** <br/>

---

### **`onClear`**

➤ Type: **`Function(FormRef, data)`** <br/>

---

### **`onReset`**

➤ Type: **`Function(FormRef, data)`** <br/>

## Reference

### **target : `ReactNode`**

`ref.current.target`

---

### **submit()**

Dispatch `onSubmit` handler.

`ref.current.submit()`

---

### **cancel()**

Dispatch `onCancel` handler.

`ref.current.cancel()`

---

### **clear()**

Clear all fields and dispatch `onClear` handler.

`ref.current.clear()`

---

### **reset()**

Reset fields to their default values and dispatch `onReset` handler.

`ref.current.reset()`

---

### **getData() : `object`**

`ref.current.getData()`

---

### **setData(data: `object`)**

`ref.current.setData({ age: 21 })`

---

### **setErrors(errors: `object`)**

`ref.current.setErrors({ age: 'Type your age' })`

---

### **getValue(name: `string`) : `any`**

`ref.current.getValue('age')`

---

### **setValue(name: `string`, value: `any`)**

Update input value and dispatch `onChange` event.

`ref.current.setValue('age', '21')`

---

### **getField(name: `string`) : `FormField`**

Commonly used by libraries that implements some components. Maybe you are looking for [`getValue`](#getValue).

`ref.current.getField('age')`

---

### **setField(data: `FormField`)**

Commonly used by libraries that implements some components. Maybe you are looking for [`setValue`](#setValue).

:::tip
Prefer [`useInput`](/docs/hooks/use-input), which registers the field for you.
:::

Register the field once and read the current state through refs, so `get` never returns a stale value.
Calling `setField` again with the same `name` updates the field in place (keeping its position), and dispatches the form `onChange` when its value changed.

```jsx
const form = useForm();
const [age, setAge] = useState('21');
const [error, setError] = useState(null);

const ageRef = useRef(age);
ageRef.current = age;

const errorRef = useRef(error);
errorRef.current = error;

useEffect(() => {
  form.setField({
    name: 'age',
    initialValue: '21',
    get: () => ageRef.current,
    set: (value) => {
      ageRef.current = value;
      setAge(value);
    },
    getError: () => errorRef.current,
    setError: (error) => setError(error),
    onFormChange: (event, data) => handleFormChange(event, data),
  });

  return () => form.unsetField('age');
}, [form]);
```

---

### **unsetField(name: `string`)**

Commonly used by libraries that implements some components. Remove the field from `Form` track.

`ref.current.unsetField('age')`
