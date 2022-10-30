export default function different(value: string | number, ...otherValues: Array<string | number>) {
  for (let otherValue of otherValues) {
    if (otherValue !== value) return true;
  }

  return false;
}
