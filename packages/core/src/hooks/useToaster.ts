import { useContext } from 'react';

import { Context } from '../ReactBulk';
import { ToasterProps } from '../types';

export default function useToaster() {
  const { toasterRef } = useContext(Context);

  function open(options: string | ToasterProps) {
    toasterRef?.current?.setProps(typeof options === 'string' ? { content: options } : options);
  }

  function close() {
    toasterRef?.current?.setProps(undefined);
  }

  return { open, close };
}
