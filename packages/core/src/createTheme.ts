import cometta from 'cometta';

import Platform from './Platform';
import registry from './libs/cometta';
import extract from './props/extract';
import base from './themes/base';
import dark from './themes/dark';
import light from './themes/light';
import { ThemeEditProps, ThemeProps } from './types';
import deepmerge from './utils/deepmerge';
import global from './utils/global';

export default function createTheme(options?: ThemeEditProps, extendsTo?: ThemeEditProps): ThemeProps | any {
  options = options || {};
  extendsTo = extendsTo || {};

  const mode = options?.mode || extendsTo?.mode || 'light';
  const reference = mode === 'dark' ? dark : light;

  // @ts-ignore
  const theme: ThemeProps = deepmerge(base, extendsTo, reference, options, { mode });

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
    cometta.createStyleSheet(
      `
*,
*:before,
*:after {
  box-sizing: border-box;
  font-family: inherit;
}

${Object.entries(theme.mixins.scroll)
  .map(([selector, styles]) => `${selector.substring(1)} { ${cometta.css(styles)} }`)
  .join(`\n`)}

html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Variable", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
}`,
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
        global.styles[name] = cometta.jss(style);
      }

      if (Platform.web) {
        global.styles[name] = cometta.sheet({
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
            global.styles[name] = cometta.jss(style);
          }

          if (Platform.web) {
            global.styles[name] = cometta.sheet({
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
