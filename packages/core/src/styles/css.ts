import cometta, { ComettaParam } from 'cometta';

import { RbkStyle } from '../types';

export default function css(...mixin: RbkStyle[]) {
  return cometta.css(...(mixin as ComettaParam[]));
}
