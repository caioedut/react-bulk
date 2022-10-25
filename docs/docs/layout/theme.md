---
sidebar_position: 2
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
  // other options
  colors: {
    primary: '#673ab7',
    secondary: '#009688',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',

    customColorToken: '#ff00ff',

    common: {
      trans: 'rgba(0, 0, 0, 0)',
      black: '#000000',
      white: '#ffffff',
      gray: '#808080',
    },
  },
};
```

### Breakpoints

```jsx title="src/themes/main.js"
export default {
  // other options
  breakpoints: {
    xs: 0,
    sm: 576,
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
  // other options
  components: {
    Button: {
      defaultProps: {
        color: 'secondary',
        size: 'xl',
      }
    }
  },
};
```

### Default Styles

```jsx title="src/themes/main.js"
export default {
  // other options
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
Coming soon...
