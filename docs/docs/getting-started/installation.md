---
sidebar_position: 1
---

# Installation

Start by adding **React Bulk** as a dependency:

## React Web (DOM)

```bash
yarn add react-dom @react-bulk/core @react-bulk/web
```

:::note
Make sure you have `react` and `react-dom` installed as dependencies with versions `>= 17.0.0`.
:::

## React Native (CLI)

```bash
yarn add react-native-svg @react-bulk/core @react-bulk/native
```

:::note
Make sure you have `react >= 17.0.0`, `react-native >= 0.71.0` and `react-native-svg` installed as dependencies.
:::

## Expo (Native + optional Web)

```bash
npx expo install react-native-svg
yarn add @react-bulk/core @react-bulk/expo
```

:::note
Make sure you have `expo >= 52.0.0` and `react-native-svg`.
Expo automatically includes the correct version of `react`, `react-native` and other peer dependencies.
:::
