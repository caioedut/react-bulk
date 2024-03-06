export default function defined(value: unknown) {
  if (value === null) {
    return false;
  }

  if (typeof value === 'undefined') {
    return false;
  }

  if (typeof value === 'number' && isNaN(value)) {
    return false;
  }

  return true;
}
