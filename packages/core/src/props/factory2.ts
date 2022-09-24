import createStyle from '../createStyle';
import { ThemeComponentProps, ThemeProps } from '../types';

export default function factory2(props, options?: ThemeComponentProps, theme?: ThemeProps) {
  let newProps = { ...options?.defaultProps, ...props };

  const variants = {};

  Object.entries(options?.variants || {}).forEach(([varAttr, varOptions]: any) => {
    const varValue = newProps[varAttr];

    if (typeof varValue !== 'undefined') {
      newProps = { ...newProps, ...varOptions[varValue]?.props };

      const varStyles = varOptions[varValue]?.styles || {};

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
    }
  });

  return { ...newProps, ...props, variants };
}
