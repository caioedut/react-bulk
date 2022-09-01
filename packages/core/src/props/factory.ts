import extract from './extract';

export default function factory(props, { ...defaults }) {
  const defaultStyle = extract('style', defaults)?.style;

  return {
    ...defaults,
    ...props,
    defaultStyle,
  };
}
