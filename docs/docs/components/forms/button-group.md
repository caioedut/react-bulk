# Button Group

Used to group multiple buttons into a single scrollable container.

## Examples

### Basic

```jsx live
<ButtonGroup>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>
```

### Variants

```jsx live
<Grid column center gap={3}>
  <Box>
    <ButtonGroup variant="solid">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </Box>
  <Box>
    <ButtonGroup variant="outline">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </Box>
  <Box>
    <ButtonGroup variant="outline">
      <Button>One</Button>
      <Button variant="solid">Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </Box>
</Grid>
```

### Sizes

```jsx live
<Grid column center gap={3}>
  <Box>
    <ButtonGroup size="xsmall">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </Box>
  <Box>
    <ButtonGroup size="small">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </Box>
  <Box>
    <ButtonGroup size="medium">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </Box>
  <Box>
    <ButtonGroup size="large">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </Box>
  <Box>
    <ButtonGroup size="xlarge">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </Box>
</Grid>
```

## Props

**`color`**

➤ Type: **`string`** <br/>
➤ Default: **`primary`**

---

**`disabled`**

➤ Type: **`boolean`** <br/>

---

**`size`**

➤ Type: **`'small'` `'medium'` `'large'` `'xlarge'`** <br/>
➤ Default: **`medium`**

---

**`variant`**

➤ Type: **`'solid'` `'outline'` `'text'`** <br/>
➤ Default: **`solid`**

---

## Styles

**`style`** to the outer wrapper element ([Scrollable](/docs/components/core/scrollable)).

**`contentStyle`** to the inner wrapper of `children` or `label`.
