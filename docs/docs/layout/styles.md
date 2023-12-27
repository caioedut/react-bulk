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

alignContent<br/>
alignItems<br/>
alignSelf<br/>
aspectRatio<br/>
backfaceVisibility<br/>
backgroundColor<br/>
border<br/>
borderBottom<br/>
borderBottomColor<br/>
borderBottomEndRadius<br/>
borderBottomLeftRadius<br/>
borderBottomRightRadius<br/>
borderBottomStartRadius<br/>
borderBottomWidth<br/>
borderColor<br/>
borderEndColor<br/>
borderEndWidth<br/>
borderLeft<br/>
borderLeftColor<br/>
borderLeftWidth<br/>
borderRadius<br/>
borderRight<br/>
borderRightColor<br/>
borderRightWidth<br/>
borderStartColor<br/>
borderStartWidth<br/>
borderStyle<br/>
borderTop<br/>
borderTopColor<br/>
borderTopEndRadius<br/>
borderTopLeftRadius<br/>
borderTopRightRadius<br/>
borderTopStartRadius<br/>
borderTopWidth<br/>
borderWidth<br/>
bottom<br/>
boxShadow<br/>
color<br/>
display<br/>
flex<br/>
flexBasis<br/>
flexDirection<br/>
flexFlow<br/>
flexGrow<br/>
flexShrink<br/>
flexWrap<br/>
fontFamily<br/>
fontSize<br/>
fontStyle<br/>
fontVariant<br/>
fontWeight<br/>
height<br/>
justifyContent<br/>
justifyItems<br/>
justifySelf<br/>
justifySelf<br/>
left<br/>
letterSpacing<br/>
lineHeight<br/>
margin<br/>
marginBottom<br/>
marginHorizontal<br/>
marginLeft<br/>
marginRight<br/>
marginTop<br/>
marginVertical<br/>
maxHeight<br/>
maxWidth<br/>
opacity<br/>
order<br/>
overflow<br/>
padding<br/>
paddingBottom<br/>
paddingHorizontal<br/>
paddingLeft<br/>
paddingRight<br/>
paddingTop<br/>
paddingVertical<br/>
placeContent<br/>
placeItems<br/>
placeSelf<br/>
pointerEvents<br/>
position<br/>
right<br/>
textAlign<br/>
textTransform<br/>
top<br/>
width<br/>
zIndex<br/>
