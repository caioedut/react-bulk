# Docs

## Components

### Box
It is the primary component, factory for everything.
```jsx
<Box
  component={"div" | CustomComponent}

  // Flexbox container
  flexbox={boolean | 'flex' | 'flex-inline'}
  direction={'row' | 'row-reverse' | 'column' | 'column-reverse'}
  row={boolean}
  column={boolean}
  reverse={boolean}
  wrap={boolean | 'nowrap' | 'wrap' | 'wrap-reverse'}
  flow={tring}
  justifyContent={'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline'}
  alignContent={'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline'}
  justifyItems={'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline'}
  alignItems={'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline'}
  center={boolean}

  // Flexbox item
  flex={boolean}
  order={number}
  grow={number}
  shrink={number}
  basis={'auto' | number | string}
  align={'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline'}
  justify={'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'baseline'}

  // Bindings
  onPress={Function}
  onPressIn={Function}
  onPressOut={Function}
  onFocus={Function}
  onBlur={Function}
>
  This is my content.
</Box>
```

### Text
```jsx
<Text
  // Extends all Box properties.
  variant={'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'title' | 'subtitle' | 'caption'}
  size={number}
  color={string}
  center={boolean}
  left={boolean}
  right={boolean}
  justify={boolean}
  bold={boolean}
  italic={boolean}
  oblique={boolean}
  smallCaps={boolean}
  invisible={boolean}
  weight={'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'}
  transform={'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width'}
  numberOfLines={number}
>
  Hello World!
</Text>
```

### Button
```jsx
<Button
  // Extends all Box properties.
  variant={'solid' | 'outline' | 'text' | string}
  size={'small' | 'medium' | 'large' | string}
  block={Boolean}
  loading={Boolean}
  startIcon={React.ReactNode}
  endIcon={React.ReactNode}
>
  Buy Now!
</Button>
```

### Card
```jsx
<Card
  // Extends all Box properties.
>
  <Text>Hello World!</Text>
</Card>
```
