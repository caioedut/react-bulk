import { ComponentPropsWithRef, forwardRef, useEffect, useState } from 'react';

import BoxFactory from '@react-bulk/core/src/factory/BoxFactory';
import { BoxProps } from '@react-bulk/core/src/types';

export type BoxPropsWeb = ComponentPropsWithRef<'div'> & BoxProps;

function Box({ ...props }: BoxPropsWeb, ref) {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => setDimensions({ height: window.innerHeight, width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <BoxFactory ref={ref} {...props} map={{ web: true, dimensions, Text: 'span', View: 'div' }} />;
}

export default forwardRef(Box);
