export default function string(value: any): string {
  if ([null, undefined].includes(value)) {
    return '';
  }

  if (!Number.isNaN(Number(value))) {
    return value.toString();
  }

  return `${value || ''}`;
}
