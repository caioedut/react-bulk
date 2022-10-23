---
sidebar_position: 2
---

# Configuration

On your root JSX file, include the React Bulk context as first parent.

```jsx title="src/index.js"
import ReactBulk from '@react-bulk/core';

export default function App() {
  return (
    <ReactBulk>
        {/* other like contexts and routes */}
    </ReactBulk>
  );
}
```
