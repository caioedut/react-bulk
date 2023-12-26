---
sidebar_position: 1
---

# Styles

## Nested

Use `&` combined with the CSS selector to style it however you want. It only works on the **web**.

```jsx live
<Box
  style={{
    '& small': {
      fontSize: 12
    }
  }}
>
  Hello
  <small>World!</small>
</Box>
```

## Pseudo-classes

Use `&` combined with the pseudo-class (like `:hover`) to style it however you want. It only works on the **web**.

### Hover

```jsx live
<Box
  style={{
    '&:hover': {
      backgroundColor: '#CCCCCC'
    }
  }}
>
  Hover Me
</Box>
```

### Focus

```jsx live
<Box
  component="a"
  href="#"
  style={{
    '&:focus': {
      border: '1px solid primary'
    }
  }}
>
  Focus Me
</Box>
```
