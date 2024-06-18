import { useCallback, useContext } from 'react';

import RbkContext from '../RbkContext';

export default function useResponder() {
  const { setResponder } = useContext(RbkContext);

  const releaseResponder = useCallback(() => {
    setResponder(undefined);
  }, [setResponder]);

  return { setResponder, releaseResponder };
}
