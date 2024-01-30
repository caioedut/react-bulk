import cometta, { ComettaParam } from 'cometta';

import { RbkStyle } from '../types';

export default function jss(...mixin: RbkStyle[]) {
  cometta.jss(...(mixin as ComettaParam[]));
}
