export default function dotObject(data: Record<any, any>) {
  const parsed = {};

  for (const baseAttr in data) {
    const attr = baseAttr.replace(/\[(.*)?]/g, (_, $1) => `.${$1 ?? 0}`);
    const value = data[baseAttr];
    const splitAttrs = attr.split('.');

    let splitAttr: string | undefined;
    let ref = parsed;

    while ((splitAttr = splitAttrs.shift())) {
      if (!ref[splitAttr]) {
        ref[splitAttr] = splitAttrs.length ? {} : value;
      }

      ref = ref[splitAttr];
    }
  }

  return resolve(parsed);
}

function resolve(items) {
  if (typeof items !== 'object' || !items) {
    return items;
  }

  // dont parse classes instances (like File or FileList)
  if (!Array.isArray(items) && items?.constructor?.name !== 'Object') {
    return items;
  }

  let newValue = items;

  if (!Array.isArray(items)) {
    const keys = Object.keys(items);

    if (keys.length) {
      keys.sort();

      if (keys.every((key, index) => Number(key) === index)) {
        newValue = Object.values(items);
      }
    }
  }

  for (const attr in newValue) {
    newValue[attr] = resolve(newValue[attr]);
  }

  return newValue;
}
