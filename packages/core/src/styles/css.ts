import cometta, { ComettaParam } from 'cometta';

import { RbkStyle } from '../types';

export default function css(...mixin: (string | RbkStyle)[]) {
  return cometta.css(...(mixin as ComettaParam[]));
}
