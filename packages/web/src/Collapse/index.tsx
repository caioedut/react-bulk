import { forwardRef, useEffect, useRef } from 'react';

import { BoxFactory, CollapseFactory, CollapseProps } from '@react-bulk/core';

import useMap from '../useMap';

function Collapse({ in: shown, ...props }: CollapseProps, ref) {
  const map = useMap();

  const startHidden = useRef(!shown).current;
  const containerRef = useRef<HTMLElement>(null);
  const isShown = containerRef?.current?.style?.height?.replace?.(/\D/g, '') !== '0';

  useEffect(() => {
    shown ? show() : hide();
  }, [shown]);

  const show = () => {
    const $el = containerRef.current;
    if (isShown || !$el) return;

    $el.style.transition = 'none';
    $el.style.height = '';

    const height = `${$el.getBoundingClientRect().height}px`;

    $el.style.height = '0px';
    $el.style.transition = '';

    const complete = () => {
      $el.style.height = '';
      $el.removeEventListener('transitionend', complete);
    };

    $el.addEventListener('transitionend', complete);

    setTimeout(() => ($el.style.height = height), 0);
  };

  const hide = () => {
    const $el = containerRef.current;
    if (!isShown || !$el) return;

    $el.style.transition = 'none';
    $el.style.height = '';

    const height = `${$el.getBoundingClientRect().height}px`;

    $el.style.height = height;
    $el.style.transition = '';
    $el.style.display = '';

    setTimeout(() => ($el.style.height = '0px'), 0);
  };

  return (
    <BoxFactory
      map={map}
      ref={containerRef}
      style={{
        overflow: 'hidden',
        transition: 'height 0.25s ease',
      }}
      rawStyle={startHidden && { display: 'none' }}
    >
      <CollapseFactory
        ref={ref}
        {...props}
        accessibility={{
          state: { expanded: shown },
        }}
        map={map}
      />
    </BoxFactory>
  );
}

export default forwardRef<typeof Collapse, CollapseProps>(Collapse);
