import { useEffect, useState } from 'react';

export default function useMap() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => setDimensions({ height: window.innerHeight, width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    web: true,
    native: false,
    ios: false,
    android: false,

    dimensions,

    Button: 'button',
    Image: 'img',
    Input: 'input',
    Label: 'label',
    ScrollView: 'div',
    Text: 'span',
    View: 'div',
  };
}
