import { MutableRefObject, createContext } from 'react';

import { Responder } from './ReactBulk';
import { ToasterRef } from './Toaster';
import { RbkTheme } from './types';

const RbkContext = createContext<{
  theme: RbkTheme;
  setResponder: (value: Responder | undefined) => void;
  toasterRef: MutableRefObject<ToasterRef>;
}>(null as any);

export default RbkContext;
