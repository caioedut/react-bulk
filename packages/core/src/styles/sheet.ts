import cometta, { ComettaParam } from 'cometta';

import { RbkStyle } from '../types';

export default function sheet(...mixin: RbkStyle[]) {
  return cometta.sheet(...(mixin as ComettaParam[]));
}
