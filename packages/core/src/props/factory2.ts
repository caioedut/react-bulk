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
  const fallbackProps = {};

  const variants: Variants = {};

  Object.entries(options?.defaultProps || {}).forEach(([prop, value]) => {
    fallbackProps[prop] = props?.[prop] ?? value;
  });

  Object.keys(options?.defaultStyles || {}).forEach((styleId: any) => {
    if (!options?.name) return;

    const name = options.name + (styleId === 'root' ? '' : `-${styleId}`);
    variants[styleId] = [global.styles[name]];
  });

  Object.entries(options?.variants || {}).forEach(([varAttr, varOptions]: any) => {
    if (!options?.name) return;

    const varValue = props[varAttr] ?? fallbackProps[varAttr];

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
  fallbackProps.accessibility = deepmerge(fallbackProps.accessibility, props?.accessibility);

  return { ...props, ...fallbackProps, variants };
}
