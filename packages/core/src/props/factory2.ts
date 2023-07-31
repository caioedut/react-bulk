import { RbkStyles, ThemeComponentProps } from '../types';
import deepmerge from '../utils/deepmerge';
import global from '../utils/global';

type Variants = {
  [key: string]: RbkStyles;
};

export default function factory2<ComponentProps>(
  props,
  options: ThemeComponentProps<ComponentProps, any>,
): ComponentProps & { variants: Variants } {
  let newProps = { ...options?.defaultProps, ...props };

  const variants: Variants = {};

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

  // Extends accessibility
  // @ts-expect-error
  newProps.accessibility = deepmerge(options?.defaultProps?.accessibility, props?.accessibility);

  return { ...newProps, ...props, variants };
}
