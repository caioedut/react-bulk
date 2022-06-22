import { forwardRef, useEffect, useRef, useState } from 'react';

import { CollapseProps, createCollapse } from '@react-bulk/core';

import map from '../map';

const Collapse = forwardRef(({ in: shown, ...props }: CollapseProps, ref) => {
  const { Box } = map;

  const readyRef = useRef(false);
  const containerRef = useRef<HTMLElement>(null);

  const [height, setHeight] = useState<any>(null);

  useEffect(() => {
    const $el = containerRef.current;

    if ($el) {
      $el.style.height = '';
    }
  }, [height]);

  useEffect(() => {
    const $el = containerRef.current;
    if (!$el) return;

    const clear = () => window.getComputedStyle($el).height.replace(/\D/g, '') !== '0' && setHeight(null);

    $el.addEventListener('transitionend', clear);

    return () => $el.removeEventListener('transitionend', clear);
  }, []);

  useEffect(() => {
    const $el = containerRef.current;
    if (!$el) return;

    if (!readyRef.current) {
      readyRef.current = true;
      return;
    }

    let curHeight = window.getComputedStyle($el).height;
    let newHeight = '0px';

    $el.style.transition = 'none';
    $el.style.height = 'auto';

    if (shown) {
      curHeight = '0px';
      newHeight = window.getComputedStyle($el).height;
    }

    $el.style.height = curHeight;
    $el.style.transition = '';

    setHeight(newHeight);
  }, [shown]);

  const constainerStyle = [
    {
      overflow: 'hidden',
      transition: 'height 0.2s ease',
    },

    !readyRef.current && !shown && { height: '0px' },

    height !== null && { height },
  ];

  return (
    <Box ref={containerRef} style={constainerStyle}>
      {createCollapse(props, ref, map)}
    </Box>
  );
});

export default Collapse;
