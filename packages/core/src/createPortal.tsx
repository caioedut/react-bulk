import { Fragment, useEffect } from 'react';

import usePortals from './hooks/usePortals';
import { ReactElement } from './types';

function PortalItem({ portalKey, children }) {
  const [, setPortals] = usePortals();

  useEffect(() => {
    setPortals((current) => ({ ...current, [portalKey]: children }));
  }, [portalKey, children, setPortals]);

  useEffect(() => {
    return () => {
      setPortals((current) => {
        delete current[portalKey];
        return { ...current };
      });
    };
  }, [portalKey, setPortals]);

  return <Fragment />;
}

export default function createPortal(key: string, children?: ReactElement) {
  return (
    <PortalItem key={key} portalKey={key}>
      {children}
    </PortalItem>
  );
}
