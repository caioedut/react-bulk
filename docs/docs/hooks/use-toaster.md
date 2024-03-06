# useToaster

Used to easily create and manage notifications (toasts)

## Import

```jsx
import { useToaster } from '@react-bulk/core'; // OR @react-bulk/native
```

## Usage

```jsx live
function App() {
  const toaster = useToaster();

  function handleToaster() {
    toaster.open('Hello World!')
  }

  return (
    <Box center>
      <Button mb={3} onPress={handleToaster}>Toast It!</Button>
    </Box>
  );
}
```

## Options

**`color`**

➤ Type: **`string` [`RbkColor`](/docs/type-reference/rbk-color)** <br/>
➤ Default: **`gray.dark`**

---

**`content`**

➤ Type: **`string | ReactNode | ReactElement | JSX.Element`** <br/>

---

**`duration`**

Display duration in milliseconds.

➤ Type: **`number`** <br/>
➤ Default: **`4000`**

---

**`halign`**

Horizontal alignment.

➤ Type: **`'left'` `'right'` `'center'`** <br/>
➤ Default: **`'left'`** <br/>

---

**`valign`**

Vertical alignment.

➤ Type: **`'top'` `'bottom'`** <br/>
➤ Default: **`'bottom'`** <br/>

---

**`width`**

➤ Type: **`number`** <br/>

---

**`onPress`**

➤ Type: **`Function(Event)`** <br/>

---

## Methods

**open(options: `string` | `object`)**

`toaster.open(options)`

---

**close()**

`toaster.close()`

---

### Default Colors

**primary(options: `string` | `object`)**

`toaster.primary(options)`

---

**secondary(options: `string` | `object`)**

`toaster.secondary(options)`

---

**info(options: `string` | `object`)**

`toaster.info(options)`

---

**success(options: `string` | `object`)**

`toaster.success(options)`

---

**warning(options: `string` | `object`)**

`toaster.warning(options)`

---

**error(options: `string` | `object`)**

`toaster.error(options)`

---

