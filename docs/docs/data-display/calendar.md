# Calendar

Displays a month grid with navigation between months and years, highlighting event dates.

## Import

```jsx
import { Calendar } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Calendar />
```

### Events

Event dates are highlighted with a solid button.

```jsx live
function App() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  return (
    <Calendar
      color="success"
      events={[new Date(year, month, 5), new Date(year, month, 12), new Date(year, month, 20)]}
    />
  );
}
```

### Disabled Dates

```jsx live
<Calendar disableds={(date) => date.getDay() === 0 || date.getDay() === 6} />
```

### Handling Press

```jsx live
function App() {
  const [selected, setSelected] = useState(null);

  return (
    <Box>
      <Calendar onPressDate={(e, date) => setSelected(date)} />
      <Text mt={2}>Selected: {selected ? selected.toDateString() : '-'}</Text>
    </Box>
  );
}
```

## Props

Extends all [`Card`](/docs/content/card#props) props.

### **`color`**

Color of the navigation buttons, year input and event dates.

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`primary`**

---

### **`date`**

Initial date to display. The calendar is reset when this value changes.

➤ Type: **`Date` | `string` | `number`** <br/>
➤ Default: **`new Date()`**

---

### **`disableds`**

A list of dates to disable, or a function that receives each date and returns `true` to disable it.

➤ Type: **`(Date | string | number)[]` | `(date: Date) => boolean`** <br/>

---

### **`events`**

A list of dates to highlight as events.

➤ Type: **`(Date | string | number)[]`** <br/>

## Styles

### **`style`**
To the root card element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

## Events

### **`onPressDate`**

Called when a date is pressed. The pressed date also becomes the displayed date.

➤ Type: **`Function(event, date: Date)`** <br/>

---
