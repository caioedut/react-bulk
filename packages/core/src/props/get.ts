// @ts-nocheck

export default function get(prop: string, ...mixin: (Object | Array<any> | Function)[]) {
  let result: any;

  for (const item of mixin) {
    if (!item) continue;

    if (Array.isArray(item)) {
      result = get(prop, ...item) ?? result;
    }

    result = item?.[prop] ?? result;
  }

  return result;
}
