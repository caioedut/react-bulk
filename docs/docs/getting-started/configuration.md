# Configuration

Wrap your root JSX component with the appropriate **React Bulk** context provider based on your platform.

```jsx
// For React Web
import { ReactBulk } from '@react-bulk/web';

// For React Native CLI
// import { ReactBulk } from '@react-bulk/native';

// For Expo
// import { ReactBulk } from '@react-bulk/expo';

export default function App() {
  return (
    <ReactBulk>
      {/* Other providers, contexts, or routes go here */}
    </ReactBulk>
  );
}
```

:::note
Make sure to import the correct `ReactBulk` provider according to your platform:
- Web: `@react-bulk/web`
- React Native CLI: `@react-bulk/native`
- Expo: `@react-bulk/expo`
:::
