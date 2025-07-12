import { useCallback, useEffect, useMemo, useState } from 'react';

import { ThemeProps } from '../types';
import rbkGlobal from '../utils/global';
import useTheme from './useTheme';

export default function useBreakpoints(breakpoints?: Partial<ThemeProps['breakpoints']>) {
  const { useDimensions } = rbkGlobal.mapping;

  const theme = useTheme();
  const dimensions = useDimensions();

  const memoizedBreakpoints: ThemeProps['breakpoints'] = useMemo(
    () => ({ ...theme.breakpoints, ...Object(breakpoints) }),
    [theme.breakpoints, breakpoints],
  );

  const getState = useCallback(
    () =>
      Object.fromEntries(
        Object.entries(memoizedBreakpoints)
          .sort((a, b) => a[1] - b[1])
          .map(([breakpoint, minWidth]) => [breakpoint, dimensions.width >= minWidth]),
      ),
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
