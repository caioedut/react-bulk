// @ts-nocheck

export default function merge(...mixin: (Object | Array<any> | Function | any)[]) {
  let result: any = {};

  for (const item of mixin) {
    if (typeof item !== 'object' || !item) continue;

    if (Array.isArray(item)) {
      result = merge(result, ...item);
    } else {
      result = { ...result, ...item };
    }
  }

  return result;
}
