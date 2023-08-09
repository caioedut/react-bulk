# Badge

Used to highlight a status or a text value.


## Import

```jsx
import { Badge } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Grid center gap={3}>
  <Box>
    <Badge dot />
  </Box>
  <Box>
    <Badge value={1} />
  </Box>
  <Box>
    <Badge>2</Badge>
  </Box>
  <Box>
    <Badge color="primary">primary</Badge>
  </Box>
  <Box>
    <Badge color="#6fd6ff">custom</Badge>
  </Box>
</Grid>
```

### Composition

```jsx live
<Grid center gap={12}>
  <Box position="relative" border>
    <Badge top left>2</Badge>
  </Box>
  <Box>
    <Button badge={4}>Notifications</Button>
  </Box>
  <Box position="relative" border>
    <Badge bottom right value={3} />
  </Box>
</Grid>
```


## Props

Extends all [`Text`](/docs/components/text#props) props.

**`bottom`**

➤ Type: **`boolean`** <br/>

---

**`dot`**

➤ Type: **`boolean`** <br/>

---

**`left`**

➤ Type: **`boolean`** <br/>

---

**`right`**

➤ Type: **`boolean`** <br/>

---

**`size`**

➤ Type: **`'small'` `'medium'` `'large'`** <br/>
➤ Default: **`'medium'`** <br/>

---

**`top`**

➤ Type: **`boolean`** <br/>

---

**`value`**

➤ Type: **`boolean`** <br/>

---

## Styles

**`style`** to the main element.

**`labelStyle`** to the text element.

➤ Type: **[`RbkStyles`](/docs/type-reference/rbk-styles)** <br/>

---
