# Tabs

Used to better display the different views and easily switch between them.


## Import

```jsx
import { Tabs } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Tabs
  tabs={[
    { label: 'Tab 1' },
    { label: 'Tab 2' },
  ]}
/>
```

### Variants

#### Group

```jsx live
function App() {
  const [tab, setTab] = useState(0);

  return (
    <Tabs
      variant='group'
      value={tab}
      onChange={(e, newValue) => setTab(newValue)}
      tabs={[
        { label: 'Tab 1' },
        { label: 'Tab 2' },
        { label: 'Tab 3' },
      ]}
    />
  )
}
```

#### Card

```jsx live
function App() {
  const [tab, setTab] = useState(0);

  return (
    <Tabs
      variant='card'
      value={tab}
      onChange={(e, newValue) => setTab(newValue)}
      tabs={[
        { label: 'Tab 1' },
        { label: 'Tab 2' },
        { label: 'Tab 3' },
      ]}
    />
  )
}
```

#### Nav

```jsx live
function App() {
  const [tab, setTab] = useState(0);

  return (
    <Tabs
      variant='nav'
      value={tab}
      onChange={(e, newValue) => setTab(newValue)}
      tabs={[
        { label: 'Tab 1' },
        { label: 'Tab 2' },
        { label: 'Tab 3' },
      ]}
    />
  )
}
```

## Props

Extends all [`Scrollable`](/docs/core/scrollable#props) props.

### **`alignment`**

➤ Type: **`'start'` `'center'` `'end'`** <br/>
➤ Default: **`start`**

---

### **`color`**

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`primary`**

---

### **`size`**

➤ Type: **`'small'` `'medium'` `'large'` `'xlarge'`** <br/>
➤ Default: **`medium`**

---

### **`tabs`**

➤ Type: **`Array<RbkTab>`** <br/>

```jsx title="RbkTab"
{
  value: string | number
  label: string
} & Omit<ButtonProps, 'children'>
```

---

### **`value`**

➤ Type: **`string` `number`** <br/>

---

### **`variant`**

➤ Type: **`'group'` `'card'`** <br/>
➤ Default: **`group`**

## Styles

### **`style`**
To the main element.

### **`contentStyle`**
To the inner wrapper.

### **`buttonStyle`**
To the tabs buttons.

### **`activeStyle`**
To the active tab button.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

## Events

### **`onChange`**

➤ Type: **`function onChange(event: Event, newValue: string | number)`** <br/>

---
