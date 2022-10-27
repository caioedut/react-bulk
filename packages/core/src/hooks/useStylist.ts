import { useMemo } from 'react';

import createStyle from '../createStyle';
import useTheme from '../hooks/useTheme';

export type useStylist = {
  name?: string;
  style: any;
  avoid?: boolean;
};

export default function useStylist({ name, style, avoid }: useStylist) {
  const theme = useTheme();

  const result = useMemo(() => createStyle({ name, style, theme }), [name, style, theme]);

  return avoid ? null : result;
}
