---
sidebar_position: 1
---

# Button

```jsx live
<Button>Button</Button>
```

## Examples

### Variants

```jsx live
<Grid column center gap={3}>
  <Box>
    <Button variant="solid">Solid</Button>
  </Box>
  <Box>
    <Button variant="outline">Outline</Button>
  </Box>
  <Box>
    <Button variant="text">Text</Button>
  </Box>
</Grid>
```

### Sizes

```jsx live
<Grid column center gap={3}>
  <Box>
    <Button size="xsmall">Button</Button>
  </Box>
  <Box>
    <Button size="small">Button</Button>
  </Box>
  <Box>
    <Button size="medium">Button</Button>
  </Box>
  <Box>
    <Button size="large">Button</Button>
  </Box>
  <Box>
    <Button size="xlarge">Button</Button>
  </Box>
</Grid>
```

### Loading

Try press the buttons.

```jsx live
function Home () {
  const [loading, setLoading] = useState(true);

  const handleToggleLoading = () => setLoading(!loading);

  return (
    <Grid center gap={3}>
      <Box>
        <Button loading={loading} onPress={handleToggleLoading}>
          🡢
        </Button>
      </Box>
      <Box>
        <Button loading={loading} onPress={handleToggleLoading}>Button</Button>
      </Box>
    </Grid>
  )
}
```

### Group and Toggle

[Learn more about `ButtonGroup`](/docs/components/forms/button-group).

```jsx live
function Home() {
  const [state, setState] = useState('edit');

  return (
    <ButtonGroup variant="solid" size="small">
      <Button variant={state !== 'edit' && 'outline'} onPress={() => setState('edit')}>
        Edit
      </Button>
      <Button variant={state !== 'preview' && 'outline'} onPress={() => setState('preview')}>
        Preview
      </Button>
    </ButtonGroup>
  );
}
```

## Props

Button extends all [`Box`](/docs/components/core/box) props.

**`autoFocus`**

If `true`, focuses the input on `componentDidMount` or `useEffect`.

➤ Type: **`boolean`** <br/>
➤ Default: **`false`** <br/>

---

**`badge`**

➤ Type: **`number`, [`BadgeProps`](/docs/components/data-display/badge#props)** <br/>
➤ Default: **`false`**

---

**`color`**

➤ Type: **`string`** <br/>
➤ Default: **`primary`**

---

**`contentStyle`**

➤ Type: **`object` `array`** <br/>

---

**`disabled`**

➤ Type: **`boolean`** <br/>
➤ Default: **`false`**

---

**`endIcon`**

➤ Type: **`string` `ReactNode`** <br/>

---

**`href`**

For web only.

➤ Type: **`string`** <br/>

---

**`icon`**

Alias for `startIcon`.

➤ Type: **`string` `ReactNode`** <br/>

---

**`loading`**

➤ Type: **`boolean`** <br/>
➤ Default: **`false`**

---

**`label`**

Render text label as child.

➤ Type: **`string`** <br/>

---

**`labelStyle`**

➤ Type: **`object` `array`** <br/>

---

**`rounded`**

➤ Type: **`boolean`** <br/>
➤ Default: **`false`**

---

**`size`**

➤ Type: **`'small'` `'medium'` `'large'` `'xlarge'`** <br/>
➤ Default: **`medium`**

---

**`startIcon`**

➤ Type: **`string` `ReactNode`** <br/>

---

**`transform`**

Sets `textTransform` style for label.

➤ Type: **`'none'` `'captalize'` `'uppercase'` `'lowercase'` `'full-width'`** <br/>

---

**`type`**

➤ Type: **`'button'` `'submit'` `'cancel'` `'clear'`** <br/>
➤ Default: **`button`**

---

**`variant`**

➤ Type: **`'solid'` `'outline'` `'text'`** <br/>
➤ Default: **`solid`**

---

## Styles

**`style`** to the button element.

**`contentStyle`** to the wrapper of children or label.

➤ Type: **`RbkStyle`** <br/>

---

## Events

**`onBlur`**

➤ Type: **`Function(RbkEvent)`** <br/>

---

**`onFocus`**

➤ Type: **`Function(RbkEvent)`** <br/>

---

**`onPress`**

➤ Type: **`Function(RbkEvent)`** <br/>

---

**`onPressIn`**

➤ Type: **`Function(RbkEvent)`** <br/>

---

**`onPressOut`**

➤ Type: **`Function(RbkEvent)`** <br/>

---
