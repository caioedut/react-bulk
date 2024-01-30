import cometta, { ComettaParam } from 'cometta';

import { RbkStyle } from '../types';

export default function css(...mixin: RbkStyle[]) {
  cometta.css(...(mixin as ComettaParam[]));
}
