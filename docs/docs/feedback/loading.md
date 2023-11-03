# Loading

Used to display a circular loading indicator.

## Import

```jsx
import { Loading } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Loading />
```

### Label

```jsx live
<Loading label='Fetching data...' />
```

## Props

Extends all [`Box`](/docs/components/box#props) props.

**`color`**

➤ Type: **`boolean`** <br/>
➤ Default: **`'primary'`**

---

**`label`**

➤ Type: **`string`** <br/>

---

**`size`**

➤ Type: **`number` `'xsmall'` `'small'` `'medium'` `'large'` `'xlarge'`** <br/>
➤ Default: **`'medium'`** <br/>

---

## Styles

**`style`** to the main element.

**`labelStyle`** to the label.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>
