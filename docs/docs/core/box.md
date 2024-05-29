---
sidebar_position: 1
---

# Box

It is the primary component, factory for everything. All components extend the [`Box`](/docs/core/box).

## Import

```jsx
import { Box } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Grid column center>
  <Box>
    <Box border p={3}>Styled Box</Box>
  </Box>
  <Box>
    <Box border mx="auto">Styled Box</Box>
  </Box>
  <Box>
    <Box bg="primary">Styled Box</Box>
  </Box>
  <Box>
    <Box border h={80}>Styled Box</Box>
  </Box>
  <Box>
    <Box border="1px solid secondary" corners={2} p={3}>Styled Box</Box>
  </Box>
</Grid>
```

### Component

```jsx live
function Home() {
  const Link = ({ to, ...rest }) => {
      return <a href={to} {...rest} />;
  };

  return (
    <Box>
      <Box component="b">
        Hello World!
      </Box>
      <Box component={Link} to="#custom-component">
        Click here!
      </Box>
    </Box>
  );
}
```

## Positioning & Spacing

Sets style as described below. Combinations are valid.
When `number` value, it will be multiplied by the `theme.shape.spacing` value.

`i` for `inset` (this one has no combinations).<br/>
`m` for `margin`<br/>
`p` for `padding`

`t` for `top`<br/>
`b` for `bottom`<br/>
`l` for `left`<br/>
`r` for `right`

`y` or `v` for `vertical` (combines only with `m` and `p`)<br/>
`x` or `h` for `horizontal` (combines only with `m` and `p`)<br/>

Examples:

```jsx
<Box i={2} />     // inset: theme.shape.spacing * 2
<Box t={2} />     // top: theme.shape.spacing * 2
<Box m={2} />     // margin: theme.shape.spacing * 2
<Box ml={2} />    // marginLeft: theme.shape.spacing * 2
<Box mr="5%" />   // marginRight: '5%'
<Box p="2rem" />  // padding: theme.typography.fontSize * 2 (also works on native)
<Box pr="16px" /> // paddingRight: '16px'
<Box pv="16px" /> // paddingVertical: '16px' (on web, sets paddingTop and paddingBottom)
<Box ph="16px" /> // paddingHorizontal: '16px' (on web, sets paddingLeft and paddingRight)
```

➤ Type: **`number` `string`** <br/>

## Gap

### Raw

Sets the spacing between children. The value is defined as described below:

The values of `gap`, `rowGap` and `columnGap` are used as raw:

Examples:

```jsx
<Box gap={16} /> // gap value is 16px
<Box gap="16px" /> // gap value is 16px
<Box gap="2rem" /> // gap value is 2rem (= 32px with default theme)
```

### Alias

Alias props can be used to multiply by the value defined on `theme.shape.gap`:

`g` for `gap`<br/>
`gx` for `columnGap`<br/>
`gy` for `rowGap`<br/>

Examples:

```jsx
<Box g={1} /> // gap value is 16px (value * theme.shape.gap * theme.shape.spacing)
<Box g="16px" /> // gap value is 16px
<Box g="2rem" /> // gap value is 2rem (= 32px with default theme)
```

➤ Type: **`number` `string`** <br/>

## Core Props

### **`className`**

For web only. <br/>
Defines the `class` attribute.

➤ Type: **`string`** <br/>

---

### **`component`**

Defines which element will be rendered.

➤ Type: **`string` `Component`** <br/>
➤ Default Web: **`'div'`** <br/>
➤ Default Native: **`View`** <br/>

---

### **`componentProps`**

Pass raw props to the `component` prop.

➤ Type: **`object`** <br/>

---

### **`mount`**

Defines whether the component will be rendered

➤ Type: **`boolean`** <br/>
➤ Default: **`true`** <br/>

---

### **`hidden`**

Fully hide element. May be a object with each breakpoint.

➤ Type: **`boolean` `object`** <br/>

```js
{
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  xxl?: boolean;
}
```

---

### **`invisible`**

Hides element but keeps its box sizes

➤ Type: **`boolean`** <br/>

---

### **`noRootStyles`**

Does not applies the box default styles (flexbox).

➤ Type: **`boolean`** <br/>

---

### **`platform`**

Apply props for a specific platform. For example:

```jsx
<Box
  platform={{
    web: { type: 'password' },
    native: { secureTextEntry: true },
  }}
/>
```

➤ Type: **`object`** <br/>

```js
{
  web: object
  native: object
  ios: object
  android: object
}
```

---

### **`rawStyle`**

**Web:** create inline styles.<br/>
**Native:** priorize styles.

➤ Type: **`object` `array`** <br/>

## Flexbox Container Props

### **`alignContent`**

Sets `alignContent` style.

➤ Type: **`'flex-start'` `'flex-end'` `'center'` `'stretch'`** <br/>
➤ Default: **`'flex-start'`** <br/>

---

### **`alignItems`**

Sets `alignItems` style.

➤ Type: **`'flex-start'` `'flex-end'` `'center'` `'stretch'` `'baseline'`** <br/>
➤ Default: **`'stretch'`** <br/>

---

### **`center`**

Sets `justifyContent`, `justifyItems`, `alignContent` and `alignItems` styles to `center`.

➤ Type: **`boolean`** <br/>

---

### **`column`**

Sets `flexDirection` style to `column`.

➤ Type: **`boolean`** <br/>

---

### **`direction`**

Sets `flexDirection` style.

➤ Type: **`'column'` `'row'` `'column-reverse'` `'row-reverse'`** <br/>
➤ Default: **`'column'`** <br/>

---

### **`justifyContent`**

Sets `justifyContent` style.

➤ Type: **`'flex-start'` `'flex-end'` `'center'` `'stretch'` `'space-between'` `'space-around'` `'space-evenly'`** <br/>
➤ Default: **`'flex-start'`** <br/>

---

### **`justifyItems`**

Sets `justifyItems` style.

➤ Type: **`'flex-start'` `'flex-end'` `'center'` `'stretch'` `'space-between'` `'space-around'` `'space-evenly'`** <br/>
➤ Default: **`'flex-start'`** <br/>

---

### **`noWrap`**

Sets `flexWrap` style to `no-wrap`.

➤ Type: **`boolean`** <br/>

---

### **`reverse`**

Sets `flexDirection` style to `row-reverse` or `column-reverse`, combined with props `row` or `column`.

➤ Type: **`boolean`** <br/>

---

### **`row`**

Sets `flexDirection` style to `row`.

➤ Type: **`boolean`** <br/>

---

### **`wrap`**

Sets `flexWrap` style. When `boolean`, the value will be `'wrap'`.

➤ Type: **`boolean` `'wrap'` `'nowrap'` `'wrap-reverse'`** <br/>
➤ Default: **`'nowrap'`** <br/>

## Flexbox Child Props

### **`align`**

Sets `alignSelf` style.

➤ Type: **`'flex-start'` `'flex-end'` `'center'` `'stretch'`** <br/>

---

### **`basis`**

Sets `flexBasis` style.

➤ Type: **`'auto'` `string` `number`** <br/>

---

### **`flex`**

Sets `flex` style to `1`.

➤ Type: **`boolean`** <br/>

---

### **`grow`**

Sets `flexGrow` style.

➤ Type: **`number`** <br/>

---

### **`justify`**

Sets `justifySelf` style.

➤ Type: **`'flex-start'` `'flex-end'` `'center'` `'space-between'` `'space-around'` `'space-evenly'` `'stretch'`** <br/>

---

### **`order`**

Sets `order` style.

➤ Type: **`number`** <br/>

---

### **`shrink`**

Sets `flexShrink` style.

➤ Type: **`number`** <br/>
➤ Default: **`0`** <br/>

## Accessibility

### **`accessibility`**

➤ Type: **`object`** <br/>

```js
{
  accessible: boolean
  hint: string
  label: string
  role: 'none' | 'button' | 'link'
        | 'search' | 'image' | 'alert'
        | 'checkbox' | 'combobox' | 'menu'
        | 'menubar' | 'menuitem' | 'progressbar'
        | 'radio' | 'radiogroup' | 'scrollbar'
        | 'spinbutton' | 'switch' | 'tab'
        | 'tablist' | 'timer' | 'toolbar'
  state: {
    busy: boolean
    checked: boolean
    disabled: boolean
    expanded: boolean
    selected: boolean
  }
  value: {
    max: number
    min: number
    now: number
    text: string
  }
}
```

## Styles

### **`style`**
To the current element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

---

### **`bg`**

Sets `backgroundColor` style.

➤ Type: **`string`** <br/>

---

### **`border`**

Sets `borderWidth`, `borderStyle` and `borderColor` styles. For example:
```jsx
<Box border />
<Box border={2} />
<Box border="purple" />
<Box border="1px solid purple" />
```

➤ Type: **`string`, `number`, `boolean`** <br/>

---

### **`corners`**

Sets `borderRadius` style. The set value will be multiplied by the `theme.shape.borderRadius` value.

➤ Type: **`number`** <br/>

---

### **`h`**

Sets `height` style.

➤ Type: **`number` `string`** <br/>

---

### **`hh`**

Sets `height`, `minHeight` and `maxHeight` styles.

➤ Type: **`number` `string`** <br/>

---

### **`lh`**

Sets `lineHeight` style.

➤ Type: **`number` `string`** <br/>

---

### **`maxh`**

Sets `maxHeight` style.

➤ Type: **`number` `string`** <br/>

---

### **`maxw`**

Sets `maxWidth` style.

➤ Type: **`number` `string`** <br/>

---

### **`minh`**

Sets `minHeight` style.

➤ Type: **`number` `string`** <br/>

---

### **`minw`**

Sets `minWidth` style.

➤ Type: **`number` `string`** <br/>

---

### **`position`**

Sets `position` style.

➤ Type: **`'relative'` `'absolute'`** <br/>

---

### **`w`**

Sets `width` style.

➤ Type: **`number` `string`** <br/>

---

### **`ww`**

Sets `width`, `minWidth` and `maxWidth` styles.

➤ Type: **`number` `string`** <br/>

---

## Events

### **`onPress`**

➤ Type: **`Function(Event)`** <br/>

---

### **`onPressIn`**

➤ Type: **`Function(Event)`** <br/>

---

### **`onPressOut`**

➤ Type: **`Function(Event)`** <br/>

---
