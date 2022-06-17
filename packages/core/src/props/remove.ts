// @ts-nocheck

export default function remove(props: string | string[], ...mixin: (Object | Array<any> | Function)[]) {
  if (!mixin || !props) {
    return;
  }

  if (!Array.isArray(props)) {
    props = [props];
  }

  for (const item of mixin) {
    if (!item) continue;

    if (Array.isArray(item)) {
      remove(props, ...item);
      return;
    }

    for (const prop of props) {
      delete item[prop];
    }
  }
}
