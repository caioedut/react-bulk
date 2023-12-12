# Date Picker

Used to display input with calendar.

## Import

```jsx
import { DatePicker } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<DatePicker value={new Date()} />
```

### Variants

#### Modal

```jsx live
<DatePicker variant="modal" />
```

#### Inline

```jsx live
<DatePicker variant="inline" />
```

### Min / Max

```jsx live
<DatePicker
  variant="inline"
  min="2024-01-01"
  max="2024-12-31"
/>
```

### Translation

```jsx live
<DatePicker
  variant="inline"
  translate={{
    cancel: 'Cancelar',
    clear: 'Limpar',
    today: 'Hoje'
  }}
/>
```

## Styles

### **`style`**
To the outer wrapper.

### **`contentStyle`**
To the inner wrapper.

### **`errorStyle`**
To the error element when has [`error`](#error) prop.

### **`inputStyle`**
To the input element.

### **`labelStyle`**
To the label element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

## Props

Extends all [`Input`](/docs/forms/input#props) props.

### **`max`**

➤ Type: **`Date` `string`** <br/>

---

### **`min`**

➤ Type: **`Date` `string`** <br/>

---

### **`value`**

➤ Type: **`Date` `string`** <br/>

---

### **`variant`**

➤ Type: **`'modal'` `'inline'`** <br/>

---

### **`translate`**

➤ Type: **`object`** <br/>

```js
{
  cancel: string
  clear: string
  today: string
}
```

## Events

### **`onChange`**

➤ Type: **`Function`([`RbkInputEvent`](/docs/type-reference/rbk-input-event))** <br/>

---

### **`onSubmit`**

➤ Type: **`Function`([`RbkInputEvent`](/docs/type-reference/rbk-input-event))** <br/>

---

### **`onFocus`**

➤ Type: **`Function`([`RbkInputEvent`](/docs/type-reference/rbk-input-event))** <br/>

---

### **`onBlur`**

➤ Type: **`Function`([`RbkInputEvent`](/docs/type-reference/rbk-input-event))** <br/>

---

### **`onFormChange`**

Combined with [Form](/docs/forms/form), triggers every time when form data changes.
Eg.: [Input](/docs/forms/input), [Select](/docs/forms/select), [Checkbox](/docs/forms/checkbox).

➤ Type: **`Function`([`RbkFormEvent`](/docs/type-reference/rbk-form-event))** <br/>
