# Progress

Used to display the progress of a task.

## Import

```jsx
import { Progress } from '@react-bulk/web'; // OR @react-bulk/native
```

## Examples

### Basic

```jsx live
<Progress />
```

### Label

```jsx live
<Progress label={true} my={3} />
<Progress label={false} my={3} />
<Progress label={(value) => `Current percent is: ${value}.`} my={3} />
```

### Composition

```jsx live
function App() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((current) => {
        const newValue = current + 1;
        return newValue > 100 ? 0 : newValue;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Progress value={percent} />
}
```

## Props

Extends all [`Box`](/docs/components/core/box#props) props.

**`color`**

➤ Type: **`boolean`** <br/>
➤ Default: **`'primary'`**

---

**`label`**

- `true` (default): display progress percent label.
- `false`: don't display any label.
- `function`: display returned custom label.

➤ Type: **`boolean` | `(value: number) => string | ReactNode | JSX.Element`** <br/>
➤ Default: **`(value) => value + '%' `** <br/>

---

**`size`**

➤ Type: **`number` `'xsmall'` `'small'` `'medium'` `'large'` `'xlarge'`** <br/>
➤ Default: **`'medium'`** <br/>

---

**`value`**

Current progress percentage.

➤ Type: **`number`** <br/>

---

## Styles

**`style`** to the main element.

**`barStyle`** to the completion bar.

**`labelStyle`** to the percentage label.

➤ Type: **[`RbkStyles`](/docs/type-reference/rbk-styles)** <br/>
