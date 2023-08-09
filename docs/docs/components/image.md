# Image

Used to display images.

## Import

```jsx
import { Image } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic
```jsx live
<Image source="https://i.imgur.com/CmPhDqA.png" />
```

### Sizes

```jsx live
<Grid center gap={3}>
  <Box>
    <Image source="https://i.imgur.com/CmPhDqA.png" w={100} border />
  </Box>
  <Box>
    <Image source="https://i.imgur.com/CmPhDqA.png" h={100} border />
  </Box>
  <Box>
    <Image source="https://i.imgur.com/CmPhDqA.png" w={100} h={100} border />
  </Box>
</Grid>
```

### Border Radius

```jsx live
<Grid center gap={3}>
  <Box>
    <Image source="https://i.imgur.com/CmPhDqA.png" w={100} h={100} corners={2} border />
  </Box>
  <Box>
    <Image source="https://i.imgur.com/CmPhDqA.png" w={100} h={100} circular border />
  </Box>
</Grid>
```

## Props

Extends all [`Box`](/docs/components/box#props) props.

**`alt`**

➤ Type: **`string`** <br/>

---

**`height`** or **`h`**

➤ Type: **`number` `string`** <br/>

---

**`circular`**

➤ Type: **`boolean`** <br/>

---

**`mode`**

➤ Type: **`'cover'` `'contain'` `'fill'`** <br/>
➤ Default: **`'cover'`** <br/>

---

**`source`**

➤ Type: **`string` [`ImageSource`](https://reactnative.dev/docs/image#source)** <br/>

---

**`width`** or **`w`**

➤ Type: **`number` `string`** <br/>

---

## Styles

**`style`** to the main element.

---

## Events

**`onLoad`**

➤ Type: **`Function(Event)`** <br/>

---

**`onError`**

➤ Type: **`Function(Event)`** <br/>

---
