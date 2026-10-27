# Table

Renders rows of data as a bordered grid of equally sized columns.

## Import

```jsx
import { Table } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Table
  border="1px solid background.secondary"
  columns={[
    { header: 'Name', content: (row) => row.name },
    { header: 'Age', content: (row) => row.age },
    { header: 'City', content: (row) => row.city },
  ]}
  rows={[
    { name: 'Alice', age: 31, city: 'Lisbon' },
    { name: 'Bruno', age: 27, city: 'São Paulo' },
    { name: 'Carla', age: 45, city: 'Berlin' },
  ]}
/>
```

### Custom Cells

```jsx live
<Table
  border="1px solid background.secondary"
  columns={[
    { header: 'Task', content: (row) => row.task },
    {
      header: () => <Text bold color="primary">Status</Text>,
      content: (row) => <Badge color={row.done ? 'success' : 'warning'}>{row.done ? 'Done' : 'Pending'}</Badge>,
      style: { alignItems: 'center' },
    },
  ]}
  rows={[
    { task: 'Write docs', done: true },
    { task: 'Ship release', done: false },
  ]}
/>
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`border`**

Border applied to the table and every cell.

➤ Type: **`string`** <br/>

---

### **`columns`**

Column definitions. `header` and `content` accept an element, a string/number, or a function: `header` receives the column, `content` receives the row.

➤ Type: **`{ header?, content?, style?: RbkStyle }[]`** <br/>

---

### **`rows`**

Data passed to each column's `content` function.

➤ Type: **`any[]`** <br/>

## Styles

### **`style`**
To the root element. Each column's `style` is applied to its cells.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>
