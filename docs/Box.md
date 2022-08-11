[‹ Go Back](README.md)

# Box

It is the primary component, factory for everything. All components extends the `Box`.

## Props

### `component`

Defines which element will be rendered.

| Type                  | Default (Web) | Default (Native) |
|-----------------------|---------------|------------------|
| `string`, `Component` | `'div'`       | `View`           |

---

### `className`

For web only.
<br/>
Defines the `class` attribute.

| Type     |
|----------|
| `string` |

---

---

### `platform`

Apply props for a specific platform. For example:
```jsx
<Box
  platform={{
    web: { type: 'password' },
    native: { secureTextEntry: true },
  }}
/>
```

| Type                                                                |
|---------------------------------------------------------------------|
| ```{ web: object, native: object, ios: object, android: object }``` |

---

[‹ Go Back](README.md)
