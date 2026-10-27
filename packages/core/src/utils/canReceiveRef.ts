import React from 'react';

const isReact19 = Number(React.version?.split('.')[0]) >= 19;

const MEMO_TYPE = Symbol.for('react.memo');

// React < 19 warns when a ref is given to a plain function component
export default function canReceiveRef(Component: any): boolean {
  if (isReact19 || !Component || typeof Component === 'string') {
    return true;
  }

  // Class components
  if (typeof Component === 'function') {
    return Boolean(Component.prototype?.isReactComponent);
  }

  if (Component.$$typeof === MEMO_TYPE) {
    return canReceiveRef(Component.type);
  }

  // forwardRef, lazy, etc.
  return true;
}
