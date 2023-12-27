import { Fragment, MutableRefObject, createRef, useEffect } from 'react';

import useGlobalState from './hooks/useGlobalState';
import { ReactElement } from './types';

export const portalsRef: MutableRefObject<any> = createRef();

portalsRef.current = {};

function PortalItem({ portalKey, children }) {
  const [_, setState] = useGlobalState('rbk-portals');

  useEffect(() => {
    portalsRef.current[portalKey] = children;
    setState(Date.now());
  }, [portalKey, children]);

  useEffect(() => {
    return () => {
      delete portalsRef.current[portalKey];
      setState(Date.now());
    };
  }, [portalKey]);

  return <Fragment />;
}

export default function createPortal(key: string, children?: ReactElement) {
  return (
    <PortalItem key={key} portalKey={key}>
      {children}
    </PortalItem>
  );
}
