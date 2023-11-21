# Avatar

## Import

```jsx
import { Avatar } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Avatar source="https://i.imgur.com/HdIl3Ef.png" />
```

### Sizes

```jsx live
<Grid gap>
    <Box>
        <Avatar size={40} />
    </Box>
    <Box>
        <Avatar size={80} />
    </Box>
    <Box>
        <Avatar size={120} />
    </Box>
    <Box>
        <Avatar size={160} />
    </Box>
</Grid>
```

### Composition

```jsx live
<Grid gap>
  <Box>
    <Avatar color="primary" placeholder={<Text size={2} color="white">AB</Text>}  />
  </Box>
  <Box>
    <Avatar color="secondary" placeholder={<Text size={2} color="white">CD</Text>}  />
  </Box>
  <Avatar source="https://i.imgur.com/HdIl3Ef.png">
     <Button circular color="secondary" position="absolute" b={0} r={0}>
        ↺
     </Button>
  </Avatar>
</Grid>
```

## Styles

### **`style`**
To the main element.

### **`contentStyle`**
To the wrapper of `Image` and `placeholder`.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`alt`**

Alt attribute to the `Image`.

➤ Type: **`string`** <br/>

---

### **`color`**

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`'gray'`**

---

### **`corners`**

Sets `borderRadius` style. The set value will be multiplied by the `theme.shape.borderRadius` value.

➤ Type: **`number`** <br/>
➤ Default: fully rounded <br/>

---

### **`size`**

➤ Type: **`number`** <br/>
➤ Default: **`64`** <br/>

---

### **`source`**

URL or Source of the image.

➤ Type: **`string` [`ImageSource`](https://reactnative.dev/docs/image#source)** <br/>

---
