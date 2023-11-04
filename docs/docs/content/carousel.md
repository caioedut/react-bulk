# Carousel

Used to show cycling slides like a carousel.


## Import

```jsx
import { Carousel } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Carousel xs={1} sm={1} md={2} lg={2} xl={3} gap={4}>
  {Array.from({ length: 4 }).map((i, index) => (
    <Card key={index} bg="background.secondary">
      <Text bold>
        Slide Item {index + 1}
      </Text>

      <Image w="100%" corners={2} my={3} source="https://i.imgur.com/HdIl3Ef.png" />

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Text>
    </Card>
  ))}
</Carousel>
```

## Props

Extends all [`Box`](/docs/core/box#props) props.

**`chevron`**

`auto` is not supported on native.

➤ Type: **`auto` `visible` `hidden`** <br/>

---

**`color`**

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`primary`**

---

**`gap`**

Spacing (horizontal and vertical) between children. The set value will be multiplied by the `theme.typography.spacing` value.

➤ Type: **`number`** <br/>

---

**`pagingEnabled`**

➤ Type: **`boolean`** <br/>

---

## Breakpoints

**`xs`**

Number of items shown at breakpoint `xs`.

➤ Type: **`number`** <br/>

---

**`sm`**

Number of items shown at breakpoint `sm`.

➤ Type: **`number`** <br/>

---

**`md`**

Number of items shown at breakpoint `md`.

➤ Type: **`number`** <br/>

---

**`lg`**

Number of items shown at breakpoint `lg`.

➤ Type: **`number`** <br/>

---

**`xl`**

Number of items shown at breakpoint `xl`.

➤ Type: **`number`** <br/>

---

## Styles

**`style`** to the main element.

**`chevronStyle`** to the chevrons.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

---