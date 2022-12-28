import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TimeoutType } from '@react-bulk/core';

const getWindowDimensions = () => {
  let width = 0;
  let height = 0;

  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  return { width, height };
};

export default function useMap() {
  const timeoutRef = useRef<TimeoutType>(null);

  const [dimensions, setDimensions] = useState(getWindowDimensions());

  const handleResize = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDimensions(getWindowDimensions());
    }, 50);
  }, [timeoutRef]);

  useEffect(() => {
    if (!window) return;
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return useMemo(
    () => ({
      web: true,
      native: false,
      ios: false,
      android: false,

      dimensions,

      Button: 'button',
      Dialog: 'div',
      Form: 'form',
      Image: 'img',
      Input: 'input',
      Label: 'label',
      Link: 'a',
      ScrollView: 'div',
      Text: 'span',
      TextArea: 'textarea',
      View: 'div',

      Animated: {
        View: 'div',
      },

      // Svg
      svg: {
        Svg: 'svg',
        Circle: 'circle',
        Ellipse: 'ellipse',
        G: 'g',
        Text: 'text',
        TSpan: 'tspan',
        TextPath: 'textPath',
        Path: 'path',
        Polygon: 'polygon',
        Polyline: 'polyline',
        Line: 'line',
        Rect: 'rect',
        Use: 'use',
        Image: 'image',
        Symbol: 'symbol',
        Defs: 'defs',
        LinearGradient: 'linearGradient',
        RadialGradient: 'radialGradient',
        Stop: 'stop',
        ClipPath: 'clipPath',
        Pattern: 'pattern',
        Mask: 'mask',
      },
    }),
    [dimensions],
  );
}
