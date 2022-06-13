import React from 'react';

export default function createComponent(Component, props, ref) {
  const { children, ...rest } = props || {};

  return typeof Component === 'string' ? ( //
    React.createElement(Component, rest, children)
  ) : (
    <Component {...props} ref={ref} />
  );
}
