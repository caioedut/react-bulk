import { Fragment } from 'react';

import { portalsRef } from './createPortal';
import useGlobalState from './hooks/useGlobalState';

export default function Portal() {
  useGlobalState('rbk-portals');

  return (
    <Fragment>
      {Object.entries(portalsRef.current).map(([key, children]) => (
        <Fragment key={key}>{children}</Fragment>
      ))}
    </Fragment>
  );
}
