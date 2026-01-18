import { AnyObject, RbkStyle, ThemeComponentProps } from '../types';
import deepmerge from '../utils/deepmerge';
import rbkGlobal from '../utils/global';

type Variants = {
  [key: string]: RbkStyle[];
};

export default function factory2<ComponentProps>(
  props,
  options: ThemeComponentProps<any>,
): ComponentProps & {
  variants: NonNullable<ComponentProps extends AnyObject ? ComponentProps['variants'] : {}>;
} {
  const fallbackProps = {};
  const variants: Variants = {};

  Object.entries(options?.defaultProps || {}).forEach(([prop, value]) => {
    fallbackProps[prop] = props?.[prop] ?? value;
  });

  Object.keys(options?.defaultStyles || {}).forEach((styleId: any) => {
    if (!options?.name) return;

    const name = options.name + (styleId === 'root' ? '' : `-${styleId}`);
    variants[styleId] = [rbkGlobal.styles[name]];
  });

  Object.entries(options?.variants || {}).forEach(([varAttr, varOptions]: any) => {
    if (!options?.name) return;

    const varValue = props[varAttr] ?? fallbackProps[varAttr];

    if (typeof varValue === 'undefined') return;

    const varStyles = varOptions[varValue] || {};

    Object.keys(varStyles).forEach((styleId: any) => {
      const name = `${options?.name}-${varAttr}-${varValue}` + (styleId === 'root' ? '' : `-${styleId}`);
      variants[styleId] = variants[styleId] || [];
      variants[styleId].push(rbkGlobal.styles[name]);
    });
  });

  Object.entries(props.variants || {}).forEach(([styleId, style]: any) => {
    variants[styleId] = variants[styleId] || [];
    variants[styleId].push(style);
  });

  // Extends accessibility
  // @ts-expect-error
  fallbackProps.accessibility = deepmerge(fallbackProps.accessibility, props?.accessibility);

  return { ...props, ...fallbackProps, variants };
}
