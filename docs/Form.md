[‹ Go Back](README.md)

# Form
A extensible form component.

### `component`

| Web      | Native  |
|----------|---------|
| `'form'` | `View`  |

---

## Props
Extends all [`Box`](Box.md) properties.

### `data`

Fill inputs with these values.

| Type     |
|----------|
| `object` |

---

## Event Props

### `onSubmit`

| Type                    |
|-------------------------|
| `Function(event, data)` |

---

## Reference

### target : `ReactNode`
`ref.current.target`

---

### submit() : `void`
`ref.current.submit()`

---

### getData() : `object`
`ref.current.getData()`

---

### setData(data: `object`) : `void`
`ref.current.setData({ age: 21 })`

---

### getField(name: `string`) : `{ name: string, get: Function, set: Function }`
`ref.current.getField('age')`

---

### setField(data: `object`) : `void`
```jsx
const [age, setAge] = useState('');

ref.current.setField({
  name: 'age',
  get: () => age,
  set: (value) => setAge(value)
})
```

---

### unsetField(name: `string`) : `void`
`ref.current.unsetField('age')`

---

[‹ Go Back](README.md)
