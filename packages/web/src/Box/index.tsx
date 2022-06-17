import { ComponentPropsWithRef, forwardRef, useEffect, useState } from 'react';

import { createBox } from '@react-bulk/core';
import { BoxProps } from '@react-bulk/core/types';

type BoxPropsWeb = ComponentPropsWithRef<'div'> & BoxProps;

const Box = forwardRef(({ ...props }: BoxPropsWeb, ref) => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => setDimensions({ height: window.innerHeight, width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return createBox(props, ref, { web: true, Text: 'span', dimensions }, 'div');
});

export default Box;
