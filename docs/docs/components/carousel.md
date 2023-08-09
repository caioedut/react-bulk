# Carousel

Used to show cycling slides like a carousel.


## Import

```jsx
import { Carousel } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Carousel xs={1} sm={2} md={3} lg={4} xl={5} gap={3}>
  {Array.from({ length: 7 }).map((i, index) => (
    <Card key={index} corners={3} bg="background.secondary">
      <Text bold>
        Slide Item {index + 1}
      </Text>

      <Image w="100%" corners={3} my={3} source="https://i.imgur.com/CmPhDqA.png" />

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos recusandae suscipit velit voluptate.
      </Text>
    </Card>
  ))}
</Carousel>
```

## Props

Extends all [`Box`](/docs/components/box#props) props.

**`chevron`**

`auto` is not supported on native.

➤ Type: **`auto` `visible` `hidden`** <br/>

---

**`color`**

➤ Type: **`string`** <br/>
➤ Default: **`primary`**

---

**`gap`**

Spacing (horizontal and vertical) between children. The set value will be multiplied by the `theme.typography.fontSize` value.

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

➤ Type: **[`RbkStyles`](/docs/type-reference/rbk-styles)** <br/>

---
