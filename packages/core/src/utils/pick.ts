export default function pick(option: string, defaultOption: string, options: object = {}) {
  return options?.[option] ?? options?.[defaultOption];
}
