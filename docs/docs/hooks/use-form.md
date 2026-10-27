# useForm

Returns the closest parent [`Form`](/docs/forms/form) reference, or `null` outside a form. Use it to read or change form data from any child component.

## Import

```jsx
import { useForm } from '@react-bulk/core';
```

## Usage

```jsx live
function App() {
  const FormActions = () => {
    const form = useForm();

    return (
      <Grid gap>
        <Box>
          <Button onPress={() => alert(JSON.stringify(form.getData()))}>Show Data</Button>
        </Box>
        <Box>
          <Button variant="outline" onPress={() => form.setValue('name', 'John Doe')}>
            Fill Name
          </Button>
        </Box>
        <Box>
          <Button variant="text" onPress={() => form.clear()}>
            Clear
          </Button>
        </Box>
      </Grid>
    );
  };

  return (
    <Form>
      <Input name="name" label="Name" mb={2} />
      <FormActions />
    </Form>
  );
}
```

## Returns

### **`initialData`**

The `initialData` passed to the form.

➤ Type: **`object`** <br/>

---

### **`getData`**

Returns all field values.

➤ Type: **`() => object`** <br/>

---

### **`setData`**

Sets the value of multiple fields.

➤ Type: **`(data: object) => void`** <br/>

---

### **`getValue`**

Returns the value of a field.

➤ Type: **`(name: string) => any`** <br/>

---

### **`setValue`**

Sets the value of a field.

➤ Type: **`(name: string, value: any) => void`** <br/>

---

### **`getErrors`**

Returns the current field errors, or `null`.

➤ Type: **`() => object | null`** <br/>

---

### **`setErrors`**

Sets field errors.

➤ Type: **`(errors: object) => void`** <br/>

---

### **`getField`**

Returns a registered field.

➤ Type: **`(name: string) => FormField | null`** <br/>

---

### **`setField`**

Registers a custom field. See [`useInput`](/docs/hooks/use-input), which does this for you.

➤ Type: **`(field: FormField) => void`** <br/>

---

### **`unsetField`**

Unregisters a field.

➤ Type: **`(name: string) => void`** <br/>

---

### **`submit`**

Submits the form.

➤ Type: **`() => void`** <br/>

---

### **`cancel`**

Triggers the form's cancel event.

➤ Type: **`() => void`** <br/>

---

### **`reset`**

Resets all fields to their initial values.

➤ Type: **`() => void`** <br/>

---

### **`clear`**

Clears all fields.

➤ Type: **`() => void`** <br/>

---

### **`target`**

The form element.

➤ Type: **`ReactElement`** <br/>
