---
sidebar_position: 4
---

# Link

A pressable text styled as a link. Renders an `<a>` on web and a `Text` on native.

## Import

```jsx
import { Link } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Link href="https://github.com/caioedut/react-bulk" target="_blank">
  React Bulk on GitHub
</Link>
```

### Underline

```jsx live
<Link underline onPress={() => alert('Link Pressed!')}>
  Underlined link
</Link>
```

### Inside Text

```jsx live
<Text>
  Read the <Link href="/docs/core/text">Text docs</Link> for all typography props.
</Text>
```

## Props

Extends all [`Text`](/docs/core/text#props) props.

### **`href`**

For web only.<br/>
The URL the link points to.

➤ Type: **`string`** <br/>

---

### **`underline`**

If `true`, the text is underlined.

➤ Type: **`boolean`** <br/>

## Styles

### **`style`**
To the link element. Uses the `primary` color by default.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

## Events

### **`onPress`**

➤ Type: **[`Function(RbkPointerEvent)`](/docs/type-reference/rbk-pointer-event)** <br/>

---
