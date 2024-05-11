# Image

Used to display images.

## Import

```jsx
import { Image } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic
```jsx live
<Image source="https://i.imgur.com/HdIl3Ef.png" />
```

### Sizes

```jsx live
<Grid center gap>
  <Box>
    <Image source="https://i.imgur.com/HdIl3Ef.png" w={100} />
  </Box>
  <Box>
    <Image source="https://i.imgur.com/HdIl3Ef.png" h={100} />
  </Box>
  <Box>
    <Image source="https://i.imgur.com/HdIl3Ef.png" w={100} h={100} />
  </Box>
</Grid>
```

### Border Radius

```jsx live
<Grid center gap>
  <Box>
    <Image source="https://i.imgur.com/HdIl3Ef.png" w={100} h={100} corners={2} />
  </Box>
  <Box>
    <Image source="https://i.imgur.com/HdIl3Ef.png" w={100} h={100} circular />
  </Box>
</Grid>
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

### **`alt`**

➤ Type: **`string`** <br/>

---

### **`height`** or **`h`**

➤ Type: **`number` `string`** <br/>

---

### **`circular`**

➤ Type: **`boolean`** <br/>

---

### **`mode`**

➤ Type: **`'cover'` `'contain'` `'fill'`** <br/>
➤ Default: **`'cover'`** <br/>

---

### **`source`**

URL or Source of the image.

➤ Type: **`string` [`ImageSource`](https://reactnative.dev/docs/image#source)** <br/>

---

### **`width`** or **`w`**

➤ Type: **`number` `string`** <br/>


## Styles

### **`style`**
To the main element.

## Events

### **`onLoad`**

➤ Type: **`Function(Event)`** <br/>

---

### **`onError`**

➤ Type: **`Function(Event)`** <br/>

---
