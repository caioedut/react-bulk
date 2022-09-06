import { useEffect, useRef, useState } from 'react';

import { TimeoutType } from '@react-bulk/core';
import * as Icons from 'phosphor-react';

export default function useMap() {
  const timeoutRef = useRef<TimeoutType>(null);

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleResize = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
    }, 50);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    web: true,
    native: false,
    ios: false,
    android: false,

    dimensions,
    Icons,

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
  };
}
