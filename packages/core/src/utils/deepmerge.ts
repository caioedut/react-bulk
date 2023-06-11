import { all } from 'deepmerge';

export default function deepmerge(...mixed: any[]): (typeof mixed)[0] {
  return all(
    mixed.map((obj) => obj ?? {}),
    { arrayMerge: (_, next) => next },
  );
}
