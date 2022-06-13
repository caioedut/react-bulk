import React from 'react';

export default function createComponent(Component : any, props : any, ref : any) {
  const { children, ...rest } = props || {};

  return typeof Component === 'string' ? ( //
    React.createElement(Component, rest, children)
  ) : (
    <Component {...props} ref={ref} />
  );
}
