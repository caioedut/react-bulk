# useAnimation

Used to programatically animate an item.

## Import

```jsx
import { useAnimation } from '@react-bulk/core'; // OR @react-bulk/native
```

## Usage

```jsx live
function App() {
  const from = { width: 40, height: 40 };
  const to = { width: 200, height: 200 };

  const sizeAnim = useAnimation(from);

  return (
    <Grid gap>
      <Box>
        <Button onPress={() => sizeAnim.start({
          from,
          to,
        })}>Forward</Button>
      </Box>
      <Box>
        <Button onPress={() => sizeAnim.start({
          from: to,
          to: from,
        })}>Backward</Button>
      </Box>
      <Box>
        <Button onPress={() => sizeAnim.start({
          to,
          iterations: 3,
        })}>Repeat 3x</Button>
      </Box>
      <Box>
        <Button onPress={() => sizeAnim.start({
          to,
          boomerang: true
        })}>Boomerang</Button>
      </Box>
      <Box>
        <Button onPress={() => sizeAnim.start({
          to,
          iterations: 3,
          boomerang: true,
        })}>3x Boomerang</Button>
      </Box>
      <Box>
        <Button onPress={() => sizeAnim.start({
          to,
          iterations: 'infinite',
          boomerang: true,
        })}>Infinite</Button>
      </Box>
      <Box>
        <Button color="warning" onPress={() => sizeAnim.stop()}>
          Stop
        </Button>
      </Box>
      <Box>
        <Button color="error" onPress={() => sizeAnim.reset()}>
          Reset
        </Button>
      </Box>
      <Box xs={12}>
        <Box border="1px solid primary" align="start" {...sizeAnim.props} />
      </Box>
    </Grid>
  );
}
```

## Options

**`boomerang`**

➤ Type: **`boolean`** <br/>
➤ Default: **`false`** <br/>

---

**`delay`**

Delay in milliseconds to start the animation.

➤ Type: **`number`** <br/>
➤ Default: **`0`** <br/>

---

**`duration`**

Animation duration in milliseconds.

➤ Type: **`number`** <br/>
➤ Default: **`350`** <br/>

---

**`from`**

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

---

**`iterations`**

➤ Type: **`number` `'infinite'`** <br/>
➤ Default: **`1`** <br/>

---

**`throttle`**

For native only.

Used to prevent animation frames from being triggered too frequently.

➤ Type: **`number`** <br/>
➤ Default: **`0`** <br/>

---

**`timing`**

➤ Type: **`'linear'` `'ease'` `'ease-in'` `'ease-out'` `'ease-in-out'`** <br/>
➤ Default: **`'linear'`** <br/>

---

**`to`**

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>

---

**`web_useRawStyle`**

For web only.

Use `style` attribute instead of CSS `animation` API.

➤ Type: **`boolean`** <br/>
➤ Default: **`false`** <br/>

---
