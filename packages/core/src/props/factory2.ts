import createStyle from '../createStyle';
import { ThemeComponentProps, ThemeProps } from '../types';

export default function factory2(props, options?: ThemeComponentProps, theme?: ThemeProps) {
  let newProps = { ...options?.defaultProps, ...props };

  const variants = {};

  Object.entries(options?.defaultStyles || {}).forEach(([styleId, styleCss]: any) => {
    if (!options?.name) return;

    variants[styleId] = [
      createStyle({
        theme,
        style: styleCss,
        name: options.name + (styleId === 'root' ? '' : `-${styleId}`),
      }),
    ];
  });

  Object.entries(options?.variants || {}).forEach(([varAttr, varOptions]: any) => {
    const varValue = newProps[varAttr];

    if (!options?.name) return;
    if (typeof varValue === 'undefined') return;

    newProps = { ...newProps, ...varOptions[varValue]?.props };

    const varStyles = varOptions[varValue] || {};

    Object.entries(varStyles).forEach(([styleId, styleCss]: any) => {
      variants[styleId] = variants[styleId] || [];

      variants[styleId].push(
        createStyle({
          theme,
          style: styleCss,
          name: `${options?.name}-${varAttr}-${varValue}` + (styleId === 'root' ? '' : `-${styleId}`),
        }),
      );
    });
  });

  return { ...newProps, ...props, variants };
}
