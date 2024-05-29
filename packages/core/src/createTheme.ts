import { createStyleSheet, normalize } from 'cometta';

import Platform from './Platform';
import registry from './libs/cometta';
import extract from './props/extract';
import css from './styles/css';
import jss from './styles/jss';
import sheet from './styles/sheet';
import base from './themes/base';
import dark from './themes/dark';
import light from './themes/light';
import { ThemeEditProps, ThemeProps } from './types';
import deepmerge from './utils/deepmerge';
import global from './utils/global';

export default function createTheme(options?: ThemeEditProps): ThemeProps {
  options = options || {};

  const mode = options?.mode || 'light';
  const reference = mode === 'dark' ? dark : light;
  const theme: ThemeProps = deepmerge(base, reference, options, { mode });

  // Parse colors
  if (theme.colors) {
    for (const prop in theme.colors) {
      const color = theme.colors[prop];

      if (typeof color === 'string') {
        theme.colors[prop] = { main: color };
      }

      const main = theme.colors?.[prop]?.main;

      if (!main) {
        continue;
      }

      const light = theme.colors?.[prop]?.light;
      const lighter = theme.colors?.[prop]?.lighter;
      const dark = theme.colors?.[prop]?.dark;
      const darker = theme.colors?.[prop]?.darker;
      const contrast = theme.colors?.[prop]?.contrast;

      if (!light) {
        theme.colors[prop].light = theme.color(main, null, '50%');
      }

      if (!lighter) {
        theme.colors[prop].lighter = theme.color(main, null, '100%');
      }

      if (!dark) {
        theme.colors[prop].dark = theme.color(main, null, '-50%');
      }

      if (!darker) {
        theme.colors[prop].darker = theme.color(main, null, '-100%');
      }

      if (!contrast) {
        theme.colors[prop].contrast = theme.contrast(main);
      }
    }
  }

  // Config Cometta
  registry(theme);

  if (Platform.web) {
    // Normalize CSS
    normalize();

    // Global RBK Styles
    createStyleSheet(
      `
html {
  font-size: ${theme.typography.fontSize}px;
  line-height: ${theme.typography.lineHeight};
  height: 100%;
}

body {
  background-color: ${theme.colors.background.secondary};
  color: ${theme.colors.text.primary};
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

${Object.entries(theme.mixins.scroll)
  .map(([selector, styles]) => `${selector.substring(1)} { ${css(styles)} }`)
  .join(`\n`)}
`,
      { uniqueId: 'rbk-global', prepend: true },
    );
  }

  const components = { ...theme.components };

  const ordered = extract(
    ['Box', 'Text', 'Outline', 'Label', 'Backdrop', 'Scrollable', 'Card', 'Dropdown', 'Button', 'ButtonGroup'],
    components,
  );

  const list = [...Object.values(ordered), ...Object.values(components)];

  list.forEach((component: any) => {
    const componentName = component?.name;
    const styles = component?.defaultStyles || {};

    if (!componentName) return;

    for (const prop in styles) {
      const style = styles?.[prop];
      const name = componentName + (prop === 'root' ? '' : `-${prop}`);

      if (Platform.native) {
        global.styles[name] = jss(style);
      }

      if (Platform.web) {
        global.styles[name] = sheet({
          __className: name,
          ...style,
        });
      }
    }

    // Generate variant styles
    Object.entries(component?.variants || {}).forEach(([varAttr, varOptions]: any) => {
      Object.entries(varOptions).map(([optionKey, optionVal]: any) => {
        Object.entries(optionVal || {}).forEach(([styleId, style]: any) => {
          const name = `${componentName}-${varAttr}-${optionKey}` + (styleId === 'root' ? '' : `-${styleId}`);

          if (Platform.native) {
            global.styles[name] = jss(style);
          }

          if (Platform.web) {
            global.styles[name] = sheet({
              __className: name,
              ...style,
            });
          }
        });
      });
    });
  });

  global.theme = theme;

  return theme;
}
