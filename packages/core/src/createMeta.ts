export default function createMeta(selector: string, props: object, overwrite = true) {
  selector = selector.trim().toLowerCase().startsWith('meta') ? selector : `meta${selector}`;

  let meta: any = document.querySelector(selector);

  if (!meta || overwrite) {
    meta = meta || document.createElement('meta');
    Object.entries(props).forEach(([attr, val]) => meta.setAttribute(attr, val));
    document.head.appendChild(meta);
  }

  return meta;
}
