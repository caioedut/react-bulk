# Configuration

On your root JSX file, include the React Bulk context as first parent.

```jsx
import ReactBulk from '@react-bulk/web'; // OR @react-bulk/native

export default function App() {
  return (
    <ReactBulk>
        {/* other like contexts and routes */}
    </ReactBulk>
  );
}
```
