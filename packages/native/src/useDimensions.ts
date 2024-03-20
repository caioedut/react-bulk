import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { TimeoutType } from '@react-bulk/core';

export default function useDimensions(enabled = true) {
  const current = useWindowDimensions();

  const [dimensions, setDimensions] = useState({
    width: current.width,
    height: current.height,
  });

  useEffect(() => {
    if (!enabled) return;

    setDimensions({
      width: current.width,
      height: current.height,
    });
  }, [enabled, current.width, current.height]);

  return dimensions;
}
