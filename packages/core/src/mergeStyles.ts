export default function mergeStyles(...styles: Object[]) {
  let result = {};

  for (const style of styles) {
    if (style) {
      if (Array.isArray(style)) {
        result = mergeStyles(result, ...style);
      } else {
        result = { ...result, ...style };
      }
    }
  }

  return result;
}
