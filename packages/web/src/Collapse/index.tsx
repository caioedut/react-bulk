import { ComponentPropsWithRef, forwardRef, useEffect, useRef, useState } from 'react';

import { BoxFactory, CollapseFactory, CollapseProps } from '@react-bulk/core';

import useMap from '../useMap';

export type CollapsePropsWeb = ComponentPropsWithRef<'div'> & CollapseProps;

function Collapse({ in: shown, ...props }: CollapsePropsWeb, ref) {
  const map = useMap();

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
    <BoxFactory ref={containerRef} style={constainerStyle} map={map}>
      <CollapseFactory ref={ref} {...props} map={map} />
    </BoxFactory>
  );
}

export default forwardRef(Collapse);
