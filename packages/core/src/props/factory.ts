import clsx from '../utils/clsx';
import extract from './extract';

export default function factory(props, defaults) {
  defaults = defaults ? { ...defaults } : {};

  const classNameDefault = extract('className', defaults);
  const classNameProp = extract('className', props);
  const className = clsx(classNameDefault?.className, classNameProp?.className);

  return { ...defaults, ...props, className };
}
