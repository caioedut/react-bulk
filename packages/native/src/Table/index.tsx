import { forwardRef } from 'react';

import { TableFactory, TableProps } from '@react-bulk/core';

import useMap from '../useMap';

function Table({ ...props }: TableProps, ref) {
  return <TableFactory ref={ref} {...props} map={useMap()} />;
}

export default forwardRef<typeof Table, TableProps>(Table);
