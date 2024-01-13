import { memo } from 'react';

import { AnyObject } from './types';

function BaseNative({ /* theme, */ children }: AnyObject) {
  return children;
}

export default memo(BaseNative);
