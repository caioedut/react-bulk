---
sidebar_position: 5
---

# Outline

A box that draws a focus ring around its content.

## Import

```jsx
import { Outline } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

Focus the box (e.g. with `Tab`) to see the outline.

```jsx live
<Outline tabIndex={0} p={3} corners={2} bg="background.secondary">
  <Text>Focus me</Text>
</Outline>
```

### Always Visible

```jsx live
<Outline visible color="success" size={2} p={3} corners={2}>
  <Text>Always outlined</Text>
</Outline>
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`color`**

Color of the outline (applied with 30% opacity).

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`primary`**

---

### **`size`**

Width of the outline in pixels.

➤ Type: **`number`** <br/>
➤ Default: **`4`**

---

### **`visible`**

`'auto'` shows the outline only while focused; `true` always shows it; `false` never does.

➤ Type: **`'auto'` | `boolean`** <br/>
➤ Default: **`'auto'`**

## Styles

### **`style`**
To the root element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

## Events

### **`onBlur`**

➤ Type: **[`Function(RbkEvent)`](/docs/type-reference/rbk-event)** <br/>

---

### **`onFocus`**

➤ Type: **[`Function(RbkEvent)`](/docs/type-reference/rbk-event)** <br/>

---
