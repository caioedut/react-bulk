import { useContext } from 'react';

import { Context } from '../ReactBulk';
import { SnackbarProps } from '../Snackbar';

export default function useSnackbar() {
  const { snackbarRef } = useContext(Context);

  function open(options: SnackbarProps) {
    snackbarRef?.current?.setProps(options);
  }

  function close() {
    snackbarRef?.current?.setProps(undefined);
  }

  return { open, close };
}
