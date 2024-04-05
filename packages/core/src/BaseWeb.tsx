import { memo } from 'react';

import createMeta from './createMeta';
import { AnyObject } from './types';

function BaseWeb({ /* theme, */ children }: AnyObject) {
  createMeta('[charset]', { charset: 'UTF-8' }, false);

  createMeta('[name="viewport"]', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }, false);

  return children;
}

export default memo(BaseWeb);
