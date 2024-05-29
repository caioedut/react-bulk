export default function isObject(value: any) {
  return Boolean(value) && !Array.isArray(value) && typeof value === 'object';
}
