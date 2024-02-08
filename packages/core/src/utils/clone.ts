export default function clone(mixin: any) {
  const result = Array.isArray(mixin) ? [] : {};

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
