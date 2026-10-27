<div align="center">
  <br>
  <a href="https://rbk.caioedut.com">
    <img src="https://rbk.caioedut.com/img/logo.svg" alt="React Bulk" height="64">
  </a>
  <br>
  <br>

  <p><strong>Complete and uniform UI for React Web and Native</strong></p>

  <a href="https://www.npmjs.com/package/@react-bulk/core"><img src="https://img.shields.io/npm/v/@react-bulk/core.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/@react-bulk/core"><img src="https://img.shields.io/npm/dm/@react-bulk/core.svg" alt="npm downloads" /></a>
  <a href="https://github.com/caioedut/react-bulk/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/@react-bulk/core.svg" alt="license" /></a>

  <p>
    <a href="https://rbk.caioedut.com/docs/getting-started/installation">Installation</a>
    ·
    <a href="https://rbk.caioedut.com/docs/category/core">Components</a>
    ·
    <a href="https://rbk.caioedut.com/docs/category/hooks">Hooks</a>
    ·
    <a href="https://rbk.caioedut.com/docs/layout/theme">Theme</a>
    ·
    <a href="https://rbk.caioedut.com/">📖 Documentation</a>
  </p>
</div>

## Why React Bulk

- **One codebase, web and native.** The same components and props render to the DOM and to React Native (CLI or Expo).
- **Style with props.** Every component extends `Box`, so spacing, flexbox, sizes and colors are just props: `<Card p={3} row center bg="primary" />`.
- **Theme-driven.** Spacing, colors, typography, breakpoints and per-component defaults and variants come from one theme, switchable at runtime (light/dark).
- **Responsive out of the box.** Breakpoints in `style`, `hidden` per breakpoint and a responsive `Grid`.
- **Batteries included.** Buttons, inputs, selects, date and PIN inputs, forms, modals, drawers, dropdowns, tabs, carousel, tables, toasts and more, plus hooks like `useTheme`, `useForm` and `useBreakpoints`.
- **Written in TypeScript.**

## Packages

| Package | Use it for |
| --- | --- |
| [`@react-bulk/web`](https://www.npmjs.com/package/@react-bulk/web) | React apps on the web (DOM) |
| [`@react-bulk/native`](https://www.npmjs.com/package/@react-bulk/native) | React Native CLI apps |
| [`@react-bulk/expo`](https://www.npmjs.com/package/@react-bulk/expo) | Expo apps (native, with optional web) |
| [`@react-bulk/core`](https://www.npmjs.com/package/@react-bulk/core) | Shared core: hooks, theme and types (installed with any of the above) |
| [`@react-bulk/mcp`](https://www.npmjs.com/package/@react-bulk/mcp) | MCP server that teaches AI assistants the React Bulk API |

## Installation

**React (web)**

```bash
yarn add react-dom @react-bulk/core @react-bulk/web
```

**React Native CLI**

```bash
yarn add react-native-svg @react-bulk/core @react-bulk/native
```

**Expo**

```bash
npx expo install react-native-svg
yarn add @react-bulk/core @react-bulk/expo
```

Requires `react >= 17`. React Native needs `react-native >= 0.71` and Expo needs `expo >= 52`. See the [installation guide](https://rbk.caioedut.com/docs/getting-started/installation) for details.

## Quick start

Wrap your app once with `ReactBulk`, then use the components. Import them from the package of your platform (`@react-bulk/web`, `@react-bulk/native` or `@react-bulk/expo`).

```jsx
import { Box, Button, Card, ReactBulk, Text } from '@react-bulk/web';

export default function App() {
  return (
    <ReactBulk theme={{ mode: 'light', colors: { primary: '#8B5CF6' } }}>
      <Card p={4} g={2} maxw={360} mx="auto" mt={8}>
        <Text variant="title">Hello, React Bulk</Text>
        <Text color="text.secondary">The same code runs on web and native.</Text>

        <Box row g={2}>
          <Button onPress={() => console.log('Saved')}>Save</Button>
          <Button variant="outline" color="error">
            Cancel
          </Button>
        </Box>
      </Card>
    </ReactBulk>
  );
}
```

Short aliases like `p`, `mx` and `g` are multiplied by the theme spacing, `row` and `center` set flexbox, and color props accept theme tokens such as `primary` or `text.secondary`. See [Box](https://rbk.caioedut.com/docs/core/box) and [Styles](https://rbk.caioedut.com/docs/layout/styles).

## Using with AI assistants (MCP)

`@react-bulk/mcp` is a [Model Context Protocol](https://modelcontextprotocol.io) server that gives AI assistants the React Bulk docs, component APIs, style rules and theme, and can validate React Bulk code.

Claude Code:

```bash
claude mcp add react-bulk -- npx -y @react-bulk/mcp
```

Other MCP clients (Claude Desktop, Cursor, VS Code…):

```json
{
  "mcpServers": {
    "react-bulk": {
      "command": "npx",
      "args": ["-y", "@react-bulk/mcp"]
    }
  }
}
```

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/caioedut/react-bulk).

## Sponsor

<a href="https://www.buymeacoffee.com/caioedut" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" width="180" height="50">
</a>

## License

[MIT](https://github.com/caioedut/react-bulk/blob/main/LICENSE.md) © Caio Teixeira
