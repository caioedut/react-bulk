---
sidebar_position: 4.5
---

# Switch

A toggle that switches a single setting on or off.

## Import

```jsx
import { Switch } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Grid column gap>
  <Box>
    <Switch label="Off by default" />
  </Box>
  <Box>
    <Switch label="On by default" defaultChecked />
  </Box>
  <Box>
    <Switch label="Disabled" disabled />
  </Box>
</Grid>
```

### Sizes

```jsx live
<Grid column gap>
  <Box>
    <Switch size="small" label="Small" />
  </Box>
  <Box>
    <Switch size="medium" label="Medium" />
  </Box>
  <Box>
    <Switch size="large" label="Large" />
  </Box>
</Grid>
```

### Colors and Label Placement

```jsx live
<Switch defaultChecked label="Notifications" labelPlacement="left" onColor="success" offColor="error" />
```

### Controlled

```jsx live
function App() {
  const [checked, setChecked] = useState(false);

  return (
    <Box>
      <Switch controlled checked={checked} label="Dark mode" onChange={(e, value) => setChecked(value)} />
      <Text mt={2}>Checked: {checked ? 'yes' : 'no'}</Text>
    </Box>
  );
}
```

## Props

Extends all [`Button`](/docs/forms/button#props) props.

### **`checked`**

The checked state. Use with `controlled` to fully control it.

➤ Type: **`boolean`** <br/>

---

### **`controlled`**

If `true`, the state is only changed through the `checked` prop.

➤ Type: **`boolean`** <br/>

---

### **`defaultChecked`**

The initial checked state when uncontrolled.

➤ Type: **`boolean`** <br/>

---

### **`disabled`**

➤ Type: **`boolean`** <br/>

---

### **`error`**

Error message rendered below the switch.

➤ Type: **`string` | `boolean`** <br/>

---

### **`label`**

A string renders a pressable `Label`; an element is rendered as is.

➤ Type: **`string` | `ReactElement`** <br/>

---

### **`labelPlacement`**

➤ Type: **`'left'` `'right'`** <br/>
➤ Default: **`'right'`**

---

### **`name`**

Field name when used inside a [`Form`](/docs/forms/form).

➤ Type: **`string`** <br/>

---

### **`offColor`**

Track color when unchecked.

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`gray.lighter`**

---

### **`offThumbColor`**

Thumb color when unchecked.

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`white`**

---

### **`onColor`**

Track color when checked.

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`primary`**

---

### **`onThumbColor`**

Thumb color when checked.

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`white`**

---

### **`readOnly`**

If `true`, the state can't be changed by the user.

➤ Type: **`boolean`** <br/>

---

### **`size`**

➤ Type: **`'xsmall'` `'small'` `'medium'` `'large'` `'xlarge'` | `number`** <br/>
➤ Default: **`medium`**

## Styles

### **`style`**
To the root element (wraps the button and label).

### **`buttonStyle`**
To the track button.

### **`thumbStyle`**
To the thumb.

### **`labelStyle`**
To the label.

### **`errorStyle`**
To the error message.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

## Events

### **`onBlur`**

➤ Type: **[`Function(RbkInputEvent, checked)`](/docs/type-reference/rbk-input-event)** <br/>

---

### **`onChange`**

➤ Type: **[`Function(RbkInputEvent, checked)`](/docs/type-reference/rbk-input-event)** <br/>

---

### **`onFocus`**

➤ Type: **[`Function(RbkInputEvent, checked)`](/docs/type-reference/rbk-input-event)** <br/>

---

### **`onFormChange`**

➤ Type: **[`Function(RbkFormEvent, data)`](/docs/type-reference/rbk-form-event)** <br/>

---
