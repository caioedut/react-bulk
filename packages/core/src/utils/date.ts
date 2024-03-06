export function dateify(input?: Date | number | string | null) {
  if (!input) {
    input = new Date();
  }

  if (typeof input === 'number') {
    input = new Date(input);
  }

  if (input instanceof Date) {
    input = [
      input.getFullYear(),
      `${input.getMonth() + 1}`.padStart(2, '0'),
      `${input.getDate()}`.padStart(2, '0'),
    ].join('-');
  }

  return new Date(`${input.substring(0, 10)}T12:00:00`);
}
