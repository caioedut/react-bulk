import { AnyObject } from '../types';

export default function omit(props: string | string[], ...mixin: AnyObject[]) {
  let result: AnyObject = {};

  if (!Array.isArray(props)) {
    props = [props];
  }

  for (const item of mixin) {
    if (!item) continue;

    if (Array.isArray(item)) {
      result = { ...result, ...omit(props, ...item) };
      continue;
    }

    for (const prop in item) {
      if (!props.includes(prop)) {
        result[prop] = item[prop];
      }
    }
  }

  return result;
}
