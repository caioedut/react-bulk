import { MutableRefObject, createContext } from 'react';

import { ToasterRef } from './Toaster';
import { AnyObject, RbkTheme } from './types';

const RbkContext = createContext<{
  theme: RbkTheme;
  setDraggable: (value: AnyObject | undefined) => void;
  toasterRef: MutableRefObject<ToasterRef>;
}>(null as any);

export default RbkContext;
