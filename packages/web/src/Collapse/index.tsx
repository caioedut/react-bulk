import { ComponentPropsWithRef, forwardRef, useEffect, useRef } from 'react';

import { BoxFactory, CollapseFactory, CollapseProps } from '@react-bulk/core';

import useMap from '../useMap';

export type CollapsePropsWeb = ComponentPropsWithRef<'div'> & CollapseProps;

function Collapse({ in: shown, ...props }: CollapsePropsWeb, ref) {
  const map = useMap();

  const { current: startHidden } = useRef(!shown);
  const containerRef = useRef<HTMLElement>(null);
  const isShown = containerRef?.current?.style?.height?.replace?.(/\D/g, '') !== '0';

  console.log('startHidden', startHidden);

  // const transition = 'height 0.25s ease';

  // useEffect(() => {
  //   const $el = containerRef.current;
  //
  //   if ($el) {
  //     $el.style.height = '';
  //   }
  // }, [height]);

  useEffect(() => {
    // const $el = containerRef.current;
    // if (!$el) return;
    //
    // const clear = () => {
    //   // $el.style.transition = '';
    //   // if (window.getComputedStyle($el).height.replace(/\D/g, '') !== '0') {
    //   // $el.style.height = '';
    //   // }
    // };
    //
    // $el.addEventListener('transitionend', clear);
    //
    // return () => $el.removeEventListener('transitionend', clear);
  }, []);

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
      <CollapseFactory ref={ref} {...props} map={map} />
    </BoxFactory>
  );
}

export default forwardRef(Collapse);
