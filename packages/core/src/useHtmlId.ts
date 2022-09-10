import { useRef } from 'react';

import crypt from './utils/crypt';
import uuid from './utils/uuid';

export default function useHtmlId(id?: string) {
  return useRef(id ?? `rbk-id-${crypt(uuid())}`).current;
}
