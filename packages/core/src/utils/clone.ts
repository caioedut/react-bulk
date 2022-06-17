// @ts-nocheck

export default function clone(mixin: Object | Array<any>) {
  let result = Array.isArray(mixin) ? [] : {};

  for (const key in mixin) {
    const item = mixin[key];

    let value = item;

    if (item && typeof item === 'object') {
      value = clone(item);
    }

    result[key] = value;
  }

  return result;
}
