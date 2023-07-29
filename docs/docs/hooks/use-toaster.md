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

➤ Type: **`string` [`RbkColors`](/docs/type-reference/rbk-colors)** <br/>
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

