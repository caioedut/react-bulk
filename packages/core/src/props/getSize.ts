import { RbkSize } from '../types';
import pick from '../utils/pick';

export default function getSize(value?: RbkSize) {
  const sizes = {
    xsmall: 1.25,
    small: 1.75,
    medium: 2.25,
    large: 2.75,
    xlarge: 3.25,
  };

  if (typeof value === 'string') {
    value = pick(value, 'medium', sizes);
  }

  return typeof value === 'number' ? value : sizes.medium;
}
