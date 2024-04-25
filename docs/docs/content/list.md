# List

Used to display virtual list, rendering items on-demand.

## Import

```jsx
import { List } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<List height={240} rowHeight={18}>
    {Array.from({ length: 100 }).map((_, index) => (
        <Text key={index} height={18}>
            Item Child {index + 1}
        </Text>
    ))}
</List>
```

### Composition

```jsx live
<List height={240} rowHeight={18} border="primary">
    <Text height={36} bg="background.secondary">
        Custom Item Height
    </Text>
    {Array.from({ length: 1000 }).map((_, index) => (
        <Text key={index} height={18}>
            Item Child {index + 1}
        </Text>
    ))}
</List>
```

## Props

Extends all [`Scrollable`](/docs/core/scrollable#props) props.

### **`renderDelay`**

Delay in milliseconds for rendering children after component mounting.

➤ Type: **`number`** <br/>

---

### **`renderOffset`**

Determines the size rendered ahead of and behind the visible portion of the list.

➤ Type: **`number`** <br/>
➤ Default: **`200`** <br/>

---

### **`rowHeight`**

➤ Type: **`number`** <br/>

---

### **`rowFallbackComponent`**

➤ Type: **`string` `Component`** <br/>
➤ Default Web: **`'div'`** <br/>
➤ Default Native: **`View`** <br/>

## Styles

### **`style`**
To the main element.

### **`contentStyle`**
To the inner wrapper.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

## Events

### **`onScroll`**

➤ Type: **`Function(Event)`** <br/>
