import cometta, { ComettaParam } from 'cometta';

import { RbkStyle } from '../types';

export default function jss(...mixin: (string | RbkStyle)[]) {
  return cometta.jss(...(mixin as ComettaParam[]));
}
