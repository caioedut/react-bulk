import { useCallback, useContext } from 'react';

import { Context } from '../ReactBulk';

export default function useResponder() {
  const { setResponder } = useContext(Context);

  const releaseResponder = useCallback(() => {
    setResponder(undefined);
  }, [setResponder]);

  return { setResponder, releaseResponder };
}
