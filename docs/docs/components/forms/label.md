# Label

Used to create caption for an item in a user interface.

## Import

```jsx
import { Label } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Label>Full name</Label>
```

### Reference

```jsx live
function Home () {
  const inputRef = useRef();

  return (
    <Grid column gap={3} maxw={400}>
      <Box>
        <Input ref={inputRef} />
      </Box>
      <Box>
        <Label for={inputRef} bold>Custom label "for". Press me!</Label>
      </Box>
    </Grid>
  );
}
```


### Composition

```jsx live
<Grid column gap={3} maxw={400}>
  <Box>
    <Input label="Full name" />
  </Box>
  <Box>
    <Select
      label="Theme"
      options={[
        {value: 1, label: 'Light'},
        {value: 2, label: 'Dark'},
      ]}
    />
  </Box>
  <Box>
    <Checkbox label="Accept terms!" />
  </Box>
</Grid>
```

## Props

Extends all [`Text`](/docs/components/core/text#props) props.

**`for`**

➤ Type: **`string` `RefObject<ReactNode>`** <br/>

---

## Styles

**`style`** to the main element.

➤ Type: **[`RbkStyles`](/docs/type-reference/rbk-styles)** <br/>

---
