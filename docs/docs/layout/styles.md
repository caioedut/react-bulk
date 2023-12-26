---
sidebar_position: 1
---

# Styles

## Pseudo-classes

Use `&` combined with the pseudo-class (like `:hover`) to style it however you want. It only works on the web.

### Hover

```jsx live
<Box
  style={{
    '&:hover': {
      backgroundColor: '#DDDDDD'
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
