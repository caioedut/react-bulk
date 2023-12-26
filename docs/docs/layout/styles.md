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

## Props

Some styles can be applied using props. See all of them below:

```jsx
[
 "alignContent",
 "alignItems",
 "alignSelf",
 "aspectRatio",
 "backfaceVisibility",
 "backgroundColor",
 "border",
 "borderBottom",
 "borderBottomColor",
 "borderBottomEndRadius",
 "borderBottomLeftRadius",
 "borderBottomRightRadius",
 "borderBottomStartRadius",
 "borderBottomWidth",
 "borderColor",
 "borderEndColor",
 "borderEndWidth",
 "borderLeft",
 "borderLeftColor",
 "borderLeftWidth",
 "borderRadius",
 "borderRight",
 "borderRightColor",
 "borderRightWidth",
 "borderStartColor",
 "borderStartWidth",
 "borderStyle",
 "borderTop",
 "borderTopColor",
 "borderTopEndRadius",
 "borderTopLeftRadius",
 "borderTopRightRadius",
 "borderTopStartRadius",
 "borderTopWidth",
 "borderWidth",
 "bottom",
 "boxShadow",
 "color",
 "display",
 "flex",
 "flexBasis",
 "flexDirection",
 "flexFlow",
 "flexGrow",
 "flexShrink",
 "flexWrap",
 "fontFamily",
 "fontSize",
 "fontStyle",
 "fontVariant",
 "fontWeight",
 "height",
 "justifyContent",
 "justifyItems",
 "justifySelf",
 "justifySelf",
 "left",
 "letterSpacing",
 "lineHeight",
 "margin",
 "marginBottom",
 "marginHorizontal",
 "marginLeft",
 "marginRight",
 "marginTop",
 "marginVertical",
 "maxHeight",
 "maxWidth",
 "opacity",
 "order",
 "overflow",
 "padding",
 "paddingBottom",
 "paddingHorizontal",
 "paddingLeft",
 "paddingRight",
 "paddingTop",
 "paddingVertical",
 "placeContent",
 "placeItems",
 "placeSelf",
 "pointerEvents",
 "position",
 "right",
 "textAlign",
 "textTransform",
 "top",
 "width",
 "zIndex",
]
```
