# ListItem

A card row with optional start/end addons and a chevron, for building lists and menus.

## Import

```jsx
import { ListItem } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Box>
  <ListItem>
    <Text>First item</Text>
  </ListItem>
  <ListItem>
    <Text>Second item</Text>
  </ListItem>
</Box>
```

### Chevron

```jsx live
<Box>
  <ListItem chevron onPress={() => alert('Pressed!')}>
    <Text>Default chevron</Text>
  </ListItem>
  <ListItem chevron="›" chevronStyle={{ color: 'success', size: 1.5 }}>
    <Text>Custom chevron</Text>
  </ListItem>
</Box>
```

### Addons

```jsx live
<ListItem
  chevron
  gap={2}
  startAddon={<Avatar size={32} />}
  endAddon={<Badge>3</Badge>}
>
  <Box>
    <Text bold>John Doe</Text>
    <Text variant="caption">3 unread messages</Text>
  </Box>
</ListItem>
```

## Props

Extends all [`Card`](/docs/content/card#props) props.

### **`chevron`**

If `true`, renders a right chevron icon at the end. Any other value is rendered as text.

➤ Type: **`boolean` | `ReactElement`** <br/>

---

### **`endAddon`**

An element rendered after the children.

➤ Type: **`ReactElement`** <br/>

---

### **`gap`**

Spacing between the addons and children, also used as padding. `true` is the same as `1`.

➤ Type: **`boolean` | `number`** <br/>
➤ Default: **`1`**

---

### **`startAddon`**

An element rendered before the children.

➤ Type: **`ReactElement`** <br/>

## Styles

### **`style`**
To the root card element.

### **`chevronStyle`**
To the chevron wrapper. Also accepts `size` (in rem) and `color` ([`RbkColor`](/docs/type-reference/rbk-color)) for the chevron itself.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>
