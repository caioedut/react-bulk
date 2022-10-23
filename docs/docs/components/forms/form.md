---
sidebar_position: 0
---

# Form

Context to manipulate and serialize forms.

## Basic Usage

```jsx
import { Button, Form, Input } from '@react-bulk/web' // or @react-bulk/native;

export default function Home() {

  function handleSubmit(event, data) {
    alert('Your name is ' + data.name)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input name="name" label="Full Name" />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

## Props

Extends all [`Box`](../core/box) properties.

### `data`

Fill inputs with these values.

| Type     |
|----------|
| `object` |

---

## Event Props

### `onSubmit`

| Type                      |
|---------------------------|
| `Function(formRef, data)` |

---

### `onCancel`

| Type                |
|---------------------|
| `Function(formRef)` |

---

### `onClear`

| Type                      |
|---------------------------|
| `Function(formRef, data)` |

## Reference

### target : `ReactNode`

`ref.current.target`

---

### submit()

Dispatch `onSubmit` handler.

`ref.current.submit()`

---

### cancel()

Dispatch `onCancel` handler.

`ref.current.cancel()`

---

### clear()

Reset fields and dispatch `onClear` handler.

`ref.current.cancel()`

---

### getData() : `object`

`ref.current.getData()`

---

### setData(data: `object`)

`ref.current.setData({ age: 21 })`

---

### getValue(name: `string`) : `any`

`ref.current.getValue('age')`

---

### setValue(name: `string`, value: `any`)

`ref.current.setValue('age', '21')`

---

### getField(name: `string`) : `{ name: string, get: Function, set: Function }`

Commonly used by libraries that implements some components. Maybe you are looking for [`getValue`](#getValue).

`ref.current.getField('age')`

---

### setField(data: `object`)

Commonly used by libraries that implements some components. Maybe you are looking for [`setValue`](#setValue).

```jsx
const [age, setAge] = useState('');

ref.current.setField({
  name: 'age',
  get: () => age,
  set: (value) => setAge(value)
})
```

---

### unsetField(name: `string`)

Commonly used by libraries that implements some components. Remove the field from `Form` track.

`ref.current.unsetField('age')`

---
