import { CollapseProps } from './types';

export default function createCollapse({ ...rest }: CollapseProps | any, ref: any, map: any) {
  const { Box } = map;
  return <Box {...rest} ref={ref} />;
}
