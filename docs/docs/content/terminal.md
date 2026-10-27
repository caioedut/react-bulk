# Terminal

An interactive command-line emulator with history and custom commands.

## Import

```jsx
import { Terminal } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

Try `help`, `ping`, `echo hello` or `date`.

```jsx live
<Terminal h={240} />
```

### Custom Commands

A command can return a string (printed), call the terminal helpers, or be a string alias of another command.

```jsx live
<Terminal
  h={240}
  prompt=">"
  version="1.0.0"
  welcomeMessage="Type 'hello' or 'wait 1000'."
  commands={{
    hi: 'hello',
    hello: ({ args }) => `Hello, ${args || 'World'}!`,
    wait: async ({ args, info, success }) => {
      info(`Waiting ${args}ms...`);
      await new Promise((resolve) => setTimeout(resolve, Number(args)));
      success('Done!');
    },
  }}
/>
```

## Props

Extends all [`Scrollable`](/docs/core/scrollable#props) props.

### **`commands`**

Map of command name to handler. A handler receives `{ command, args, log, info, warning, success, error, clear, lock, unlock, focus }` and may return a string/number to print or a promise. A string value aliases another command.<br/>
Built-in commands: `clear` (`cls`), `date`, `echo`, `help`, `history`, `ping`, `sleep`, `version`.

➤ Type: **`{ [name: string]: string | (terminal) => any }`** <br/>

---

### **`prompt`**

Text shown before the input.

➤ Type: **`string`** <br/>
➤ Default: **`'$'`**

---

### **`version`**

Value printed by the `version` and `help` commands.

➤ Type: **`string`** <br/>
➤ Default: **`'0.0.0'`**

---

### **`welcomeMessage`**

First message shown in the terminal.

➤ Type: **`string`** <br/>
➤ Default: **`'Welcome to Terminal!'`**

## Styles

### **`style`**
To the root scrollable element.

➤ Type: **[`RbkStyle`](/docs/type-reference/rbk-style)** <br/>
