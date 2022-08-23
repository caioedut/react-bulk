<center>

# <p style="color: #673ab7;">React Bulk</p>
Complete uniform UI for ReactJS and React Native.

[![npm](https://img.shields.io/npm/v/@react-bulk/core.svg?color=%23673ab7)](https://www.npmjs.com/package/@react-bulk/core)

</center>

---

## Installation

### React Web
```shell
yarn add @react-bulk/core @react-bulk/web
```

### React Native
```shell
yarn add @react-bulk/core @react-bulk/native
```

## Usage
[Read the Docs.](https://github.com/caioedut/react-bulk/blob/main/docs/README.md)

### Example
```jsx
import ReactBulk from '@react-bulk/core';
import { Box, Card, Text } from '@react-bulk/web'; // OR @react-bulk/native

export default function App() {
  const theme = {
    mode: 'dark',
    typography: {
      fontSize: 16
    },
    colors: {
      primary: {
        main: '#673ab7',
        light: '#9a67ea',
        dark: '#320b86',
      },
      secondary: {
        main: '#009688',
        light: '#52c7b8',
        dark: '#00675b',
      },
    },
  };

  return (
    <ReactBulk theme={theme}>
      <Box m={3}>
        <Card>
          <Text color="primary">Hello World!</Text>
        </Card>
      </Box>
    </ReactBulk>
  );
}
```