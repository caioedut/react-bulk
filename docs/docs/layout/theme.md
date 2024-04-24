---
sidebar_position: 3
---

# Theme

Allow you to customize all components and its defaults using theme. You own your design!

## Usage

```jsx title="src/index.js"
import ReactBulk from '@react-bulk/core';
import theme from './src/themes/main.js'

export default function App() {
  return (
    <ReactBulk theme={theme}>
      {/* other like contexts and routes */}
    </ReactBulk>
  );
}
```

## Basic

### Shape

```jsx title="src/themes/main.js"
export default {
  // other options
  shape: {
    borderRadius: 4,
    spacing: 4,
    gap: 4 // gap is generally multiplied by spacing
  },
};
```

### Typography

```jsx title="src/themes/main.js"
export default {
  // other options
  typography: {
    fontSize: 16,
    lineHeight: 1.15,
  },
};
```

### Colors

```jsx title="src/themes/main.js"
export default {
  // ...other options

  colors: {
    primary: '#8B5CF6',
    secondary: '#0D542D',

    info: '#0099CC',
    success: '#1C8A35',
    warning: '#B0620E',
    error: '#EF4444',

    // Create custom tokens
    customColorToken: '#ff00ff',

    amber: '#FFAB00',
    blue: '#2962FF',
    blueGray: '#455A64',
    brown: '#5D4037',
    cyan: '#00B8D4',
    deepOrange: '#DD2C00',
    deepPurple: '#6200EA',
    fuchsia: '#D946EF',
    gray: '#616161',
    green: '#00C853',
    indigo: '#304FFE',
    lime: '#AEEA00',
    orange: '#FF6D00',
    pink: '#C51162',
    purple: '#AA00FF',
    red: '#D50000',
    teal: '#00BFA5',
    violet: '#8B5CF6',
    yellow: '#FFD600',

    common: {
      transparent: 'rgba(0, 0, 0, 0)',
      trans: 'rgba(0, 0, 0, 0)',
      black: '#000000',
      white: '#ffffff',
    },
  },
};
```

```jsx live
function App() {
  const theme = useTheme();

  const predefined = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ];

  const other = [
    'amber',
    'blue',
    'blueGray',
    'brown',
    'cyan',
    'deepOrange',
    'deepPurple',
    'fuchsia',
    'gray',
    'green',
    'indigo',
    'lime',
    'orange',
    'pink',
    'purple',
    'red',
    'teal',
    'violet',
    'yellow',
  ];

  return [predefined, other].map((colors, index) => (
    <Grid key={index} gap={3} mb={6}>
      {colors.map((color) => (
        <Box key={color} bg={color} p={2}>
          <Text color={theme.contrast(color)}>{color}</Text>
        </Box>
      ))}
    </Grid>
  ));
}
```

### Breakpoints

```jsx title="src/themes/main.js"
export default {
  // ...other options

  breakpoints: {
    xs: 0,
    sm: 320,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
};
```

## Components

### Default Props

```jsx title="src/themes/main.js"
export default {
  // ...other options

  components: {
    Button: {
      defaultProps: {
        color: 'secondary',
        size: 'xlarge',
      }
    }
  },
};
```

### Default Styles

```jsx title="src/themes/main.js"
export default {
  // ...other options

  components: {
    Button: {
      defaultStyles: {
        root: {
          bg: 'secondary',
          borderRadius: 16,
        }
      }
    }
  },
};
```

### Variants

#### Example
```jsx title="src/themes/main.js"
export default {
  // ...other options

  components: {
    Text: {
      variants: {
        marked: {
          true: {
            root: { bg: 'yellow.main.25' }
          }
        },
        heading: {
          h1: {
            root: { fontSize: '3.5rem' }
          },
          h2: {
            root: { fontSize: '3rem' },
          },
          h3: {
            root: { fontSize: '2.5rem' },
          },
          h4: {
            root: { fontSize: '2rem' },
          },
          h5: {
            root: { fontSize: '1.5rem' },
          },
          h6: {
            root: { fontSize: '1rem' },
          },
        }
      }
    }
  },
};
```

#### Usage
```jsx
<Text marked>Marked Text!</Text>
<Text heading="h1">My H1!</Text>
<Text heading="h2">My H2!</Text>
<Text heading="h3">My H3!</Text>
<Text heading="h4">My H4!</Text>
<Text heading="h5">My H5!</Text>
<Text heading="h6">My H6!</Text>
```

