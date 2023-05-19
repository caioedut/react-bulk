export default function defined(value: any) {
  return ![undefined, null, NaN].includes(value);
}
