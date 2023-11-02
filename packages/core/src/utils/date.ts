export function dateify(input?: Date | number | string | null, avoidTimeZone = true) {
  if (!input) {
    input = new Date();
  }

  if (typeof input === 'number') {
    input = new Date(input);
  }

  if (input instanceof Date) {
    input = input.toISOString();
  }

  if (avoidTimeZone) {
    input = input.substring(0, 10);
  }

  return new Date(`${input}T12:00:00`);
}
