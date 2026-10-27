import { useCallback, useEffect, useMemo, useState } from 'react';

import { RbkBreakpoints, ThemeProps } from '../types';
import rbkGlobal from '../utils/global';
import useTheme from './useTheme';

export type UseBreakpointsState<T extends Partial<RbkBreakpoints> = {}> = {
  [K in keyof (RbkBreakpoints & T)]: boolean;
};

export default function useBreakpoints<T extends Partial<RbkBreakpoints> = {}>(
  breakpoints?: T,
): UseBreakpointsState<T> {
  const { useDimensions } = rbkGlobal.mapping;

  const theme = useTheme();
  const dimensions = useDimensions();

  const memoizedBreakpoints: ThemeProps['breakpoints'] = useMemo(
    () => ({ ...theme.breakpoints, ...Object(breakpoints) }),
    [theme.breakpoints, breakpoints],
  );

  const getState = useCallback(
    (): UseBreakpointsState<T> =>
      Object.fromEntries(
        Object.entries(memoizedBreakpoints)
          .sort((a, b) => a[1] - b[1])
          .map(([breakpoint, minWidth]) => [breakpoint, dimensions.width >= minWidth]),
      ) as UseBreakpointsState<T>,
    [dimensions, memoizedBreakpoints],
  );

  const [state, setState] = useState(getState());

  useEffect(() => {
    const newState = getState();

    if (JSON.stringify(newState) !== JSON.stringify(state)) {
      setState(newState);
    }
  }, [dimensions, state, memoizedBreakpoints, getState]);

  return state;
}
