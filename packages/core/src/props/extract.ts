// Extract some props from objects returning them and removing it from original
export default function extract(props: string[], ...mixin: Object[]) {
  if (!mixin || !props) {
    return;
  }

  const extracted = {};

  if (!Array.isArray(props)) {
    props = [props];
  }

  for (const item of mixin) {
    if (!item) continue;

    for (const prop of props) {
      if (!(prop in item)) {
        continue;
      }

      extracted[prop] = item[prop];
      delete item[prop];
    }
  }

  return extracted;
}
