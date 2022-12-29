import { ThemeComponentProps } from '../types';
import global from '../utils/global';

export default function factory2(props, options?: ThemeComponentProps) {
  let newProps = { ...options?.defaultProps, ...props };

  const variants = {};

  Object.keys(options?.defaultStyles || {}).forEach((styleId: any) => {
    if (!options?.name) return;

    const name = options.name + (styleId === 'root' ? '' : `-${styleId}`);
    variants[styleId] = [global.styles[name]];
  });

  Object.entries(options?.variants || {}).forEach(([varAttr, varOptions]: any) => {
    if (!options?.name) return;

    const varValue = newProps[varAttr];

    if (typeof varValue === 'undefined') return;

    const varStyles = varOptions[varValue] || {};

    Object.keys(varStyles).forEach((styleId: any) => {
      const name = `${options?.name}-${varAttr}-${varValue}` + (styleId === 'root' ? '' : `-${styleId}`);
      variants[styleId] = variants[styleId] || [];
      variants[styleId].push(global.styles[name]);
    });
  });

  return { ...newProps, ...props, variants };
}
